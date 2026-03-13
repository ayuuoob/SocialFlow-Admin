import { DashboardKPIs } from '@/components/dashboard/dashboard-kpi';
import { DashboardCharts } from '@/components/dashboard/charts';
import { RecentRequests } from '@/components/dashboard/recent-requests';

export default function Home() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        Dernière mise à jour: Aujourd'hui, 09:41
                    </span>
                </div>
            </div>

            <DashboardKPIs />

            <div className="grid gap-6">
                <DashboardCharts />
                <RecentRequests />
            </div>
        </div>
    );
}
