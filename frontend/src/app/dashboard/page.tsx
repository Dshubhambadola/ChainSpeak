"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import WalletModal, { WalletData } from "@/components/WalletModal";
import TransactionPreviewCard from "@/components/TransactionPreviewCard";
import { sendMessageToAI, getWalletBalance, transferEth } from "@/services/api";

type Message = {
    role: "user" | "ai";
    content: string;
    isTransaction?: boolean;
    transactionData?: {
        type: "transfer" | "swap" | "supply";
        to?: string;
        amount?: string;
        token?: string;
        tokenIn?: string;
        tokenOut?: string;
        amountIn?: string;
        amountOutMin?: string;
        tokenAddress?: string;
    }
};

export default function Dashboard() {
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
    const [wallet, setWallet] = useState<WalletData | null>(null);
    const [balance, setBalance] = useState("0.00");
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "ai",
            content: "Hello! I am your ChainSpeak AI assistant. I can help you analyze your portfolio, check gas fees, or execute transactions across multiple chains using natural language.\n\nHow can I assist you today?"
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Transaction State
    const [pendingTx, setPendingTx] = useState<{ to: string, amount: string } | null>(null);
    const [txStatus, setTxStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [txHash, setTxHash] = useState("");

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleWalletConnect = async (data: WalletData) => {
        setWallet(data);
        try {
            const balanceData = await getWalletBalance(data.address);
            setBalance(balanceData.balance_eth);
        } catch (e) {
            console.error(e);
        }
    };

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const aiResponse = await sendMessageToAI(userMessage);

            // Check for transaction proposal protocol
            if (aiResponse.startsWith("TRANSACTION_PROPOSAL:")) {
                const jsonPart = aiResponse.replace("TRANSACTION_PROPOSAL:", "").trim();
                const txData = JSON.parse(jsonPart);

                setMessages(prev => [...prev, {
                    role: "ai",
                    content: "I've prepared the transaction for you. Please review and confirm.",
                    isTransaction: true,
                    transactionData: txData
                }]);
            } else {
                setMessages(prev => [...prev, { role: "ai", content: aiResponse }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: "ai", content: "Sorry, I encountered an error. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const confirmTransaction = async (data: any) => {
        // In a real app, we'd open a secure modal here. 
        const password = prompt("Enter wallet password to confirm transaction:");
        if (!password) return;

        if (!wallet?.encrypted_key) {
            alert("No wallet key found. Please reconnect wallet.");
            return;
        }

        setTxStatus("sending");
        try {
            let result;
            if (data.type === 'transfer') {
                result = await transferEth(wallet.encrypted_key, password, data.to, data.amount);
            } else if (data.type === 'swap') {
                // TODO: Implement actual swap API call
                console.log("Mock Swap Execution:", data);
                // Simulate success for now
                await new Promise(r => setTimeout(r, 2000));
                result = { tx_hash: "0xMOCK_SWAP_HASH_" + Date.now() };
            } else if (data.type === 'supply') {
                // TODO: Implement actual supply API call
                console.log("Mock Supply Execution:", data);
                await new Promise(r => setTimeout(r, 2000));
                result = { tx_hash: "0xMOCK_SUPPLY_HASH_" + Date.now() };
            }

            setTxStatus("success");
            setTxHash(result.tx_hash);

            let successMsg = `Transaction Sent! Hash: ${result.tx_hash}`;
            if (data.type === 'swap') successMsg = `Swap Executed! Hash: ${result.tx_hash}`;
            if (data.type === 'supply') successMsg = `Supply Successful! Hash: ${result.tx_hash}`;

            setMessages(prev => [...prev, {
                role: "ai",
                content: successMsg
            }]);

            // Refresh balance
            const balanceData = await getWalletBalance(wallet.address);
            setBalance(balanceData.balance_eth);

        } catch (err: any) {
            setTxStatus("error");
            setMessages(prev => [...prev, {
                role: "ai",
                content: `Transaction Failed: ${err.message}`
            }]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display grid-bg">
            <WalletModal
                isOpen={isWalletModalOpen}
                onClose={() => setIsWalletModalOpen(false)}
                onConnect={handleWalletConnect}
            />
            {/* Top Navigation */}
            <header className="flex items-center justify-between border-b border-white/10 px-8 py-3 glass sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white neon-border">
                        <span className="material-symbols-outlined">auto_awesome</span>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">ChainSpeak</h2>
                </div>
                <div className="flex items-center gap-6">
                    <nav className="hidden md:flex items-center gap-8">
                        <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">Dashboard</Link>
                        <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">Explore Agents</Link>
                        <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">Documentation</Link>
                    </nav>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsWalletModalOpen(true)}
                            className="flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/20 transition-all"
                        >
                            <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                            {wallet ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}` : "Connect Wallet"}
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex flex-1 overflow-hidden">
                {/* Sidebar (30%) */}
                <aside className="w-[30%] border-r border-white/10 flex flex-col bg-background-dark/50 backdrop-blur-sm overflow-hidden hidden md:flex">
                    <div className="p-6 flex flex-col gap-6 h-full custom-scrollbar overflow-y-auto">
                        {/* Wallet Card */}
                        <div className="bg-card-dark border border-white/10 rounded-xl p-5 flex flex-col gap-4 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-3">
                                <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                    Live
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-slate-400 text-xs font-medium uppercase tracking-widest">Total Balance</span>
                                <h1 className="text-3xl font-bold mt-1">{parseFloat(balance).toFixed(4)} ETH</h1>
                            </div>
                            <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
                                <div className="flex flex-col">
                                    <span className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Current Network</span>
                                    <span className="text-sm font-medium">Sepolia Testnet</span>
                                </div>
                            </div>
                        </div>

                        {/* Feature Hint */}
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 border-dashed">
                            <p className="text-sm text-slate-400 text-center">Wallet integration coming soon...</p>
                        </div>
                    </div>
                </aside>

                {/* Main Area (70%) */}
                <section className="flex-1 flex flex-col relative">
                    {/* Chat Feed */}
                    <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 custom-scrollbar pb-32">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex gap-4 max-w-3xl ${msg.role === "user" ? "self-end" : ""}`}>
                                {msg.role === "ai" && (
                                    <div className="size-9 rounded-lg bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
                                        <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                                    </div>
                                )}

                                <div className={`${msg.role === "user" ? "user-bubble rounded-tr-none text-white shadow-lg shadow-primary/10" : "glass rounded-tl-none border border-white/10"} p-4 rounded-xl max-w-xl`}>
                                    <p className={`text-sm leading-relaxed ${msg.role === "user" ? "font-medium" : ""}`}>
                                        {msg.content}
                                    </p>
                                </div>

                                {/* Transaction Card Rendering */}
                                {msg.isTransaction && msg.transactionData && (
                                    <div className="ml-14 max-w-xl w-full">
                                        <TransactionPreviewCard
                                            type={msg.transactionData.type}
                                            fromToken={{
                                                symbol: msg.transactionData.type === 'swap' ? msg.transactionData.tokenIn! : (msg.transactionData.type === 'supply' ? msg.transactionData.token! : "ETH"),
                                                amount: msg.transactionData.type === 'swap' ? msg.transactionData.amountIn! : msg.transactionData.amount!
                                            }}
                                            toToken={{
                                                symbol: msg.transactionData.type === 'swap' ? msg.transactionData.tokenOut! : (msg.transactionData.type === 'supply' ? "Aave V3 Pool" : "ETH (Recipient)"),
                                                amount: msg.transactionData.type === 'swap' ? msg.transactionData.amountOutMin! : (msg.transactionData.type === 'supply' ? msg.transactionData.amount! : msg.transactionData.amount!)
                                            }}
                                            gasCost="~0.005 ETH"
                                            onConfirm={() => confirmTransaction(msg.transactionData)}
                                            onCancel={() => console.log('Cancelled')}
                                        />
                                    </div>
                                )}
                                {msg.role === "user" && (
                                    <div className="size-9 rounded-lg bg-slate-800 flex items-center justify-center text-white shrink-0 border border-white/10 overflow-hidden">
                                        <span className="material-symbols-outlined text-[20px]">person</span>
                                    </div>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-4 max-w-3xl">
                                <div className="size-9 rounded-lg bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
                                    <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                                </div>
                                <div className="glass p-4 rounded-xl rounded-tl-none border border-white/10">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Sticky Bottom Input */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 pt-0 pointer-events-none">
                        <div className="max-w-4xl mx-auto glass rounded-2xl border border-white/20 p-2 flex items-center gap-2 pointer-events-auto shadow-2xl shadow-black">
                            <button className="p-3 hover:bg-white/5 rounded-xl transition-colors text-slate-400">
                                <span className="material-symbols-outlined">add</span>
                            </button>
                            <input
                                className="flex-1 bg-transparent border-none focus:ring-0 text-slate-100 placeholder:text-slate-500 text-sm py-3 px-2 focus:outline-none"
                                placeholder="Send a message (e.g., 'Check my balance')..."
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={isLoading}
                            />
                            <div className="flex items-center gap-1 pr-1">
                                <button className="p-3 hover:bg-white/5 rounded-xl transition-colors text-slate-400">
                                    <span className="material-symbols-outlined">mic</span>
                                </button>
                                <button
                                    onClick={handleSendMessage}
                                    disabled={isLoading || !input.trim()}
                                    className="bg-primary text-white size-10 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-[1.05] transition-transform disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    <span className="material-symbols-outlined">arrow_upward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div >
    );
}
