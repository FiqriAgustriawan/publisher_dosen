import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card } from '@/components/ui/card';
import { type BreadcrumbItem } from '@/types';
// Menggunakan Lucide icons untuk konsistensi dengan sidebar
import { BookOpen, Upload, FileText, X } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Kelola Katalog Buku',
    href: '/manage-catalogs',
  },
  {
    title: 'Tambah Buku',
    href: '/catalogs/create',
  },
];

export default function CreateCatalog() {
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);

  const { data, setData, post, processing, errors, reset } = useForm({
    nama: '',
    deskripsi: '',
    gambar_sampul: null as File | null,
    pdf_file_buku: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('catalogs.store'), {
      onSuccess: () => {
        reset();
        setCoverPreview(null);
        setPdfFileName(null);
      },
    });
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData('gambar_sampul', file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData('pdf_file_buku', file);
      setPdfFileName(file.name);
    }
  };

  const removeCover = () => {
    setData('gambar_sampul', null);
    setCoverPreview(null);
  };

  const removePdf = () => {
    setData('pdf_file_buku', null);
    setPdfFileName(null);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tambah Katalog Buku" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Tambah Katalog Buku</h1>
        </div>

        <Card className="flex-1 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Text Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nama Buku</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={data.nama}
                    onChange={e => setData('nama', e.target.value)}
                    placeholder="Masukkan judul buku"
                  />
                  {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Deskripsi</label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={data.deskripsi}
                    onChange={e => setData('deskripsi', e.target.value)}
                    placeholder="Masukkan deskripsi buku"
                    rows={8}
                  />
                  {errors.deskripsi && <p className="text-red-500 text-sm mt-1">{errors.deskripsi}</p>}
                </div>
              </div>

              {/* Right Column - File Uploads */}
              <div className="space-y-6">
                {/* Cover Image Upload */}
                <div>
                  <label className="block text-sm font-medium mb-1">Gambar Sampul</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md h-64">
                    {coverPreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={coverPreview}
                          alt="Cover preview"
                          className="h-full w-auto mx-auto object-contain"
                        />
                        <button
                          type="button"
                          onClick={removeCover}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1 text-center flex flex-col items-center justify-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="cover-upload"
                            className="relative cursor-pointer  rounded-md font-medium text-green-600 hover:text-green-500"
                          >
                            <span>Upload gambar sampul</span>
                            <input
                              id="cover-upload"
                              type="file"
                              className="sr-only"
                              onChange={handleCoverChange}
                              accept="image/*"
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                      </div>
                    )}
                  </div>
                  {errors.gambar_sampul && <p className="text-red-500 text-sm mt-1">{errors.gambar_sampul}</p>}
                </div>

                {/* PDF File Upload */}
                <div>
                  <label className="block text-sm font-medium mb-1">File PDF Buku</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                    {pdfFileName ? (
                      <div className="w-full">
                        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                          <div className="flex items-center">
                            <FileText className="h-6 w-6 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-700 truncate" title={pdfFileName}>
                              {pdfFileName}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={removePdf}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1 text-center flex flex-col items-center justify-center py-3">
                        <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="pdf-upload"
                            className="relative cursor-pointer  rounded-md font-medium text-green-600 hover:text-green-500"
                          >
                            <span>Upload file PDF</span>
                            <input
                              id="pdf-upload"
                              type="file"
                              className="sr-only"
                              onChange={handlePdfChange}
                              accept=".pdf"
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">PDF file up to 10MB</p>
                      </div>
                    )}
                  </div>
                  {errors.pdf_file_buku && <p className="text-red-500 text-sm mt-1">{errors.pdf_file_buku}</p>}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <a
                href={route('manage.catalogs')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700  bg-gray-50"
              >
                Batal
              </a>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                disabled={processing}
              >
                Simpan
              </button>
            </div>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
}