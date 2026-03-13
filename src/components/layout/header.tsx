'use client';

import { Search, Moon, Sun, Bell } from 'lucide-react';
import { Button } from '@/components/ui/components';
import { useTheme } from "next-themes";

export function Header() {
    const { setTheme, theme } = useTheme();

    return (
        <header className="flex h-16 items-center gap-4 border-b border-[#E2E8F0] bg-white px-6">
            <h1 className="text-lg font-bold text-[#1F2F56] md:text-xl">SocialFlow Admin</h1>
            <div className="ml-auto flex items-center gap-3">
                <form className="relative hidden md:block">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#94A3B8]" />
                    <input
                        type="search"
                        placeholder="Rechercher (Nom, CIN, CNSS...)"
                        className="w-64 rounded-xl bg-[#F5F7FA] pl-9 pr-4 py-2 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-[#1F2F56]/20 placeholder:text-[#94A3B8]"
                    />
                </form>
                <Button variant="ghost" size="icon" className="rounded-full relative">
                    <Bell className="h-5 w-5 text-[#64748B]" />
                    <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-[#C9A227]"></span>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                    <Sun className="h-5 w-5 text-[#64748B] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 text-[#64748B] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
                <div className="flex items-center gap-2.5 ml-1">
                    <div className="h-9 w-9 rounded-full bg-[#1F2F56] flex items-center justify-center text-xs font-bold text-white shadow-sm">
                        SF
                    </div>
                    <div className="hidden text-sm md:block">
                        <div className="font-semibold text-[#1F2F56]">SocialFlow Admin</div>
                        <div className="text-xs text-[#94A3B8]">Super Admin</div>
                    </div>
                </div>
            </div>
        </header>
    );
}
