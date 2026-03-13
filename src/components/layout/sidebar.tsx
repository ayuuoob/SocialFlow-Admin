'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Building2, Wallet, Users, Settings, LogOut, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/components';

const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Demandes', href: '/demandes', icon: FileText },
    { name: 'CNSS', href: '/cnss', icon: Building2 },
    { name: 'Transactions', href: '/transactions', icon: Wallet },
    { name: 'Utilisateurs', href: '/users', icon: Users },
    { name: 'Paramètres', href: '/settings', icon: Settings },
];

function SocialFlowLogo() {
    return (
        <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Shield shape */}
            <path d="M32 4L8 16V32C8 46.4 18.4 59.2 32 62C45.6 59.2 56 46.4 56 32V16L32 4Z" fill="#1F2F56" />
            {/* Inner shield highlight */}
            <path d="M32 8L12 18V32C12 44.3 21.2 55.4 32 58C42.8 55.4 52 44.3 52 32V18L32 8Z" fill="#243A6A" />
            {/* Handshake symbol - simplified */}
            <path d="M20 32L28 28L32 32L36 28L44 32" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M24 36L28 32L32 36L36 32L40 36" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Gold accent at bottom */}
            <path d="M28 42C28 42 30 44 32 44C34 44 36 42 36 42" stroke="#C9A227" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-64 flex-col bg-white border-r border-[#F1F5F9]">
            {/* Logo Area */}
            <div className="flex h-16 items-center border-b border-[#F1F5F9] px-5">
                <Link href="/" className="flex items-center gap-3">
                    <SocialFlowLogo />
                    <div className="flex flex-col">
                        <span className="text-[15px] font-bold tracking-tight" style={{ color: '#1F2F56' }}>
                            <span>Social</span>
                            <span style={{ color: '#2E7D32' }}>Flow</span>
                        </span>
                        <span className="text-[10px] font-medium text-[#94A3B8] -mt-0.5 tracking-wide uppercase">Admin Panel</span>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-4 px-3">
                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-[#1F2F56] text-white shadow-sm"
                                        : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#1F2F56]"
                                )}
                            >
                                <item.icon className={cn("h-[18px] w-[18px]", isActive ? "text-white" : "text-[#94A3B8]")} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Footer */}
            <div className="border-t border-[#F1F5F9] p-3">
                <Button variant="ghost" className="w-full justify-start gap-3 text-[#94A3B8] hover:text-red-500 hover:bg-red-50 rounded-xl text-sm font-medium">
                    <LogOut className="h-[18px] w-[18px]" />
                    Déconnexion
                </Button>
            </div>
        </div>
    );
}
