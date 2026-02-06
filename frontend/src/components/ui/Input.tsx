"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
    "w-full rounded-full bg-white/5 border border-white/10 px-5 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#7a2dbe]/50 transition-all disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "glass-card",
                focused: "bg-[#7a2dbe]/5 border-[#7a2dbe] ring-2 ring-[#7a2dbe] glow-purple",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
    icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant, icon, ...props }, ref) => {
        return (
            <div className="relative w-full">
                <input
                    className={inputVariants({ variant, className })}
                    ref={ref}
                    {...props}
                />
                {icon && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7a2dbe]">
                        {icon}
                    </div>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
