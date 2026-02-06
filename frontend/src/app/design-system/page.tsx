"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { LoadingState, SkeletonCard, Spinner } from "@/components/ui/Loading";

export default function DesignSystemPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
            {/* Toast Notification (Simulated) */}
            <div className="fixed top-8 right-8 z-50 glass glass-card px-6 py-4 rounded-xl flex items-center gap-4 border-l-4 border-[#7a2dbe] shadow-2xl">
                <span className="material-symbols-outlined text-green-400">check_circle</span>
                <div className="flex flex-col">
                    <span className="text-sm font-bold">Transaction Confirmed</span>
                    <span className="text-xs text-slate-400">Block #829104 successfully mined.</span>
                </div>
                <a className="ml-4 text-[#7a2dbe] font-bold text-sm hover:underline" href="#">View</a>
            </div>

            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    {/* Top Navigation Bar */}
                    <header className="flex items-center justify-between border-b border-white/10 px-10 py-4 glass glass-card sticky top-0 z-40">
                        <div className="flex items-center gap-4">
                            <div className="size-8 bg-[#7a2dbe] rounded-lg flex items-center justify-center text-white">
                                <span className="material-symbols-outlined">auto_awesome</span>
                            </div>
                            <h2 className="font-heading text-xl font-bold tracking-tight">ChainSpeak</h2>
                        </div>
                        <div className="flex items-center gap-8">
                            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                                <a className="hover:text-[#7a2dbe] transition-colors" href="#">Foundations</a>
                                <a className="hover:text-[#7a2dbe] transition-colors" href="#">Components</a>
                                <a className="hover:text-[#7a2dbe] transition-colors" href="#">Layout</a>
                                <a className="hover:text-[#7a2dbe] transition-colors" href="#">Guidelines</a>
                            </nav>
                            <div className="flex items-center gap-4">
                                <Badge variant="info" className="font-bold">v1.2.4</Badge>
                                <div className="size-10 rounded-full border-2 border-[#7a2dbe]/30 overflow-hidden">
                                    <img className="w-full h-full object-cover" alt="User profile avatar placeholder" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCd6H3pb6s75pIghEat2augadYqCaBXGbrVOhYJyELYvKzpeqxtL1AD6ASQnOJR-ErDAHHXLKMnAza9kKawed9GIZmEFF85g6peCp-EaGKnrl6wjmQpgZZFI35p-c7ROIwyr3KibLzr2eovg5Xd36kPRRIeJbMZjgJFwH9h_bZbtbHPJ78jCMcF2ziikFeUbfXd7t1RKaYuvQgKKoflO7zr1FYTuHGRIkou-a8aZjbpLTGd3bgpIfr_1clZHy-4TZfQ0IXGDUzzCNg" />
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="max-w-7xl mx-auto w-full p-8 space-y-16">
                        {/* Hero Section */}
                        <section className="space-y-4">
                            <h1 className="text-5xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#7a2dbe]">ChainSpeak Design System</h1>
                            <p className="text-xl text-slate-400 max-w-2xl">Premium Web3 AI platform UI components and brand foundations designed for high-performance decentralized applications.</p>
                        </section>

                        {/* Color Palette & Typography */}
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h3 className="font-heading text-2xl font-bold border-b border-white/10 pb-2">Color Palette</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <div className="space-y-2">
                                        <div className="h-20 w-full rounded-xl bg-[#1a1a2e] border border-white/10"></div>
                                        <span className="text-xs font-mono block">#1A1A2E</span>
                                        <span className="text-[10px] text-slate-500 uppercase">Background</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-20 w-full rounded-xl bg-[#7a2dbe] shadow-lg shadow-[#7a2dbe]/20"></div>
                                        <span className="text-xs font-mono block">#7A2DBE</span>
                                        <span className="text-[10px] text-slate-500 uppercase">Primary</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-20 w-full rounded-xl bg-green-500"></div>
                                        <span className="text-xs font-mono block">#22C55E</span>
                                        <span className="text-[10px] text-slate-500 uppercase">Success</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-20 w-full rounded-xl bg-amber-500"></div>
                                        <span className="text-xs font-mono block">#F59E0B</span>
                                        <span className="text-[10px] text-slate-500 uppercase">Warning</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h3 className="font-heading text-2xl font-bold border-b border-white/10 pb-2">Typography</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-heading text-3xl font-bold">Space Grotesk</p>
                                        <p className="text-xs text-slate-500 uppercase tracking-widest">Headings & Display</p>
                                    </div>
                                    <div>
                                        <p className="font-display text-2xl">Inter Regular & Bold</p>
                                        <p className="text-xs text-slate-500 uppercase tracking-widest">UI & Body Copy</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Button Suite */}
                        <section className="space-y-8">
                            <h3 className="font-heading text-2xl font-bold border-b border-white/10 pb-2">Button Suite</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-slate-500 text-xs uppercase">
                                            <th className="pb-4 font-medium">Type</th>
                                            <th className="pb-4 font-medium">Small (sm)</th>
                                            <th className="pb-4 font-medium">Medium (md)</th>
                                            <th className="pb-4 font-medium">Large (lg)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        <tr>
                                            <td className="py-6 font-medium">Primary Gradient</td>
                                            <td><Button variant="primary" size="sm">Action</Button></td>
                                            <td><Button variant="primary" size="md">Get Started</Button></td>
                                            <td><Button variant="primary" size="lg" glow>Connect Wallet</Button></td>
                                        </tr>
                                        <tr>
                                            <td className="py-6 font-medium">Secondary Outline</td>
                                            <td><Button variant="secondary" size="sm">Action</Button></td>
                                            <td><Button variant="secondary" size="md">Learn More</Button></td>
                                            <td><Button variant="secondary" size="lg">View Dashboard</Button></td>
                                        </tr>
                                        <tr>
                                            <td className="py-6 font-medium">Ghost State</td>
                                            <td><Button variant="ghost" size="sm">Action</Button></td>
                                            <td><Button variant="ghost" size="md">Cancel</Button></td>
                                            <td><Button variant="ghost" size="lg">Dismiss All</Button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Form Elements & Glassmorphic Cards */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <h3 className="font-heading text-2xl font-bold border-b border-white/10 pb-2">Form Elements</h3>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Default Input</label>
                                        <Input placeholder="Enter wallet address..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[#7a2dbe] uppercase tracking-widest px-1">Focused State</label>
                                        <Input variant="focused" defaultValue="0x71C7656EC7ab88b098defB751B7401B5f6d8976F" icon={<span className="material-symbols-outlined text-[20px]">content_copy</span>} />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-8">
                                <h3 className="font-heading text-2xl font-bold border-b border-white/10 pb-2">Badge System</h3>
                                <div className="flex flex-wrap gap-4 items-center">
                                    <Badge variant="success">Success</Badge>
                                    <Badge variant="pending">Pending</Badge>
                                    <Badge variant="failed">Failed</Badge>
                                    <Badge variant="info">Info</Badge>
                                </div>
                                <div className="flex flex-wrap gap-4 items-center pt-4">
                                    <Badge variant="new">New</Badge>
                                    <Badge variant="beta">Beta</Badge>
                                </div>
                            </div>
                        </section>

                        {/* Cards & Feedback */}
                        <section className="space-y-8">
                            <h3 className="font-heading text-2xl font-bold border-b border-white/10 pb-2">Glassmorphic Cards</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card variant="default">
                                    <div className="size-12 bg-white/5 rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-slate-400">layers</span>
                                    </div>
                                    <h4 className="text-xl font-bold">Standard Node</h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">Default glass container with subtle borders and heavy background blur.</p>
                                </Card>
                                <Card variant="success">
                                    <div className="size-12 bg-green-500/10 rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-green-400">check_circle</span>
                                    </div>
                                    <h4 className="text-xl font-bold text-green-400">Active Sync</h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">Positive feedback card with green outer glow and tinted border.</p>
                                </Card>
                                <Card variant="warning">
                                    <div className="size-12 bg-amber-500/10 rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-amber-400">report_problem</span>
                                    </div>
                                    <h4 className="text-xl font-bold text-amber-400">Low Balance</h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">Warning container highlighting critical states needing attention.</p>
                                </Card>
                            </div>
                        </section>

                        {/* Loading States */}
                        <section className="space-y-8">
                            <h3 className="font-heading text-2xl font-bold border-b border-white/10 pb-2">Loading States</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                                <div>
                                    <SkeletonCard />
                                    <p className="text-xs text-slate-500 pt-2 italic text-center">Skeleton Card (Shimmer State)</p>
                                </div>
                                <LoadingState message="Synchronizing Chain..." subMessage="Please wait a moment" />
                            </div>
                        </section>

                        {/* Footer Specification */}
                        <footer className="pt-16 pb-8 border-t border-white/10 text-center space-y-4">
                            <p className="text-slate-500 text-sm">ChainSpeak Design System v1.2.4 — Built for Decentralized Excellence</p>
                            <div className="flex justify-center gap-6">
                                <span className="text-xs font-mono px-3 py-1 bg-white/5 rounded">React</span>
                                <span className="text-xs font-mono px-3 py-1 bg-white/5 rounded">TailwindCSS</span>
                                <span className="text-xs font-mono px-3 py-1 bg-white/5 rounded">Figma</span>
                            </div>
                        </footer>
                    </main>
                </div>
            </div>
        </div>
    );
}
