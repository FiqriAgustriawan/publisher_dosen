import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card } from '@/components/ui/card';
import { type BreadcrumbItem } from '@/types';
import CatalogManager from '@/components/catalog/catalog-manager';
import { FiBook, FiList } from 'react-icons/fi';

interface Props {
  catalogs: any[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Kelola Katalog Buku',
    href: '/catalogs',
  },
];

export default function ManageCatalogs({ catalogs }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Kelola Katalog Buku" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Kelola Katalog Buku</h1>
          <Link
            href={route('catalogs.create')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <FiBook className="h-4 w-4" />
            <span>Tambah Buku Baru</span>
          </Link>
        </div>

        <Card className="flex-1 p-6">
          <CatalogManager catalogs={catalogs} />
        </Card>
      </div>
    </AppLayout>
  );
}