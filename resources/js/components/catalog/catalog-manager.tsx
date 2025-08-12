import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { FiEdit2, FiTrash2, FiDownload, FiBook, FiEye, FiX } from 'react-icons/fi';

interface Catalog {
  id: number;
  nama: string;
  deskripsi: string;
  gambar_sampul: string | null;
  pdf_file_buku: string | null;
  created_at: string;
}

export default function CatalogManager({ catalogs }: { catalogs: Catalog[] }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [catalogToDelete, setCatalogToDelete] = useState<Catalog | null>(null);

  const handleDelete = (catalog: Catalog) => {
    setShowDeleteConfirm(catalog.id);
    setCatalogToDelete(catalog);
  };

  const confirmDelete = (id: number) => {
    router.delete(route('catalogs.destroy', id));
    setShowDeleteConfirm(null);
    setCatalogToDelete(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {catalogs.length === 0 ? (
        <div className="text-center py-8">
          <FiBook className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Belum ada katalog buku</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Mulai dengan menambahkan buku pertama Anda ke dalam katalog.
          </p>
          <div className="mt-6">
            <Link
              href={route('catalogs.create')}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <FiBook className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Tambah Buku Baru
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogs.map((catalog) => (
            <div
              key={catalog.id}
              className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm overflow-hidden flex flex-col relative"
            >
              {/* Cover Image */}
              <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                {catalog.gambar_sampul ? (
                  <>
                    <img
                      src={`/storage/${catalog.gambar_sampul}`}
                      alt={catalog.nama}
                      className="w-full h-full object-cover"
                      onClick={() => setPreviewImage(`/storage/${catalog.gambar_sampul}`)}
                    />
                    <button
                      className="absolute top-2 right-2 bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-sm"
                      onClick={() => setPreviewImage(`/storage/${catalog.gambar_sampul}`)}
                    >
                      <FiEye className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FiBook className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {catalog.nama}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-1">
                  {catalog.deskripsi}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  Ditambahkan pada: {formatDate(catalog.created_at)}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex space-x-2">
                    <Link
                      href={route('catalogs.edit', catalog.id)}
                      className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/40"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(catalog)}
                      className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md hover:bg-red-100 dark:hover:bg-red-900/40"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {catalog.pdf_file_buku && (
                    <a
                      href={route('catalogs.download', catalog.id)}
                      className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm"
                    >
                      <FiDownload className="w-4 h-4" />
                      <span>Unduh PDF</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal - FIXED VERSION */}
      {showDeleteConfirm && catalogToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4 text-center">
            {/* Backdrop overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={() => setShowDeleteConfirm(null)}
            ></div>

            {/* Modal */}
            <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20 sm:mx-0 sm:h-10 sm:w-10">
                  <FiTrash2 className="h-6 w-6 text-red-600 dark:text-red-500" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                    Konfirmasi Hapus
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Apakah Anda yakin ingin menghapus buku "{catalogToDelete.nama}"?
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={() => confirmDelete(catalogToDelete.id)}
                >
                  Hapus
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 sm:mt-0 sm:w-auto"
                  onClick={() => setShowDeleteConfirm(null)}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="max-w-4xl max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              onClick={() => setPreviewImage(null)}
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}