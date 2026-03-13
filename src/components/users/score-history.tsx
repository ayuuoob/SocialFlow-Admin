'use client';

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ScoreEvent } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/components';
import { format } from 'date-fns';

export function ScoreHistoryChart({ history }: { history: ScoreEvent[] }) {
    const sortedHistory = [...history].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const data = sortedHistory.map(h => ({
        date: format(new Date(h.date), 'dd/MM'),
        score: h.score,
        reason: h.reason
    }));

    return (
        <Card className="h-[300px] bg-white rounded-xl border-0 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#64748B]">Évolution du Score</CardTitle>
            </CardHeader>
            <CardContent className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                        <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis domain={[0, 100]} stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{
                                background: '#FFFFFF',
                                border: '1px solid #E2E8F0',
                                borderRadius: '12px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                padding: '8px 12px'
                            }}
                            labelStyle={{ fontWeight: 'bold', color: '#1F2F56' }}
                        />
                        <Line type="monotone" dataKey="score" stroke="#1F2F56" strokeWidth={2.5} dot={{ r: 4, fill: '#1F2F56' }} activeDot={{ r: 6, fill: '#2E7D32' }} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

export function ScoreEventList({ history }: { history: ScoreEvent[] }) {
    const sortedHistory = [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="space-y-4">
            <h4 className="text-sm font-semibold mb-2 text-[#1F2F56]">Historique des événements</h4>
            <div className="space-y-3 relative border-l-2 border-[#E2E8F0] ml-2 pl-4">
                {sortedHistory.map((event, i) => (
                    <div key={i} className="relative">
                        <div className={`absolute -left-[21px] top-1 h-3 w-3 rounded-full ${event.delta >= 0 ? 'bg-[#2E7D32]' : 'bg-[#DC2626]'} ring-2 ring-white`} />
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-[#1F2F56]">{event.reason}</p>
                                <p className="text-xs text-[#94A3B8]">{format(new Date(event.date), 'dd MMM yyyy')}</p>
                            </div>
                            <span className={`text-sm font-bold ${event.delta > 0 ? 'text-[#2E7D32]' : event.delta < 0 ? 'text-[#DC2626]' : 'text-[#94A3B8]'}`}>
                                {event.delta > 0 ? '+' : ''}{event.delta === 0 ? '-' : event.delta}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
