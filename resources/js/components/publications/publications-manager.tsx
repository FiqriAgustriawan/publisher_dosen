import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

interface Publication {
  id: number;
  title: string;
  image: string;
  link_route: string;
  description: string;
  created_at: string;
  user: {
    name: string;
  };
}

export default function PublicationsManager({ publications }: { publications: Publication[] }) {
  const [isCreating, setIsCreating] = useState(false);
  const { data, setData, post, processing, reset, errors } = useForm({
    title: '',
    image: null as File | null,
    link_route: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('publications.store'), {
      onSuccess: () => {
        setIsCreating(false);
        reset();
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Publikasi Jurnal</h2>
        <Button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2"
        >
          <FiPlus /> Tambah Publikasi
        </Button>
      </div>

      {isCreating && (
        <div className="rounded-lg border p-4 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Judul</label>
              <Input
                type="text"
                value={data.title}
                onChange={e => setData('title', e.target.value)}
                placeholder="Masukkan judul publikasi"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Gambar</label>
              <Input
                type="file"
                onChange={e => setData('image', e.target.files?.[0] || null)}
                accept="image/*"
              />
              {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Link Route</label>
              <Input
                type="text"
                value={data.link_route}
                onChange={e => setData('link_route', e.target.value)}
                placeholder="Masukkan link publikasi"
              />
              {errors.link_route && <p className="text-red-500 text-sm">{errors.link_route}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Deskripsi</label>
              <Textarea
                value={data.description}
                onChange={e => setData('description', e.target.value)}
                placeholder="Masukkan deskripsi publikasi"
                rows={4}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreating(false)}
              >
                Batal
              </Button>
              <Button type="submit" disabled={processing}>
                Simpan
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {publications.map((pub) => (
          <div key={pub.id} className="flex justify-between items-start p-4 rounded-lg border">
            <div>
              {pub.image && (
                <img
                  src={`/storage/${pub.image}`}
                  alt={pub.title}
                  className="w-32 h-32 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="font-semibold">{pub.title}</h3>
              <p className="text-sm text-gray-500">Dibuat oleh: {pub.user.name}</p>
              <p className="text-sm text-gray-500">
                {new Date(pub.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <FiEdit2 className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="destructive">
                <FiTrash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}