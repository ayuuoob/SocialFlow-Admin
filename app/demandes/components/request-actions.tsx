'use client';

import { Request, User } from '@/lib/mock-data';
import { Button } from '@/components/ui/components';
import { CheckCircle, XCircle, Clock, Send } from 'lucide-react';

interface RequestActionsProps {
    request: Request;
    user: User;
    onStatusChange: (status: string) => void;
}

export function RequestActions({ request, user, onStatusChange }: RequestActionsProps) {
    const isActionable = request.status === 'En attente' || request.status === 'En cours CNSS';

    if (!isActionable) {
        return (
            <div className="text-sm text-[#94A3B8] italic p-4 bg-[#F5F7FA] rounded-xl text-center">
                Aucune action disponible pour le statut « {request.status} »
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Risk summary */}
            <div className={`p-4 rounded-xl text-sm ${user.scoreLevel === 'Faible'
                    ? 'bg-red-50 text-[#DC2626]'
                    : user.scoreLevel === 'Moyen'
                        ? 'bg-[#FFF8E1] text-[#C9A227]'
                        : 'bg-[#E8F5E9] text-[#2E7D32]'
                }`}>
                <span className="font-semibold">Niveau de risque :</span> {user.scoreLevel} (Score {user.score}/100)
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
                <Button
                    className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white flex items-center gap-2 rounded-xl shadow-sm"
                    onClick={() => onStatusChange('Acceptée')}
                >
                    <CheckCircle className="h-4 w-4" />
                    Accepter
                </Button>

                <Button
                    variant="destructive"
                    className="flex items-center gap-2 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white shadow-sm"
                    onClick={() => onStatusChange('Refusée')}
                >
                    <XCircle className="h-4 w-4" />
                    Refuser
                </Button>

                {request.status === 'En attente' && (
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 rounded-xl"
                        onClick={() => onStatusChange('En cours CNSS')}
                    >
                        <Send className="h-4 w-4" />
                        Transmettre à la CNSS
                    </Button>
                )}

                <Button
                    variant="outline"
                    className="flex items-center gap-2 rounded-xl"
                    onClick={() => onStatusChange('En attente')}
                >
                    <Clock className="h-4 w-4" />
                    Mettre en attente
                </Button>
            </div>
        </div>
    );
}
