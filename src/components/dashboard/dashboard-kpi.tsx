'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/components';
import { Users, FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { MOCK_REQUESTS, MOCK_USERS } from '@/lib/mock-data';

export function DashboardKPIs() {
    const totalRequests = MOCK_REQUESTS.length;
    const pendingRequests = MOCK_REQUESTS.filter(r => r.status === 'En attente').length;
    const acceptedRequests = MOCK_REQUESTS.filter(r => r.status === 'Acceptée').length;
    const riskyUsers = MOCK_USERS.filter(u => u.scoreLevel === 'Faible').length;

    const kpiData = [
        {
            title: "Total Demandes",
            value: totalRequests,
            icon: FileText,
            description: "+2 depuis hier",
            iconColor: "text-[#1F2F56]",
            iconBg: "bg-[#1F2F56]/10",
            valueColor: "text-[#1F2F56]",
        },
        {
            title: "En Attente",
            value: pendingRequests,
            icon: Clock,
            description: "Nécessite action",
            iconColor: "text-[#C9A227]",
            iconBg: "bg-[#C9A227]/10",
            valueColor: "text-[#C9A227]",
        },
        {
            title: "Acceptées",
            value: acceptedRequests,
            icon: CheckCircle,
            description: "Ce mois-ci",
            iconColor: "text-[#2E7D32]",
            iconBg: "bg-[#2E7D32]/10",
            valueColor: "text-[#2E7D32]",
        },
        {
            title: "Utilisateurs à Risque",
            value: riskyUsers,
            icon: AlertTriangle,
            description: "Score faible",
            iconColor: "text-[#DC2626]",
            iconBg: "bg-red-50",
            valueColor: "text-[#DC2626]",
            alert: true
        }
    ];

    return (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {kpiData.map((kpi, index) => (
                <Card key={index} className="bg-white rounded-xl border-0 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-[#64748B]">
                            {kpi.title}
                        </CardTitle>
                        <div className={`h-9 w-9 rounded-xl ${kpi.iconBg} flex items-center justify-center`}>
                            <kpi.icon className={`h-[18px] w-[18px] ${kpi.iconColor}`} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className={`text-3xl font-bold ${kpi.valueColor}`}>{kpi.value}</div>
                        <p className={`text-xs mt-1 ${kpi.alert ? 'text-[#DC2626] font-medium' : 'text-[#94A3B8]'}`}>
                            {kpi.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
