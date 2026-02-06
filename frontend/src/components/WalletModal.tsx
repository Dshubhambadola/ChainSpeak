"use client";

import React from 'react';

interface WalletModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal Container */}
            <div className="relative z-10 w-full max-w-[400px]">
                {/* Decorative background elements matching the design */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#7a2dbe]/20 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7a2dbe]/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="glass-modal rounded-xl shadow-2xl overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
                    {/* Header Section */}
                    <div className="flex items-center justify-between p-6 border-b border-white/5">
                        <h2 className="text-xl font-bold tracking-tight text-white">Connect Your Wallet</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
                        >
                            <span className="material-symbols-outlined text-white/60 group-hover:text-white text-2xl">close</span>
                        </button>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col gap-3">
                        {/* MetaMask Option */}
                        <button className="wallet-card w-full flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl text-left group">
                            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#362843] flex items-center justify-center">
                                <span className="material-symbols-outlined text-[#7a2dbe] text-3xl">account_balance_wallet</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-white">MetaMask</span>
                                    <span className="bg-[#7a2dbe] text-[10px] font-bold uppercase px-2 py-0.5 rounded-full text-white tracking-wider">Popular</span>
                                </div>
                                <p className="text-white/50 text-xs">Recommended for web users</p>
                            </div>
                            <span className="material-symbols-outlined text-white/20 group-hover:text-[#7a2dbe] transition-colors">chevron_right</span>
                        </button>

                        {/* WalletConnect Option */}
                        <button className="wallet-card w-full flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl text-left group">
                            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#362843] flex items-center justify-center">
                                <span className="material-symbols-outlined text-[#7a2dbe] text-3xl">qr_code_scanner</span>
                            </div>
                            <div className="flex-1">
                                <span className="font-semibold text-white">WalletConnect</span>
                                <p className="text-white/50 text-xs">Scan with your mobile app</p>
                            </div>
                            <span className="material-symbols-outlined text-white/20 group-hover:text-[#7a2dbe] transition-colors">chevron_right</span>
                        </button>

                        {/* Coinbase Wallet Option */}
                        <button className="wallet-card w-full flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl text-left group">
                            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#362843] flex items-center justify-center">
                                <span className="material-symbols-outlined text-[#7a2dbe] text-3xl">currency_bitcoin</span>
                            </div>
                            <div className="flex-1">
                                <span className="font-semibold text-white">Coinbase Wallet</span>
                                <p className="text-white/50 text-xs">Seamless exchange integration</p>
                            </div>
                            <span className="material-symbols-outlined text-white/20 group-hover:text-[#7a2dbe] transition-colors">chevron_right</span>
                        </button>

                        {/* Rainbow Option */}
                        <button className="wallet-card w-full flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl text-left group">
                            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#362843] flex items-center justify-center">
                                <span className="material-symbols-outlined text-[#7a2dbe] text-3xl">looks</span>
                            </div>
                            <div className="flex-1">
                                <span className="font-semibold text-white">Rainbow</span>
                                <p className="text-white/50 text-xs">Fun and simple mobile wallet</p>
                            </div>
                            <span className="material-symbols-outlined text-white/20 group-hover:text-[#7a2dbe] transition-colors">chevron_right</span>
                        </button>
                    </div>

                    {/* Footer Section */}
                    <div className="px-6 py-5 bg-black/20 border-t border-white/5 flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2 text-white/40">
                            <span className="material-symbols-outlined text-lg text-[#7a2dbe]/80">verified_user</span>
                            <span className="text-xs font-medium tracking-wide">Your keys never leave your device</span>
                        </div>
                        <a className="text-[#7a2dbe] hover:text-[#7a2dbe]/80 text-sm font-medium transition-colors" href="#">
                            New to wallets? Learn more
                        </a>
                    </div>
                </div>

                {/* Optional Bottom Indicator (Web3 Style) */}
                <div className="mt-8 flex justify-center items-center gap-6 opacity-40">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="text-[10px] uppercase font-bold text-white tracking-widest">Ethereum Mainnet</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-[10px] uppercase font-bold text-white tracking-widest">Secure Node</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
