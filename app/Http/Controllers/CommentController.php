<?php
// filepath: d:\jurnal-fikri\jurnalnih\app\Http\Controllers\CommentController.php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Publication;
use App\Services\RecaptchaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CommentController extends Controller
{
    private RecaptchaService $recaptchaService;

    public function __construct(RecaptchaService $recaptchaService)
    {
        $this->recaptchaService = $recaptchaService;
    }

    /**
     * Store a newly created comment in storage.
     */
    public function store(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'nama' => 'required|string|max:100|min:3',
            'email' => 'required|email|max:100',
            'komentar' => 'required|string|min:5|max:1000',
            'publication_id' => 'required|exists:publications,id',
        ], [
            'nama.required' => 'Nama wajib diisi.',
            'nama.min' => 'Nama minimal 3 karakter.',
            'nama.max' => 'Nama maksimal 100 karakter.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'komentar.required' => 'Komentar wajib diisi.',
            'komentar.min' => 'Komentar minimal 5 karakter.',
            'komentar.max' => 'Komentar maksimal 1000 karakter.',
        ]);

        // Verifikasi reCAPTCHA untuk production
        if (app()->environment('production') || config('services.recaptcha.secret_key')) {
            $isValidCaptcha = $this->recaptchaService->verify(
                $validated['recaptcha_token'],
                $request->ip()
            );

            if (!$isValidCaptcha) {
                return back()->withErrors([
                    'recaptcha_token' => 'Verifikasi reCAPTCHA gagal. Silakan coba lagi.'
                ])->withInput();
            }
        }

        try {
            // Buat komentar baru
            $comment = Comment::create([
                'nama' => $validated['nama'],
                'email' => $validated['email'],
                'komentar' => $validated['komentar'],
                'publication_id' => $validated['publication_id'],
                'status' => 'pending', // Selalu pending untuk moderasi
                'ip_address' => $request->ip()
            ]);

            Log::info('New comment created', [
                'comment_id' => $comment->id,
                'publication_id' => $comment->publication_id,
                'ip' => $request->ip()
            ]);

            return back()->with('success', 'Komentar Anda telah diterima dan sedang menunggu moderasi oleh admin.');

        } catch (\Exception $e) {
            Log::error('Failed to create comment', [
                'error' => $e->getMessage(),
                'ip' => $request->ip()
            ]);

            return back()->withErrors([
                'komentar' => 'Terjadi kesalahan saat menyimpan komentar. Silakan coba lagi.'
            ])->withInput();
        }
    }

    /**
     * Show comments admin panel.
     */
    public function adminIndex(Request $request)
    {
        $filter = $request->query('filter', 'all');

        $query = Comment::with('publication')->latest();

        // Apply filter
        if ($filter !== 'all') {
            $query->where('status', $filter);
        }

        $comments = $query->paginate(15);

        // Get counts for badges
        $pendingCount = Comment::where('status', 'pending')->count();
        $approvedCount = Comment::where('status', 'approved')->count();
        $rejectedCount = Comment::where('status', 'rejected')->count();

        return Inertia::render('admin/Comments/Index', [
            'comments' => $comments,
            'filter' => $filter,
            'counts' => [
                'pending' => $pendingCount,
                'approved' => $approvedCount,
                'rejected' => $rejectedCount,
                'total' => $pendingCount + $approvedCount + $rejectedCount,
            ],
        ]);
    }

    /**
     * Approve a comment.
     */
    public function approve(Comment $comment)
    {
        $comment->update(['status' => 'approved']);

        return redirect()->back()->with('success', 'Komentar berhasil diapprove.');
    }

    /**
     * Reject a comment.
     */
    public function reject(Comment $comment)
    {
        $comment->update(['status' => 'rejected']);

        return redirect()->back()->with('success', 'Komentar ditolak.');
    }

    /**
     * Delete a comment.
     */
    public function destroy(Comment $comment)
    {
        $comment->delete();

        return redirect()->back()->with('success', 'Komentar berhasil dihapus.');
    }
}
