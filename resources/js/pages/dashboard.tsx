import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import PublicationsManager from '@/components/publications/publications-manager';
import AppLayout from '@/layouts/app-layout';
import { Card } from '@/components/ui/card';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FiBook, FiBookOpen, FiMessageCircle } from 'react-icons/fi';

interface Props {
    publications: any[];
    stats: {
        totalPublications: number;
        totalCatalogs: number;
        totalComments: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ publications, stats }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {/* Stats Cards */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                                <FiBook className="h-6 w-6 text-green-700 dark:text-green-300" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Publikasi</p>
                                <h3 className="text-2xl font-bold">{stats.totalPublications}</h3>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                                <FiBookOpen className="h-6 w-6 text-blue-700 dark:text-blue-300" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Katalog Buku</p>
                                <h3 className="text-2xl font-bold">{stats.totalCatalogs}</h3>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900">
                                <FiMessageCircle className="h-6 w-6 text-purple-700 dark:text-purple-300" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Komentar</p>
                                <h3 className="text-2xl font-bold">{stats.totalComments}</h3>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Publications Manager */}
                <Card className="flex-1 p-6">
                    <PublicationsManager publications={publications} />
                </Card>
            </div>
        </AppLayout>
    );
}
