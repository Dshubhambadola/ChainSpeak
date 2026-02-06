"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-full font-bold transition-all disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                primary:
                    "bg-gradient-to-r from-[#7a2dbe] to-[#a855f7] text-white hover:scale-105 shadow-lg shadow-primary/20",
                secondary:
                    "border border-[#7a2dbe]/50 text-[#7a2dbe] hover:bg-[#7a2dbe]/10",
                ghost: "text-slate-400 hover:text-white hover:bg-white/5",
            },
            size: {
                sm: "px-4 py-2 text-xs",
                md: "px-6 py-2.5 text-sm",
                lg: "px-8 py-4 text-base",
            },
            glow: {
                true: "glow-purple",
                false: "",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
            glow: false,
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, glow, ...props }, ref) => {
        return (
            <button
                className={buttonVariants({ variant, size, glow, className })}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
