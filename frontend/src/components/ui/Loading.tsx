"use client";

import React from "react";

export function SkeletonCard() {
    return (
        <div className="glass-card p-8 rounded-2xl space-y-6 overflow-hidden relative">
            {/* Shimmer Overlay */}
            <div className="absolute inset-0 shimmer animate-shimmer z-0"></div>

            <div className="flex items-center gap-4 relative z-10">
                <div className="size-12 rounded-full bg-white/5"></div>
                <div className="space-y-2 grow">
                    <div className="h-4 bg-white/5 rounded w-1/3"></div>
                    <div className="h-3 bg-white/5 rounded w-1/2"></div>
                </div>
            </div>
            <div className="space-y-3 relative z-10">
                <div className="h-20 bg-white/5 rounded-xl w-full"></div>
                <div className="flex gap-2">
                    <div className="h-8 bg-white/5 rounded-full w-24"></div>
                    <div className="h-8 bg-white/5 rounded-full w-24"></div>
                </div>
            </div>
        </div>
    );
}

export function Spinner({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
    const sizeClasses = {
        sm: "size-8",
        md: "size-16",
        lg: "size-24",
    };

    return (
        <div className={`relative ${sizeClasses[size]} ${className}`}>
            <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-[#7a2dbe] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-2 border-white/5 border-b-[#7a2dbe]/40 animate-[spin_1s_linear_infinite_reverse]"></div>
        </div>
    );
}

export function LoadingState({ message = "Loading...", subMessage = "Please wait a moment" }: { message?: string; subMessage?: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-12 glass-card rounded-2xl h-full">
            <div className="mb-6">
                <Spinner size="md" />
            </div>
            <p className="text-sm font-bold text-[#7a2dbe]">{message}</p>
            <p className="text-xs text-slate-500 mt-1">{subMessage}</p>
        </div>
    );
}
