"use client";

import React from 'react';

interface TransactionPreviewCardProps {
    type: "transfer" | "swap";
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
    const actionLabel = isSwap ? "Swap" : "Send";
    const actionColor = isSwap ? "bg-[#7c17d3]" : "bg-blue-600";
    const icon = isSwap ? "swap_vert" : "send";

    return (
        <div className="w-full max-w-[350px] glass-card rounded-xl overflow-hidden shadow-2xl flex flex-col font-display animate-in fade-in zoom-in-95 duration-300">
            {/* Header Section */}
            <div className="px-5 pt-5 pb-3 flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-amber-400 text-[20px]">warning</span>
                        <h2 className="text-white text-base font-semibold leading-tight tracking-tight">Review Transaction</h2>
                    </div>
                    <div className="mt-2">
                        <span className={`${actionColor} text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full`}>{actionLabel}</span>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">info</span>
                </button>
            </div>

            {/* Main Visual Flow Section */}
            <div className="px-5 py-4">
                <div className="flex items-center justify-between token-gradient rounded-lg p-4 border border-white/5">
                    {/* From Asset */}
                    <div className="flex flex-col items-center gap-1.5">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
                            <span className="material-symbols-outlined text-white text-lg">attach_money</span>
                        </div>
                        <div className="text-center">
                            <p className="text-white font-bold text-sm">{fromToken.amount}</p>
                            <p className="text-gray-400 text-[11px]">{fromToken.symbol}</p>
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#7c17d3] text-[18px]">arrow_forward</span>
                        </div>
                    </div>

                    {/* To Asset */}
                    <div className="flex flex-col items-center gap-1.5">
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center shadow-lg overflow-hidden border border-white/10">
                            <span className="material-symbols-outlined text-white text-lg">currency_bitcoin</span>
                        </div>
                        <div className="text-center">
                            <p className="text-white font-bold text-sm">{toToken.amount}</p>
                            <p className="text-gray-400 text-[11px]">{toToken.symbol}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Panel */}
            <div className="px-5 py-2 space-y-3">
                <div className="flex justify-between items-center text-[13px]">
                    <span className="text-gray-400">Network</span>
                    <div className="flex items-center gap-1.5 text-white">
                        <div className="w-4 h-4 rounded-full bg-indigo-500/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[10px] text-indigo-400">lan</span>
                        </div>
                        <span>Ethereum Sepolia</span>
                    </div>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                    <span className="text-gray-400">Estimated gas</span>
                    <span className="text-white font-medium">{gasCost}</span>
                </div>
                {isSwap && (
                    <div className="flex justify-between items-center text-[13px]">
                        <span className="text-gray-400">Min. Received</span>
                        <span className="text-emerald-400">{toToken.amount} {toToken.symbol}</span>
                    </div>
                )}
                <div className="flex justify-between items-center text-[13px]">
                    <span className="text-gray-400">Route</span>
                    <div className="flex items-center gap-1.5 text-white">
                        <span className="material-symbols-outlined text-[14px]">alt_route</span>
                        <span>{isSwap ? "Uniswap V3" : "Standard Transfer"}</span>
                    </div>
                </div>
            </div>

            {/* Action Group */}
            <div className="p-5 flex flex-col gap-2">
                <button
                    onClick={onConfirm}
                    className="w-full h-11 bg-gradient-to-r from-[#7c17d3] to-[#9d4edd] hover:opacity-90 text-white font-bold text-sm rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
                >
                    <span>Confirm {actionLabel}</span>
                </button>
                <button
                    onClick={onCancel}
                    className="w-full h-10 bg-transparent hover:bg-white/5 text-gray-400 hover:text-white font-medium text-sm rounded-lg transition-all flex items-center justify-center"
                >
                    <span>Cancel</span>
                </button>
            </div>

            {/* Bottom Security Hint */}
            <div className="px-5 py-3 border-t border-white/5 bg-black/20 flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-gray-500">lock</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Secured by ChainSpeak AI</span>
            </div>
        </div>
    );
}
