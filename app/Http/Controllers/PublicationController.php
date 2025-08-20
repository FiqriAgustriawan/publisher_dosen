<?php

namespace App\Http\Controllers;

use App\Models\Publication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PublicationController extends Controller
{
  // Client-facing methods
  public function index()
  {
    return Inertia::render('publication/Publications', [
      'publications' => Publication::with('user')->latest()->get()
    ]);
  }

  public function show(Publication $publication)
  {
    // Load approved comments with proper ordering
    $approvedComments = $publication->comments()
      ->where('status', 'approved')
      ->orderBy('created_at', 'desc')
      ->get()
      ->map(function ($comment) {
        return [
          'id' => $comment->id,
          'nama' => $comment->nama,
          'komentar' => $comment->komentar,
          'created_at' => $comment->created_at->toISOString(),
          'status' => $comment->status,
          'formatted_date' => $comment->created_at->format('d M Y, H:i')
        ];
      });

    return Inertia::render('publication/PublicationDetail', [
      'publication' => [
        'id' => $publication->id,
        'title' => $publication->title,
        'image' => $publication->image,
        'link_route' => $publication->link_route,
        'description' => $publication->description,
        'created_at' => $publication->created_at->toISOString(),
        'user' => [
          'name' => $publication->user->name
        ]
      ],
      'approved_comments' => $approvedComments,
      'recaptcha_site_key' => config('services.recaptcha.site_key', '')
    ]);
  }

  // Admin-facing methods
  public function manage()
  {
    return Inertia::render('publication/ManagePublications', [
      'publications' => Publication::with('user')->latest()->get()
    ]);
  }

  public function create()
  {
    return Inertia::render('publication/CreatePublication');
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'title' => 'required|string|max:255',
      'image' => 'nullable|image|max:2048',
      'link_route' => 'nullable|string|max:255',
      'description' => 'required|string',
    ]);

    if ($request->hasFile('image')) {
      $path = $request->file('image')->store('publications', 'public');
      $validated['image'] = $path;
    }

    $validated['user_id'] = Auth::id();

    if (!$validated['user_id']) {
      return redirect()->back()
        ->withErrors(['auth' => 'User authentication required'])
        ->withInput();
    }

    Publication::create($validated);

    return redirect()->back()->with('success', 'Publikasi berhasil ditambahkan');
  }

  public function edit(Publication $publication)
  {
    return Inertia::render('publication/EditPublication', [
      'publication' => $publication
    ]);
  }

  public function update(Request $request, Publication $publication)
  {
    $validated = $request->validate([
      'title' => 'required|string|max:255',
      'image' => 'nullable|image|max:2048',
      'link_route' => 'nullable|string|max:255',
      'description' => 'required|string',
    ]);

    if ($request->hasFile('image')) {
      // Hapus gambar lama jika ada
      if ($publication->image && Storage::disk('public')->exists($publication->image)) {
        Storage::disk('public')->delete($publication->image);
      }
      $path = $request->file('image')->store('publications', 'public');
      $validated['image'] = $path;
    }

    $publication->update($validated);

    return redirect()->back()->with('success', 'Publikasi berhasil diperbarui');
  }

  public function destroy(Publication $publication)
  {
    // Hapus gambar terkait jika ada
    if ($publication->image && Storage::disk('public')->exists($publication->image)) {
      Storage::disk('public')->delete($publication->image);
    }

    $publication->delete();

    return redirect()->back()->with('success', 'Publikasi berhasil dihapus');
  }
}
