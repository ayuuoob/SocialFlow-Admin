'use client';

import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui/components';

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Paramètres</h2>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Configuration du Scoring</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Seuil de Risque Faible</label>
                            <div className="flex items-center gap-2">
                                <input type="number" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" defaultValue={40} />
                                <span className="text-sm text-muted-foreground">points</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Les utilisateurs en dessous de ce score déclencheront une alerte.</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Seuil de Risque Moyen</label>
                            <input type="number" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" defaultValue={70} />
                        </div>
                        <Button>Sauvegarder les seuils</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Préférences de l'application</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Notifications Email</span>
                            <input type="checkbox" defaultChecked className="h-4 w-4" />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Auto-refresh du Dashboard</span>
                            <input type="checkbox" className="h-4 w-4" />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Mode Sombre par défaut</span>
                            <input type="checkbox" className="h-4 w-4" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
