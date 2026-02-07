"use client";

import React from 'react';

interface TransactionPreviewCardProps {
    type: "transfer" | "swap" | "supply";
    fromToken: {
        symbol: string;
        amount: string;
        icon?: string;
    };
    toToken: {
        symbol: string;
        amount: string;
        icon?: string;
    };
    gasCost: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function TransactionPreviewCard({
    type,
    fromToken,
    toToken,
    gasCost,
    onConfirm,
    onCancel
}: TransactionPreviewCardProps) {
    const isSwap = type === "swap";
    const isSupply = type === "supply";

    let actionLabel = "Send";
    let actionColor = "bg-blue-600 hover:bg-blue-700";
    let badgeColor = "bg-blue-500/20 text-blue-400 border-blue-500/30";

    if (isSwap) {
        actionLabel = "Confirm Swap";
        actionColor = "bg-gradient-to-r from-[#7c17d3] to-[#a838ff] hover:opacity-90 shadow-lg shadow-purple-500/20";
        badgeColor = "bg-[#7c17d3]/20 text-[#a838ff] border-[#7c17d3]/30";
    } else if (isSupply) {
        actionLabel = "Confirm Supply";
        actionColor = "bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 shadow-lg shadow-teal-500/20";
        badgeColor = "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    }

    return (
        <div className="bg-[#13141b] rounded-xl overflow-hidden border border-white/5 shadow-2xl animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-2">
                    <span className="material-icons text-yellow-500 text-sm">warning</span>
                    <span className="text-gray-300 font-medium text-sm">Review Transaction</span>
                </div>
                <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${badgeColor}`}>
                    {type}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">

                {/* Visual Flow */}
                <div className="flex items-center justify-between px-2">
                    {/* From Asset */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-[#1e2029] flex items-center justify-center border border-white/10 shadow-inner">
                            <span className="material-icons text-blue-400">attach_money</span>
                        </div>
                        <div className="text-center">
                            <div className="text-xl font-bold text-white">{fromToken.amount}</div>
                            <div className="text-xs text-gray-400 font-medium">{fromToken.symbol}</div>
                        </div>
                    </div>

                    {/* Arrow Animation */}
                    <div className="flex-1 flex justify-center">
                        <div className={`w-8 h-8 rounded-full ${isSwap ? 'bg-[#7c17d3]/20' : (isSupply ? 'bg-emerald-500/20' : 'bg-blue-500/20')} flex items-center justify-center animate-pulse`}>
                            <span className={`material-icons text-sm ${isSwap ? 'text-[#a838ff]' : (isSupply ? 'text-emerald-400' : 'text-blue-400')}`}>arrow_forward</span>
                        </div>
                    </div>

                    {/* To Asset */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-[#1e2029] flex items-center justify-center border border-white/10 shadow-inner">
                            <span className="material-icons text-gray-400">
                                {isSwap ? "currency_bitcoin" : (isSupply ? "account_balance" : "person")}
                            </span>
                        </div>
                        <div className="text-center">
                            <div className="text-xl font-bold text-white">{toToken.amount}</div>
                            <div className="text-xs text-gray-400 font-medium">{toToken.symbol}</div>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="bg-black/20 rounded-lg p-3 space-y-2 text-sm border border-white/5">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Network</span>
                        <div className="flex items-center gap-1 text-gray-300">
                            <span className="material-icons text-[12px]">dns</span>
                            <span>Ethereum Sepolia</span>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Estimated gas</span>
                        <span className="text-gray-300 font-mono">{gasCost}</span>
                    </div>
                    {isSwap && (
                        <div className="flex justify-between">
                            <span className="text-gray-500">Min. Received</span>
                            <span className="text-emerald-400 font-mono">{toToken.amount} {toToken.symbol}</span>
                        </div>
                    )}
                    {isSupply && (
                        <div className="flex justify-between">
                            <span className="text-gray-500">APY (Est.)</span>
                            <span className="text-emerald-400 font-mono">~2.5%</span>
                        </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-white/5 mt-2">
                        <span className="text-gray-500">Route</span>
                        <div className="flex items-center gap-1 text-gray-300">
                            <span className="material-icons text-[12px]">{isSwap ? "alt_route" : (isSupply ? "account_balance" : "send")}</span>
                            <span>{isSwap ? "Uniswap V3" : (isSupply ? "Aave V3" : "Transfer")}</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Actions */}
            <div className="p-4 bg-black/40 border-t border-white/5 grid grid-cols-2 gap-3">
                <button
                    onClick={onCancel}
                    className="py-2.5 px-4 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className={`py-2.5 px-4 rounded-lg text-sm font-bold text-white ${actionColor} transition-all transform active:scale-95`}
                >
                    {actionLabel}
                </button>
            </div>

            {/* Security Footer */}
            <div className="py-2 text-center bg-black/60 border-t border-white/5">
                <div className="flex items-center justify-center gap-1.5 opacity-40">
                    <span className="material-icons text-[10px]">lock</span>
                    <span className="text-[9px] font-bold tracking-widest uppercase">Secured by ChainSpeak AI</span>
                </div>
            </div>
        </div>
    );
}
