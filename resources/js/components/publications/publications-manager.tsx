import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';

interface Publication {
  id: number;
  title: string;
  image: string | null;
  link_route: string | null;
  description: string;
  created_at: string;
  user: {
    name: string;
  };
}

export default function PublicationsManager({ publications }: { publications: Publication[] }) {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  // Form untuk create
  const { data, setData, post, processing, reset, errors } = useForm({
    title: '',
    image: null as File | null,
    link_route: '',
    description: ''
  });

  // Form untuk edit
  const editForm = useForm({
    title: '',
    image: null as File | null,
    link_route: '',
    description: '',
    _method: 'put'
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

  const handleEdit = (pub: Publication) => {
    setIsEditing(pub.id);
    editForm.setData({
      title: pub.title,
      image: null,
      link_route: pub.link_route || '',
      description: pub.description,
      _method: 'put'
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing === null) return;

    editForm.post(route('publications.update', { id: isEditing }), {
      onSuccess: () => {
        setIsEditing(null);
        editForm.reset();
      },
    });
  };

  const handleDelete = (id: number) => {
    setShowDeleteConfirm(id);
  };

  const confirmDelete = (id: number) => {
    router.delete(route('publications.destroy', id));
    setShowDeleteConfirm(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Publikasi Jurnal</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
        >
          <FiPlus /> Tambah Publikasi
        </button>
      </div>

      {/* Form Create */}
      {isCreating && (
        <div className="rounded-lg border p-4 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Judul</label>
              <input
                type="text"
                className="w-full border rounded-md p-2"
                value={data.title}
                onChange={e => setData('title', e.target.value)}
                placeholder="Masukkan judul publikasi"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Gambar</label>
              <input
                type="file"
                className="w-full border rounded-md p-2"
                onChange={e => setData('image', e.target.files?.[0] || null)}
                accept="image/*"
              />
              {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Link Route</label>
              <input
                type="text"
                className="w-full border rounded-md p-2"
                value={data.link_route}
                onChange={e => setData('link_route', e.target.value)}
                placeholder="Masukkan link publikasi"
              />
              {errors.link_route && <p className="text-red-500 text-sm">{errors.link_route}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Deskripsi</label>
              <textarea
                className="w-full border rounded-md p-2"
                value={data.description}
                onChange={e => setData('description', e.target.value)}
                placeholder="Masukkan deskripsi publikasi"
                rows={4}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="border px-4 py-2 rounded-md hover:bg-gray-50"
                onClick={() => setIsCreating(false)}
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={processing}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List publikasi */}
      <div className="grid gap-4">
        {publications.map((pub) => (
          <div key={pub.id} className="flex justify-between items-start p-4 rounded-lg border relative">
            {isEditing === pub.id ? (
              <form onSubmit={handleUpdate} className="w-full space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Judul</label>
                  <input
                    type="text"
                    className="w-full border rounded-md p-2"
                    value={editForm.data.title}
                    onChange={e => editForm.setData('title', e.target.value)}
                  />
                  {editForm.errors.title && <p className="text-red-500 text-sm">{editForm.errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Gambar</label>
                  {pub.image && (
                    <div className="mb-2">
                      <img
                        src={`/storage/${pub.image}`}
                        alt={pub.title}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    className="w-full border rounded-md p-2"
                    onChange={e => editForm.setData('image', e.target.files?.[0] || null)}
                    accept="image/*"
                  />
                  {editForm.errors.image && <p className="text-red-500 text-sm">{editForm.errors.image}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Link Route</label>
                  <input
                    type="text"
                    className="w-full border rounded-md p-2"
                    value={editForm.data.link_route}
                    onChange={e => editForm.setData('link_route', e.target.value)}
                  />
                  {editForm.errors.link_route && <p className="text-red-500 text-sm">{editForm.errors.link_route}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Deskripsi</label>
                  <textarea
                    className="w-full border rounded-md p-2"
                    value={editForm.data.description}
                    onChange={e => editForm.setData('description', e.target.value)}
                    rows={4}
                  />
                  {editForm.errors.description && <p className="text-red-500 text-sm">{editForm.errors.description}</p>}
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="border px-4 py-2 rounded-md hover:bg-gray-50"
                    onClick={() => setIsEditing(null)}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={editForm.processing}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
                  >
                    Update
                  </button>
                </div>
              </form>
            ) : (
              <>
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
                  <button
                    className="bg-blue-100 border p-2 rounded-md hover:bg-blue-200 text-blue-600"
                    onClick={() => handleEdit(pub)}
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    className="bg-red-100 p-2 rounded-md hover:bg-red-200 text-red-600"
                    onClick={() => handleDelete(pub.id)}
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}

            {/* Delete Confirmation - Fixed Modal */}
            {showDeleteConfirm === pub.id && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl border dark:border-gray-700 max-w-md w-full">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3">Konfirmasi Hapus</h3>
                  <p className="mb-6 text-gray-600 dark:text-gray-300">
                    Apakah Anda yakin ingin menghapus publikasi "{pub.title}"?
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowDeleteConfirm(null)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => confirmDelete(pub.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}