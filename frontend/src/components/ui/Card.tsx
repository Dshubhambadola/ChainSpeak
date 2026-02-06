"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva(
    "glass-card rounded-2xl p-8 space-y-4 transition-all",
    {
        variants: {
            variant: {
                default: "border-white/10",
                success: "glow-success border-green-500/30",
                warning: "glow-warning border-amber-500/30",
                interactive: "hover:-translate-y-1 hover:bg-white/5 cursor-pointer",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> { }

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cardVariants({ variant, className })}
                {...props}
            />
        );
    }
);
Card.displayName = "Card";

export { Card, cardVariants };
