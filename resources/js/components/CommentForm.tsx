import React from 'react';
import { useForm } from '@inertiajs/react';
import { FiSend, FiAlertCircle } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CommentFormProps {
  publicationId: number;
}

export default function CommentForm({ publicationId }: CommentFormProps) {
  // Gunakan useForm dari @inertiajs/react
  const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
    nama: '',
    email: '',
    komentar: '',
    publication_id: publicationId,
    'g-recaptcha-response': 'development-mode', // Untuk development
  });

  // Sederhana tanpa reCAPTCHA
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post(route('comments.store'), {
      preserveScroll: true,
      onSuccess: () => reset('nama', 'email', 'komentar')
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 mb-8">
      <h3 className="text-xl font-bold mb-4">Tinggalkan Komentar</h3>

      {recentlySuccessful && (
        <Alert className="mb-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300">
          <AlertDescription>
            Terima kasih! Komentar Anda telah diterima dan akan ditampilkan setelah disetujui oleh admin.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nama">Nama</Label>
            <Input
              id="nama"
              type="text"
              value={data.nama}
              onChange={e => setData('nama', e.target.value)}
              placeholder="Masukkan nama Anda"
              required
            />
            {errors.nama && (
              <p className="text-red-500 text-sm">{errors.nama}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              placeholder="Masukkan email Anda"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="komentar">Komentar</Label>
          <Textarea
            id="komentar"
            value={data.komentar}
            onChange={e => setData('komentar', e.target.value)}
            placeholder="Tulis komentar Anda di sini"
            rows={4}
            required
          />
          {errors.komentar && (
            <p className="text-red-500 text-sm">{errors.komentar}</p>
          )}
        </div>

        {/* Hidden field */}
        <input type="hidden" name="g-recaptcha-response" value={data['g-recaptcha-response']} />

        <div className="pt-2">
          <Button
            type="submit"
            disabled={processing}
            className="bg-green-700 hover:bg-green-800"
          >
            <FiSend className="mr-2" />
            {processing ? 'Mengirim...' : 'Kirim Komentar'}
          </Button>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Semua komentar akan dimoderasi terlebih dahulu untuk memastikan kualitas diskusi.
          </p>
        </div>
      </form>
    </div>
  );
}