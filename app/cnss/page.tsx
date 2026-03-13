'use client';

import { useState } from 'react';
import { MOCK_REQUESTS, MOCK_USERS } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui/components';
import { Modal } from '@/components/ui/modal';
import { format } from 'date-fns';
import { Building2, Pencil } from 'lucide-react';

export default function CNSSPage() {
    // Filter requests relevant to CNSS
    const [requests, setRequests] = useState(MOCK_REQUESTS.filter(r => r.type === 'Décès' || r.type === 'Remboursement CNSS'));
    const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

    const handleUpdate = (id: string, newStatus: string) => {
        setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus as any } : r));
        setSelectedRequest(null);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Suivi Dossiers CNSS</h2>

            <Card>
                <CardHeader>
                    <CardTitle>Dossiers en cours</CardTitle>
                </CardHeader>
                <CardContent>
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/40">
                            <tr>
                                <th className="p-4">Dossier</th>
                                <th className="p-4">Assuré</th>
                                <th className="p-4">Matricule CNSS</th>
                                <th className="p-4">Date Dépôt</th>
                                <th className="p-4">Statut Actuel</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(req => {
                                const user = MOCK_USERS.find(u => u.id === req.userId);
                                return (
                                    <tr key={req.id} className="border-b">
                                        <td className="p-4 font-medium">{req.type}</td>
                                        <td className="p-4">{user?.firstName} {user?.lastName}</td>
                                        <td className="p-4 font-mono text-xs">{user?.cnssNumber}</td>
                                        <td className="p-4">{format(new Date(req.date), 'dd/MM/yyyy')}</td>
                                        <td className="p-4"><Badge variant="outline">{req.status}</Badge></td>
                                        <td className="p-4 text-right">
                                            <Button size="sm" variant="outline" onClick={() => setSelectedRequest(req.id)}>
                                                <Pencil className="h-3 w-3 mr-2" />
                                                Mettre à jour
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </CardContent>
            </Card>

            <Modal
                isOpen={!!selectedRequest}
                onClose={() => setSelectedRequest(null)}
                title="Mise à jour Dossier CNSS"
                footer={
                    <>
                        <Button variant="outline" onClick={() => setSelectedRequest(null)}>Annuler</Button>
                        <Button onClick={() => selectedRequest && handleUpdate(selectedRequest, 'Clôturée')}>Marquer comme Remboursé</Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Mettre à jour le statut du dossier auprès de la CNSS.</p>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Statut</label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <option>En cours de traitement</option>
                            <option>Remboursé</option>
                            <option>Rejeté</option>
                        </select>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
