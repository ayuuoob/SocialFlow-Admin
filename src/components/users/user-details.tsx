'use client';

import { SlideOver } from '@/components/ui/modal';
import { User } from '@/lib/mock-data';
import { ScoreHistoryChart, ScoreEventList } from './score-history';
import { Badge, Button } from '@/components/ui/components';
import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';

interface UserDetailsProps {
    user: User | null;
    open: boolean;
    onClose: () => void;
}

export function UserDetails({ user, open, onClose }: UserDetailsProps) {
    if (!user) return null;

    const getScoreColor = (level: string) => {
        switch (level) {
            case 'Elevé': return 'bg-[#2E7D32]';
            case 'Moyen': return 'bg-[#C9A227]';
            case 'Faible': return 'bg-[#DC2626]';
            default: return 'bg-[#94A3B8]';
        }
    };

    const getScoreTextColor = (level: string) => {
        switch (level) {
            case 'Elevé': return 'text-[#2E7D32]';
            case 'Moyen': return 'text-[#C9A227]';
            case 'Faible': return 'text-[#DC2626]';
            default: return 'text-[#94A3B8]';
        }
    };

    return (
        <SlideOver title="Détails Utilisateur" isOpen={open} onClose={onClose}>
            <div className="space-y-8 pb-10">
                {/* Header Profile */}
                <div className="flex items-center gap-4">
                    <div className={`h-16 w-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white ${getScoreColor(user.scoreLevel)}`}>
                        {user.firstName[0]}{user.lastName[0]}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-[#1F2F56]">{user.firstName} {user.lastName}</h3>
                        <p className="text-sm text-[#94A3B8]">CIN: {user.cin}</p>
                        <p className="text-sm text-[#94A3B8]">CNSS: {user.cnssNumber}</p>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm text-[#64748B]">
                        <Mail className="h-4 w-4 text-[#94A3B8]" />
                        {user.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#64748B]">
                        <Phone className="h-4 w-4 text-[#94A3B8]" />
                        {user.phone}
                    </div>
                </div>

                {/* Score Section */}
                <div className="bg-[#F5F7FA] p-5 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-lg text-[#1F2F56]">Score de Risque</h4>
                        <Badge className={`${getScoreColor(user.scoreLevel)} text-white border-0 px-3 py-1`}>{user.scoreLevel}</Badge>
                    </div>

                    <div className="flex items-end gap-2">
                        <span className={`text-5xl font-bold ${getScoreTextColor(user.scoreLevel)}`}>
                            {user.score}
                        </span>
                        <span className="text-[#94A3B8] text-sm mb-2">/ 100</span>
                    </div>

                    <ScoreHistoryChart history={user.scoreHistory} />
                    <ScoreEventList history={user.scoreHistory} />
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[#F1F5F9]">
                    <h4 className="font-semibold mb-4 text-[#1F2F56]">Actions Rapides</h4>
                    <div className="flex gap-3">
                        <Button className="w-full rounded-xl">
                            <Link href={`/demandes?user=${user.id}`}>Voir Demandes</Link>
                        </Button>
                        <Button variant="outline" className="w-full rounded-xl">
                            Contacter
                        </Button>
                    </div>
                </div>
            </div>
        </SlideOver>
    );
}
