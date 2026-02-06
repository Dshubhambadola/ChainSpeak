"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                success: "bg-green-500/10 text-green-400 border border-green-500/20",
                pending: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
                failed: "bg-red-500/10 text-red-400 border border-red-500/20",
                info: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
                new: "bg-[#7a2dbe] text-white",
                beta: "bg-[#252541] border border-white/10 text-slate-200",
            },
            outline: {
                true: "bg-transparent border",
                false: "",
            },
        },
        defaultVariants: {
            variant: "info",
            outline: false,
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, outline, ...props }: BadgeProps) {
    return (
        <div className={badgeVariants({ variant, outline, className })} {...props} />
    );
}

export { Badge, badgeVariants };
