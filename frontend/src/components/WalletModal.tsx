"use client";

import React, { useState } from 'react';
import { createWallet, importWallet } from '@/services/api';

interface WalletModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConnect: (data: WalletData) => void;
}

export interface WalletData {
    address: string;
    encrypted_key?: string;
    private_key?: string;
}

type Tab = 'connect' | 'create' | 'import';

export default function WalletModal({ isOpen, onClose, onConnect }: WalletModalProps) {
    const [activeTab, setActiveTab] = useState<Tab>('connect');
    const [password, setPassword] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleCreate = async () => {
        setIsLoading(true);
        setError("");
        try {
            const data = await createWallet(password);
            onConnect(data);
            onClose();
        } catch (err) {
            setError("Failed to create wallet");
        } finally {
            setIsLoading(false);
        }
    };

    const handleImport = async () => {
        setIsLoading(true);
        setError("");
        try {
            const data = await importWallet(privateKey, password);
            onConnect(data);
            onClose();
        } catch (err) {
            setError("Failed to import wallet");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative z-10 w-full max-w-[400px]">
                <div className="glass-modal rounded-xl shadow-2xl overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between p-6 border-b border-white/5">
                        <h2 className="text-xl font-bold tracking-tight text-white">
                            {activeTab === 'connect' && "Connect Wallet"}
                            {activeTab === 'create' && "Create New Wallet"}
                            {activeTab === 'import' && "Import Wallet"}
                        </h2>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <span className="material-symbols-outlined text-white/60 hover:text-white">close</span>
                        </button>
                    </div>

                    <div className="p-6 flex flex-col gap-4">
                        {error && <div className="text-red-400 text-sm bg-red-400/10 p-2 rounded border border-red-400/20">{error}</div>}

                        {activeTab === 'connect' && (
                            <>
                                <button onClick={() => setActiveTab('create')} className="wallet-card w-full flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl text-left hover:bg-white/10 transition-all">
                                    <span className="material-symbols-outlined text-[#7a2dbe] text-3xl">add_circle</span>
                                    <div>
                                        <span className="font-semibold text-white">Create New Wallet</span>
                                        <p className="text-white/50 text-xs">Generate a new secure wallet</p>
                                    </div>
                                </button>
                                <button onClick={() => setActiveTab('import')} className="wallet-card w-full flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl text-left hover:bg-white/10 transition-all">
                                    <span className="material-symbols-outlined text-[#7a2dbe] text-3xl">key</span>
                                    <div>
                                        <span className="font-semibold text-white">Import Wallet</span>
                                        <p className="text-white/50 text-xs">Use existing private key</p>
                                    </div>
                                </button>
                            </>
                        )}

                        {(activeTab === 'create' || activeTab === 'import') && (
                            <div className="flex flex-col gap-4">
                                {activeTab === 'import' && (
                                    <input
                                        type="text"
                                        placeholder="Private Key (0x...)"
                                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#7a2dbe]"
                                        value={privateKey}
                                        onChange={(e) => setPrivateKey(e.target.value)}
                                    />
                                )}
                                <input
                                    type="password"
                                    placeholder="Set Password"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#7a2dbe]"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    onClick={activeTab === 'create' ? handleCreate : handleImport}
                                    disabled={isLoading || !password || (activeTab === 'import' && !privateKey)}
                                    className="w-full bg-[#7a2dbe] text-white font-bold py-3 rounded-lg hover:bg-[#6921a8] transition-colors disabled:opacity-50"
                                >
                                    {isLoading ? "Processing..." : (activeTab === 'create' ? "Create Wallet" : "Import Wallet")}
                                </button>
                                <button onClick={() => setActiveTab('connect')} className="text-slate-400 text-sm hover:text-white">
                                    Back to options
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
