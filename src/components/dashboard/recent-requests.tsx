'use client';

import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui/components';
import { MOCK_REQUESTS, MOCK_USERS } from '@/lib/mock-data';
import Link from 'next/link';

export function RecentRequests() {
    const recent = MOCK_REQUESTS.slice(0, 5);

    const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "warning" | "success" | "outline" => {
        switch (status) {
            case 'Acceptée': return 'success';
            case 'Refusée': return 'destructive';
            case 'En attente': return 'warning';
            case 'En cours CNSS': return 'secondary';
            default: return 'outline';
        }
    }

    const getInitialsBg = (scoreLevel: string) => {
        switch (scoreLevel) {
            case 'Faible': return 'bg-red-50 text-[#DC2626]';
            case 'Moyen': return 'bg-[#FFF8E1] text-[#C9A227]';
            case 'Elevé': return 'bg-[#E8F5E9] text-[#2E7D32]';
            default: return 'bg-[#1F2F56]/10 text-[#1F2F56]';
        }
    };

    return (
        <Card className="col-span-4 bg-white rounded-xl border-0 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <CardHeader className="flex flex-row items-center">
                <CardTitle className="text-base font-semibold text-[#1F2F56]">Demandes Récentes</CardTitle>
                <Button size="sm" variant="outline" className="ml-auto rounded-lg">
                    <Link href="/demandes">Voir tout</Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-1">
                    {recent.map(request => {
                        const user = MOCK_USERS.find(u => u.id === request.userId);
                        return (
                            <div key={request.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F5F7FA] transition-all duration-200">
                                <div className="flex items-center gap-3">
                                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-xs font-bold ${getInitialsBg(user?.scoreLevel || '')}`}>
                                        {user?.firstName[0]}{user?.lastName[0]}
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium text-[#1F2F56] leading-none">{user?.firstName} {user?.lastName}</p>
                                        <p className="text-xs text-[#94A3B8]">{request.type} • {user?.cnssNumber}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-[#1F2F56]">{request.amount} DH</p>
                                        <p className="text-xs text-[#94A3B8]">{new Date(request.date).toLocaleDateString()}</p>
                                    </div>
                                    <Badge variant={getStatusVariant(request.status)}>{request.status}</Badge>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
