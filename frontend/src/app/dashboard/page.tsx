"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import WalletModal from "@/components/WalletModal";
import TransactionPreviewCard from "@/components/TransactionPreviewCard";

export default function Dashboard() {
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display grid-bg">
            <WalletModal
                isOpen={isWalletModalOpen}
                onClose={() => setIsWalletModalOpen(false)}
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
                            0x742...af4e
                        </button>
                        <div className="size-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center overflow-hidden">
                            <img
                                className="w-full h-full object-cover"
                                alt="User profile avatar"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA40nxiALivbIMeBoVakb6_8wFIcuKovEXq44VnnU-UpdeJrxATruTSBxYVnHh2EkaPmnhmvkX6plOgjt8hacxiOiaKTtxrNn2syc8mVdoTbZAVGmjAbXp2NjNkuHAyi4Waoy_5FRUXTx2G0fhpDpa2rbmOs_hIcOToVnYTYtBLgY1S9IGeBWwWuxhRIJrwg70jnjhg1higgT786XQzTmOtFLcyjLGLQ6EXSVqZgTd_fK1qgas4QlLEACbJhFssU7NhRePLOPjFPc4"
                            />
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex flex-1 overflow-hidden">
                {/* Sidebar (30%) */}
                <aside className="w-[30%] border-r border-white/10 flex flex-col bg-background-dark/50 backdrop-blur-sm overflow-hidden">
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
                                <h1 className="text-3xl font-bold mt-1">$12,450.60</h1>
                            </div>
                            <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
                                <div className="flex flex-col">
                                    <span className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Current Network</span>
                                    <span className="text-sm font-medium">Ethereum Mainnet</span>
                                </div>
                                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400">
                                    <span className="material-symbols-outlined text-[20px]">content_copy</span>
                                </button>
                            </div>
                        </div>

                        {/* Portfolio Token List */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Assets</h3>
                                <button className="text-xs text-primary font-bold hover:underline">View All</button>
                            </div>
                            <div className="flex flex-col gap-2">
                                {/* Token Item */}
                                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-all border border-transparent hover:border-white/10 cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
                                            <span className="material-symbols-outlined text-primary">currency_bitcoin</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm">Ethereum</span>
                                            <span className="text-xs text-slate-500">0.042 ETH</span>
                                        </div>
                                    </div>
                                    <div className="text-right flex flex-col">
                                        <span className="font-bold text-sm">$2,500.00</span>
                                        <span className="text-[10px] text-emerald-400 font-medium">+2.4%</span>
                                    </div>
                                </div>
                                {/* Token Item */}
                                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-all border border-transparent hover:border-white/10 cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
                                            <span className="material-symbols-outlined text-primary">monetization_on</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm">USD Coin</span>
                                            <span className="text-xs text-slate-500">1,200.00 USDC</span>
                                        </div>
                                    </div>
                                    <div className="text-right flex flex-col">
                                        <span className="font-bold text-sm">$1,200.00</span>
                                        <span className="text-[10px] text-slate-500 font-medium">0.00%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Transactions */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Recent Activity</h3>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-start gap-3">
                                    <div className="size-8 rounded bg-primary/20 flex items-center justify-center text-primary mt-0.5">
                                        <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Swap USDC to ETH</span>
                                            <span className="text-[10px] font-bold text-amber-400 px-1.5 py-0.5 rounded bg-amber-400/10 uppercase">Pending</span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 mt-0.5">Feb 24, 2024 • 14:22</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="size-8 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-400 mt-0.5">
                                        <span className="material-symbols-outlined text-[18px]">call_received</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Received 500 USDT</span>
                                            <span className="text-[10px] font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-400/10 uppercase">Success</span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 mt-0.5">Feb 23, 2024 • 09:15</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Area (70%) */}
                <section className="flex-1 flex flex-col relative">
                    {/* Chat Feed */}
                    <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 custom-scrollbar pb-32">
                        {/* AI Welcome Message */}
                        <div className="flex gap-4 max-w-3xl">
                            <div className="size-9 rounded-lg bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                            </div>
                            <div className="glass p-4 rounded-xl rounded-tl-none border border-white/10 max-w-xl">
                                <p className="text-sm leading-relaxed">
                                    Hello! I am your ChainSpeak AI assistant. I can help you analyze your portfolio, check gas fees, or execute transactions across multiple chains using natural language.
                                    <br /><br />
                                    How can I assist you today?
                                </p>
                            </div>
                        </div>

                        {/* User Message */}
                        <div className="flex gap-4 max-w-3xl self-end">
                            <div className="user-bubble p-4 rounded-xl rounded-tr-none text-white shadow-lg shadow-primary/10 max-w-xl">
                                <p className="text-sm leading-relaxed font-medium">
                                    Swap 100 USDC to ETH on Ethereum Mainnet.
                                </p>
                            </div>
                            <div className="size-9 rounded-lg bg-slate-800 flex items-center justify-center text-white shrink-0 border border-white/10 overflow-hidden">
                                <img
                                    className="w-full h-full object-cover"
                                    alt="User personal profile avatar"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIwfZuPCVQ5HSZT9-8rgFGGc1UpGkO4hdwXmjp25NkBH4Yb4-Ayvq5B8slKVuCuE3exXI_dMn7nww6Bo7KUPiIgrjlvwqRxTSX89j1tSjBTow6xtD1Y5JkLEKS8v3Rmbv_5u8gN3GU5RsXi1yy8xgtpCJPglOhEgKJRwPIcn9b7Y2rkN_1lYf0QFEhu1ctf2oni29ZythX0PmFTBrhp1AE1BQqOp6qKJgZknmHHsEitD00FXnJtjm5rO3Zx65U3rCS6gnJ3JSRXHM"
                                />
                            </div>
                        </div>

                        {/* AI Response & Confirmation Card */}
                        <div className="flex gap-4 max-w-3xl">
                            <div className="size-9 rounded-lg bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                            </div>
                            <div className="flex flex-col gap-4 max-w-xl">
                                <div className="glass p-4 rounded-xl rounded-tl-none border border-white/10">
                                    <p className="text-sm leading-relaxed">
                                        I've found the best route for your swap. Please review the transaction details below and approve when ready.
                                    </p>
                                </div>
                                {/* Transaction Confirmation Card */}
                                <TransactionPreviewCard
                                    fromToken={{ symbol: "USDC", amount: "100.00" }}
                                    toToken={{ symbol: "ETH", amount: "~0.0423" }}
                                    gasCost="$4.20"
                                    onConfirm={() => console.log('Confirmed')}
                                    onCancel={() => console.log('Cancelled')}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sticky Bottom Input */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 pt-0 pointer-events-none">
                        <div className="max-w-4xl mx-auto glass rounded-2xl border border-white/20 p-2 flex items-center gap-2 pointer-events-auto shadow-2xl shadow-black">
                            <button className="p-3 hover:bg-white/5 rounded-xl transition-colors text-slate-400">
                                <span className="material-symbols-outlined">add</span>
                            </button>
                            <input
                                className="flex-1 bg-transparent border-none focus:ring-0 text-slate-100 placeholder:text-slate-500 text-sm py-3 px-2 focus:outline-none"
                                placeholder="Send a message or execute a transaction..."
                                type="text"
                            />
                            <div className="flex items-center gap-1 pr-1">
                                <button className="p-3 hover:bg-white/5 rounded-xl transition-colors text-slate-400">
                                    <span className="material-symbols-outlined">mic</span>
                                </button>
                                <button className="bg-primary text-white size-10 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-[1.05] transition-transform">
                                    <span className="material-symbols-outlined">arrow_upward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
