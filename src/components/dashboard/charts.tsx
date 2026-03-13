'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/components";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie, Legend } from 'recharts';
import { MOCK_REQUESTS } from "@/lib/mock-data";

// Brand-consistent chart colors
const STATUS_COLORS: Record<string, string> = {
    'En attente': '#C9A227',    // Gold
    'Acceptée': '#2E7D32',      // Green
    'Refusée': '#DC2626',       // Red
    'En cours CNSS': '#1F2F56', // Navy
    'Clôturée': '#64748B',      // Gray
};

const TYPE_COLORS: Record<string, string> = {
    'Avance salaire': '#1F2F56',      // Navy
    'Décès': '#2E7D32',               // Green
    'Micro-crédit': '#C9A227',        // Gold
    'Obsèques': '#4CAF50',            // Light Green
    'Remboursement CNSS': '#152240',  // Dark Blue
};

export function DashboardCharts() {
    // Aggregate by status
    const statusCounts = MOCK_REQUESTS.reduce((acc, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const barData = Object.keys(statusCounts).map(status => ({
        name: status,
        count: statusCounts[status],
        fill: STATUS_COLORS[status] || '#94A3B8'
    }));

    // Aggregate by type
    const typeCounts = MOCK_REQUESTS.reduce((acc, curr) => {
        acc[curr.type] = (acc[curr.type] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const pieData = Object.keys(typeCounts).map(type => ({
        name: type,
        value: typeCounts[type],
        fill: TYPE_COLORS[type] || '#94A3B8'
    }));

    return (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-white rounded-xl border-0 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <CardHeader>
                    <CardTitle className="text-base font-semibold text-[#1F2F56]">Demandes par Statut</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(31,47,86,0.04)' }}
                                    contentStyle={{
                                        background: '#FFFFFF',
                                        border: '1px solid #E2E8F0',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                        padding: '8px 12px'
                                    }}
                                />
                                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                                    {barData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
            <Card className="col-span-3 bg-white rounded-xl border-0 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <CardHeader>
                    <CardTitle className="text-base font-semibold text-[#1F2F56]">Types de Demandes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={65}
                                    outerRadius={85}
                                    paddingAngle={4}
                                    dataKey="value"
                                    strokeWidth={0}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        background: '#FFFFFF',
                                        border: '1px solid #E2E8F0',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                        padding: '8px 12px'
                                    }}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconType="circle"
                                    iconSize={8}
                                    formatter={(value) => <span style={{ color: '#475569', fontSize: '12px' }}>{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
