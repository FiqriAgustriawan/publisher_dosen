<?php
// filepath: d:\jurnal-fikri\jurnalnih\app\Http\Controllers\CommentController.php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Publication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CommentController extends Controller
{
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
      'g-recaptcha-response' => 'required', // Tetap ada untuk konsistensi
    ]);

    // Untuk development tanpa reCAPTCHA
    if (app()->environment('production') && config('services.recaptcha.secret_key')) {
      // Tambahkan validasi reCAPTCHA di production
    }

    // Selalu set status komentar baru sebagai pending
    $comment = new Comment([
      'nama' => $validated['nama'],
      'email' => $validated['email'],
      'komentar' => $validated['komentar'],
      'publication_id' => $validated['publication_id'],
      'status' => 'pending', // Selalu pending, tidak ada auto-approve di development
      'ip_address' => $request->ip()
    ]);

    $comment->save();

    // Informasikan pengguna bahwa komentar mereka perlu moderasi
    return redirect()->back()->with('success', 'Komentar Anda telah diterima dan sedang menunggu moderasi oleh admin.');
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
