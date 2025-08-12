import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card } from '@/components/ui/card';
import { type BreadcrumbItem } from '@/types';
import { LayoutDashboard, FileText, BookOpen, MessageSquare, ArrowRight } from 'lucide-react';

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
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Link href={route('manage.publications')}>
            <Card className="p-6 h-full hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                  <FileText className="h-6 w-6 text-green-700 dark:text-green-300" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Total Publikasi</p>
                  <h3 className="text-2xl font-bold">{stats.totalPublications}</h3>
                </div>
                <ArrowRight className="text-gray-400" />
              </div>
            </Card>
          </Link>

          <Link href={route('manage.catalogs')}>
            <Card className="p-6 h-full hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                  <BookOpen className="h-6 w-6 text-blue-700 dark:text-blue-300" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Katalog Buku</p>
                  <h3 className="text-2xl font-bold">{stats.totalCatalogs}</h3>
                </div>
                <ArrowRight className="text-gray-400" />
              </div>
            </Card>
          </Link>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900">
                <MessageSquare className="h-6 w-6 text-purple-700 dark:text-purple-300" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Komentar</p>
                <h3 className="text-2xl font-bold">{stats.totalComments}</h3>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="flex-1 p-6">
          <h2 className="text-xl font-semibold mb-4">Aktivitas Terbaru</h2>

          {/* Recent Publications */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Publikasi Terbaru</h3>
              <Link href={route('manage.publications')} className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1">
                Lihat Semua <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {publications.slice(0, 3).map((pub) => (
                <div key={pub.id} className="border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <h4 className="font-medium">{pub.title}</h4>
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center mt-1">
                    <span>Oleh: {pub.user.name}</span>
                    <span>{new Date(pub.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-lg font-medium mb-3">Aksi Cepat</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link
                href={route('publications.store')}
                className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-3"
              >
                <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                  <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-medium">Tambah Publikasi</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Buat publikasi jurnal baru</p>
                </div>
              </Link>

              <Link
                href={route('catalogs.store')}
                className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-3"
              >
                <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                  <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium">Tambah Katalog Buku</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Upload buku baru ke katalog</p>
                </div>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}