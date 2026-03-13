'use client';

import { useState } from 'react';
import { MOCK_USERS, User } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui/components';
import { UserDetails } from '@/components/users/user-details';
import { Search } from 'lucide-react';

export default function UsersPage() {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [search, setSearch] = useState('');

    const filteredUsers = MOCK_USERS.filter(u =>
        u.lastName.toLowerCase().includes(search.toLowerCase()) ||
        u.firstName.toLowerCase().includes(search.toLowerCase()) ||
        u.cin.toLowerCase().includes(search.toLowerCase())
    );

    const getScoreVariant = (level: string): "default" | "secondary" | "destructive" | "success" | "warning" => {
        switch (level) {
            case 'Elevé': return 'success';
            case 'Moyen': return 'warning';
            case 'Faible': return 'destructive';
            default: return 'default';
        }
    }

    const getScoreBadgeStyle = (level: string): string => {
        switch (level) {
            case 'Elevé': return 'bg-[#E8F5E9] text-[#2E7D32] border-0';
            case 'Moyen': return 'bg-[#FFF8E1] text-[#C9A227] border-0';
            case 'Faible': return 'bg-red-50 text-[#DC2626] border-0';
            default: return '';
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-[#1F2F56]">Utilisateurs</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#94A3B8]" />
                    <input
                        placeholder="Rechercher..."
                        className="pl-9 pr-4 py-2 rounded-xl text-sm w-64 md:w-80 bg-white border-0 shadow-[0_1px_3px_rgba(0,0,0,0.06)] focus:outline-none focus:ring-2 focus:ring-[#1F2F56]/20 placeholder:text-[#94A3B8]"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <Card className="bg-white rounded-xl border-0 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <CardHeader>
                    <CardTitle className="text-base font-semibold text-[#1F2F56]">Liste des Clients ({filteredUsers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead>
                                <tr className="border-b border-[#F1F5F9]">
                                    <th className="h-12 px-4 align-middle font-medium text-[#94A3B8] text-xs uppercase tracking-wider">Nom Complet</th>
                                    <th className="h-12 px-4 align-middle font-medium text-[#94A3B8] text-xs uppercase tracking-wider">CIN</th>
                                    <th className="h-12 px-4 align-middle font-medium text-[#94A3B8] text-xs uppercase tracking-wider">CNSS</th>
                                    <th className="h-12 px-4 align-middle font-medium text-[#94A3B8] text-xs uppercase tracking-wider">Score</th>
                                    <th className="h-12 px-4 align-middle font-medium text-[#94A3B8] text-xs uppercase tracking-wider">Niveau</th>
                                    <th className="h-12 px-4 align-middle font-medium text-[#94A3B8] text-xs uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="border-b border-[#F5F7FA] transition-colors hover:bg-[#F5F7FA] hover:cursor-pointer" onClick={() => setSelectedUser(user)}>
                                        <td className="p-4 align-middle">
                                            <div className="flex items-center gap-3">
                                                <div className={`h-9 w-9 rounded-xl flex items-center justify-center text-xs font-bold ${user.scoreLevel === 'Faible' ? 'bg-red-50 text-[#DC2626]' :
                                                        user.scoreLevel === 'Moyen' ? 'bg-[#FFF8E1] text-[#C9A227]' :
                                                            'bg-[#E8F5E9] text-[#2E7D32]'
                                                    }`}>
                                                    {user.firstName[0]}{user.lastName[0]}
                                                </div>
                                                <span className="font-medium text-[#1F2F56]">{user.lastName} {user.firstName}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 align-middle text-[#64748B]">{user.cin}</td>
                                        <td className="p-4 align-middle text-[#64748B]">{user.cnssNumber}</td>
                                        <td className="p-4 align-middle">
                                            <span className={`text-sm font-bold ${user.scoreLevel === 'Faible' ? 'text-[#DC2626]' :
                                                    user.scoreLevel === 'Moyen' ? 'text-[#C9A227]' :
                                                        'text-[#2E7D32]'
                                                }`}>{user.score}</span>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <Badge variant={getScoreVariant(user.scoreLevel)} className={getScoreBadgeStyle(user.scoreLevel)}>
                                                {user.scoreLevel}
                                            </Badge>
                                        </td>
                                        <td className="p-4 align-middle text-right">
                                            <Button variant="ghost" size="sm" className="text-[#64748B] hover:text-[#1F2F56]" onClick={(e) => { e.stopPropagation(); setSelectedUser(user); }}>Voir</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <UserDetails
                user={selectedUser}
                open={!!selectedUser}
                onClose={() => setSelectedUser(null)}
            />
        </div>
    );
}
