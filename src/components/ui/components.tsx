import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    asChild?: boolean;
}

const buttonVariants = {
    default: "bg-[#1F2F56] text-white hover:bg-[#2a3d6a] shadow-sm",
    destructive: "bg-[#DC2626] text-white hover:bg-[#B91C1C] shadow-sm",
    outline: "border border-[#E2E8F0] bg-white hover:bg-[#F5F7FA] hover:text-[#1F2F56] text-[#475569]",
    secondary: "bg-[#F0F2F5] text-[#1F2F56] hover:bg-[#E2E8F0]",
    ghost: "hover:bg-[#F5F7FA] hover:text-[#1F2F56]",
    link: "text-[#1F2F56] underline-offset-4 hover:underline",
}

const buttonSizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-lg px-3 text-xs",
    lg: "h-11 rounded-lg px-8",
    icon: "h-10 w-10",
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild, ...props }, ref) => {
        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2F56]/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    buttonVariants[variant],
                    buttonSizes[size],
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export const Badge = ({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' }) => {
    const variants = {
        default: "border-transparent bg-[#1F2F56] text-white",
        secondary: "border-transparent bg-[#F0F2F5] text-[#475569]",
        destructive: "border-transparent bg-red-50 text-[#DC2626]",
        outline: "border-[#E2E8F0] text-[#475569]",
        success: "border-transparent bg-[#E8F5E9] text-[#2E7D32]",
        warning: "border-transparent bg-[#FFF8E1] text-[#C9A227]",
    }
    return (
        <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors", variants[variant], className)} {...props} />
    )
}

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-xl border-0 bg-white text-[#1F2F56] shadow-[0_1px_3px_rgba(0,0,0,0.06)]", className)} {...props} />
))
Card.displayName = "Card"

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

export const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight text-[#1F2F56]", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"
