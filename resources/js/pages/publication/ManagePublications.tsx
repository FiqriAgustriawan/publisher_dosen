import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card } from '@/components/ui/card';
import { type BreadcrumbItem } from '@/types';
import PublicationsManager from '@/components/publications/publications-manager';
import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface Props {
  publications: any[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Manajemen Publikasi',
    href: '/manage-publications',
  },
];

export default function ManagePublications({ publications }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manajemen Publikasi" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manajemen Publikasi</h1>
         
        </div>
        <Card className="flex-1 p-6">
          <PublicationsManager publications={publications} />
        </Card>
      </div>
    </AppLayout>
  );
}