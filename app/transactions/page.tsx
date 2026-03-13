'use client';

import { MOCK_TRANSACTIONS, MOCK_USERS } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui/components';
import { format } from 'date-fns';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function TransactionsPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>

            <Card>
                <CardHeader>
                    <CardTitle>Historique des Avances</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {MOCK_TRANSACTIONS.map(tx => {
                            const user = MOCK_USERS.find(u => u.id === tx.userId);
                            return (
                                <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-muted/20 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${tx.type === 'Avance' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                            {tx.type === 'Avance' ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownLeft className="h-5 w-5" />}
                                        </div>
                                        <div>
                                            <div className="font-medium">{tx.type} - {user?.firstName} {user?.lastName}</div>
                                            <div className="text-xs text-muted-foreground">{format(new Date(tx.date), 'dd MMM yyyy HH:mm')} • ID: {tx.id}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`font-bold ${tx.type === 'Avance' ? 'text-red-600' : 'text-green-600'}`}>
                                            {tx.type === 'Avance' ? '-' : '+'}{tx.amount} DH
                                        </div>
                                        <Badge variant="outline" className="mt-1">{tx.status}</Badge>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
