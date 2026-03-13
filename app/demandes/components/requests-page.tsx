'use client';

import { useState } from 'react';
import { MOCK_REQUESTS, MOCK_USERS, Request } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui/components';
import { SlideOver } from '@/components/ui/modal';
import { RequestActions } from './request-actions';
import { Search, Filter } from 'lucide-react';
import { format } from 'date-fns';

export default function RequestsPage() {
    // Local state for requests allows us to mock updates
    const [requests, setRequests] = useState(MOCK_REQUESTS);
    const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('All');

    const handleStatusChange = (requestId: string, newStatus: string) => {
        setRequests(requests.map(r => r.id === requestId ? { ...r, status: newStatus as any } : r));
        if (selectedRequest && selectedRequest.id === requestId) {
            setSelectedRequest({ ...selectedRequest, status: newStatus as any });
        }
    };

    const filteredRequests = requests.filter(r => {
        const user = MOCK_USERS.find(u => u.id === r.userId);
        const matchesSearch =
            user?.lastName.toLowerCase().includes(search.toLowerCase()) ||
            user?.firstName.toLowerCase().includes(search.toLowerCase()) ||
            r.type.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Acceptée': return 'success';
            case 'Refusée': return 'destructive';
            case 'En attente': return 'warning';
            case 'En cours CNSS': return 'secondary';
            default: return 'outline';
        }
    }

    const selectedUser = selectedRequest ? MOCK_USERS.find(u => u.id === selectedRequest.userId) : undefined;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-3xl font-bold tracking-tight">Demandes</h2>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            placeholder="Rechercher..."
                            className="pl-9 pr-4 py-2 border rounded-md text-sm w-64"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="h-10 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">Tous les statuts</option>
                        <option value="En attente">En attente</option>
                        <option value="Acceptée">Acceptée</option>
                        <option value="En cours CNSS">En cours CNSS</option>
                        <option value="Refusée">Refusée</option>
                    </select>
                </div>
            </div>

            <Card>
                <CardHeader className="p-4">
                    {/* Maybe put tabs here later */}
                </CardHeader>
                <CardContent className="p-0">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead className="[&_tr]:border-b bg-muted/40">
                                <tr className="border-b transition-colors">
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">ID</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Demandeur</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Type</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Date</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Montant</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Score</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Statut</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRequests.map((req) => {
                                    const u = MOCK_USERS.find(user => user.id === req.userId);
                                    return (
                                        <tr key={req.id} className="border-b transition-colors hover:bg-muted/20 cursor-pointer" onClick={() => setSelectedRequest(req)}>
                                            <td className="p-4 align-middle font-medium text-xs text-muted-foreground">{req.id}</td>
                                            <td className="p-4 align-middle font-medium">
                                                <div>{u?.firstName} {u?.lastName}</div>
                                                <div className="text-xs text-muted-foreground">{u?.cin}</div>
                                            </td>
                                            <td className="p-4 align-middle">{req.type}</td>
                                            <td className="p-4 align-middle text-muted-foreground">{format(new Date(req.date), 'dd/MM/yyyy')}</td>
                                            <td className="p-4 align-middle font-bold">{req.amount} DH</td>
                                            <td className="p-4 align-middle">
                                                <Badge variant="outline" className={`${u?.scoreLevel === 'Faible' ? 'border-red-500 text-red-600 bg-red-50' : 'bg-transparent'}`}>
                                                    {u?.score}
                                                </Badge>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <Badge variant={getStatusVariant(req.status)}>{req.status}</Badge>
                                            </td>
                                            <td className="p-4 align-middle text-right">
                                                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedRequest(req); }}>Voir</Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* DETAILS SLIDEOVER */}
            {selectedRequest && selectedUser && (
                <SlideOver
                    isOpen={!!selectedRequest}
                    onClose={() => setSelectedRequest(null)}
                    title={`Demande ${selectedRequest.id}`}
                >
                    <div className="space-y-8 pb-10">
                        {/* Status Bar */}
                        <div className="flex items-center justify-between bg-muted/30 p-4 rounded-lg border">
                            <div className="text-sm font-medium text-muted-foreground">Statut actuel</div>
                            <Badge variant={getStatusVariant(selectedRequest.status)} className="text-sm px-3 py-1">
                                {selectedRequest.status}
                            </Badge>
                        </div>

                        {/* Request Info */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Détails Demande</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="space-y-1">
                                    <div className="text-muted-foreground">Type</div>
                                    <div className="font-medium">{selectedRequest.type}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-muted-foreground">Date</div>
                                    <div className="font-medium">{format(new Date(selectedRequest.date), 'dd MMMM yyyy')}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-muted-foreground">Montant demandé</div>
                                    <div className="font-medium text-lg text-primary">{selectedRequest.amount} DH</div>
                                </div>
                            </div>
                            <div className="mt-4 space-y-1">
                                <div className="text-muted-foreground text-sm">Description / Motif</div>
                                <div className="p-3 bg-muted/20 rounded-md text-sm italic">
                                    {selectedRequest.description}
                                </div>
                            </div>
                        </div>

                        {/* User Info & Score Context */}
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold mb-3">Information Client & Risque</h3>
                            <div className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                                    {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium">{selectedUser.firstName} {selectedUser.lastName}</div>
                                    <div className="text-sm text-muted-foreground mb-2">{selectedUser.cin} - {selectedUser.cnssNumber}</div>

                                    <div className="flex items-center gap-3">
                                        <Badge className={`${selectedUser.scoreLevel === 'Faible' ? 'bg-red-500 hover:bg-red-600' : 'bg-primary'}`}>
                                            Score: {selectedUser.score}/100
                                        </Badge>
                                        <span className="text-sm font-medium text-muted-foreground">Niveau: {selectedUser.scoreLevel}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold mb-4">Actions</h3>
                            <RequestActions
                                request={selectedRequest}
                                user={selectedUser}
                                onStatusChange={(status) => handleStatusChange(selectedRequest.id, status)}
                            />
                        </div>
                    </div>
                </SlideOver>
            )}
        </div>
    );
}
