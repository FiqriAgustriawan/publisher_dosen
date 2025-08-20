import React, { useRef, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { FiSend, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ReCaptcha, { ReCaptchaRef } from '@/components/ReCaptcha';
import { useAppearance } from '@/hooks/use-appearance';

interface CommentFormProps {
  publicationId: number;
}

export default function CommentForm({ publicationId }: CommentFormProps) {
  const { theme } = useAppearance();
  const { props } = usePage();
  const recaptchaRef = useRef<ReCaptchaRef>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const { data, setData, post, processing, errors, reset, recentlySuccessful, clearErrors } = useForm({
    nama: '',
    email: '',
    komentar: '',
    publication_id: publicationId,
    recaptcha_token: '',
  });

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    setData('recaptcha_token', token || '');
    
    // Clear reCAPTCHA error ketika user complete captcha
    if (token && errors.recaptcha_token) {
      clearErrors('recaptcha_token');
    }
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null);
    setData('recaptcha_token', '');
  };

  const handleRecaptchaError = () => {
    setRecaptchaToken(null);
    setData('recaptcha_token', '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi reCAPTCHA di frontend juga
    if (!recaptchaToken) {
      return;
    }

    post(route('comments.store'), {
      preserveScroll: true,
      onSuccess: () => {
        reset('nama', 'email', 'komentar', 'recaptcha_token');
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
      },
      onError: () => {
        // Reset reCAPTCHA on error
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        setData('recaptcha_token', '');
      }
    });
  };

  return (
    <div className={`${theme.card} rounded-xl p-6 shadow-md ${theme.border} border mb-8`}>
      <h3 className={`text-xl font-bold mb-4 ${theme.text.primary}`}>
        Tinggalkan Komentar
      </h3>

      {recentlySuccessful && (
        <Alert className="mb-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <FiCheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-800 dark:text-green-300">
            Terima kasih! Komentar Anda telah diterima dan akan ditampilkan setelah disetujui oleh admin.
          </AlertDescription>
        </Alert>
      )}

      {Object.keys(errors).length > 0 && !recentlySuccessful && (
        <Alert className="mb-4 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <FiAlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
          <AlertDescription className="text-red-800 dark:text-red-300">
            Terdapat kesalahan dalam form. Silakan periksa kembali.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nama" className={theme.text.primary}>
              Nama <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nama"
              type="text"
              value={data.nama}
              onChange={e => setData('nama', e.target.value)}
              placeholder="Masukkan nama Anda"
              className={`${theme.background} ${theme.text.primary} ${theme.border} ${errors.nama ? 'border-red-500' : ''}`}
              required
            />
            {errors.nama && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <FiAlertCircle className="w-3 h-3" />
                {errors.nama}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className={theme.text.primary}>
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              placeholder="Masukkan email Anda"
              className={`${theme.background} ${theme.text.primary} ${theme.border} ${errors.email ? 'border-red-500' : ''}`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <FiAlertCircle className="w-3 h-3" />
                {errors.email}
              </p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Email tidak akan dipublikasikan
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="komentar" className={theme.text.primary}>
            Komentar <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="komentar"
            value={data.komentar}
            onChange={e => setData('komentar', e.target.value)}
            placeholder="Tulis komentar Anda di sini..."
            rows={4}
            className={`${theme.background} ${theme.text.primary} ${theme.border} ${errors.komentar ? 'border-red-500' : ''} resize-none`}
            required
          />
          {errors.komentar && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <FiAlertCircle className="w-3 h-3" />
              {errors.komentar}
            </p>
          )}
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Minimal 5 karakter</span>
            <span>{data.komentar.length}/1000</span>
          </div>
        </div>

        {/* ReCAPTCHA */}
        <div className="space-y-2">
          <Label className={theme.text.primary}>
            Verifikasi <span className="text-red-500">*</span>
          </Label>
          <div className="flex justify-center">
            <ReCaptcha
              ref={recaptchaRef}
              siteKey={(props as any).recaptcha_site_key || ''}
              onChange={handleRecaptchaChange}
              onExpired={handleRecaptchaExpired}
              onError={handleRecaptchaError}
              theme={theme.background.includes('dark') ? 'dark' : 'light'}
            />
          </div>
          {errors.recaptcha_token && (
            <p className="text-red-500 text-sm text-center flex items-center justify-center gap-1">
              <FiAlertCircle className="w-3 h-3" />
              {errors.recaptcha_token}
            </p>
          )}
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Button
              type="submit"
              disabled={processing || !recaptchaToken}
              className="bg-green-700 hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Mengirim...
                </>
              ) : (
                <>
                  <FiSend className="w-4 h-4" />
                  Kirim Komentar
                </>
              )}
            </Button>
            
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <p>• Semua komentar akan dimoderasi terlebih dahulu</p>
              <p>• Komentar yang tidak sesuai akan ditolak</p>
              <p>• Harap gunakan bahasa yang sopan dan relevan</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}