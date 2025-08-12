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
    return Inertia::render('publication/PublicationDetail', [
      'publication' => $publication->load('user')
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
