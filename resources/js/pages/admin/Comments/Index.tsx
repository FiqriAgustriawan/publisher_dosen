import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
// Sesuaikan import AppLayout dengan struktur project Anda
import AppLayout from '@/layouts/app-layout';
// Atau jika AppLayout adalah component:
// import { AppLayout } from '@/components/app-layout';

import { Button } from '@/components/ui/button';
import {
  Table, TableHeader, TableRow, TableHead,
  TableBody, TableCell
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Trash2, Eye } from 'lucide-react';

interface Comment {
  id: number;
  nama: string;
  email: string;
  komentar: string;
  status: string;
  created_at: string;
  publication: {
    id: number;
    title: string;
  };
}

interface Props {
  comments: {
    data: Comment[];
    links: any[];
  };
}

export default function Index({ comments }: Props) {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const { delete: destroy, put, processing } = useForm();

  const approveComment = (id: number) => {
    put(route('admin.comments.approve', id));
  };

  const rejectComment = (id: number) => {
    put(route('admin.comments.reject', id));
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setShowDialog(true);
  };

  const handleDelete = () => {
    if (deleteId) {
      destroy(route('admin.comments.destroy', deleteId), {
        onSuccess: () => {
          setShowDialog(false);
        },
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Disetujui</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Ditolak</Badge>;
      default:
        return <Badge variant="outline">Menunggu</Badge>;
    }
  };

  const filteredComments = comments.data.filter(comment => {
    if (filter === 'all') return true;
    return comment.status === filter;
  });

  const pendingCount = comments.data.filter(comment => comment.status === 'pending').length;

  // Jika struktur layout admin Anda menggunakan pattern tertentu, pastikan konsisten
  return (
    <AppLayout>
      <Head title="Manajemen Komentar" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Manajemen Komentar</h1>

            <div className="flex items-center space-x-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
              >
                Semua
              </Button>
              <Button
                variant={filter === 'pending' ? 'default' : 'outline'}
                onClick={() => setFilter('pending')}
                className="flex items-center gap-1"
              >
                Menunggu
                {pendingCount > 0 && (
                  <Badge variant="destructive" className="ml-1">
                    {pendingCount}
                  </Badge>
                )}
              </Button>
              <Button
                variant={filter === 'approved' ? 'default' : 'outline'}
                onClick={() => setFilter('approved')}
              >
                Disetujui
              </Button>
              <Button
                variant={filter === 'rejected' ? 'default' : 'outline'}
                onClick={() => setFilter('rejected')}
              >
                Ditolak
              </Button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            {filteredComments.length === 0 ? (
              <div className="p-6 text-center">
                <p>Belum ada komentar</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Publikasi</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredComments.map((comment) => (
                      <TableRow key={comment.id}>
                        <TableCell>{comment.nama}</TableCell>
                        <TableCell>{comment.email}</TableCell>
                        <TableCell>
                          <Link
                            href={route('publications.show', comment.publication.id)}
                            className="text-blue-600 hover:underline"
                          >
                            {comment.publication.title.length > 30
                              ? comment.publication.title.substring(0, 30) + '...'
                              : comment.publication.title}
                          </Link>
                        </TableCell>
                        <TableCell>{getStatusBadge(comment.status)}</TableCell>
                        <TableCell>
                          {new Date(comment.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              title="Lihat Detail"
                              onClick={() => alert(comment.komentar)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {comment.status !== 'approved' && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-green-600"
                                title="Setujui"
                                onClick={() => approveComment(comment.id)}
                                disabled={processing}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            {comment.status !== 'rejected' && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-amber-600"
                                title="Tolak"
                                onClick={() => rejectComment(comment.id)}
                                disabled={processing}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              title="Hapus"
                              onClick={() => confirmDelete(comment.id)}
                              disabled={processing}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

          {/* Pagination */}
          {comments.links && (
            <div className="mt-4">
              {/* Implementasikan pagination sesuai kebutuhan */}
            </div>
          )}
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus komentar ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={processing}>
              {processing ? 'Menghapus...' : 'Hapus'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}