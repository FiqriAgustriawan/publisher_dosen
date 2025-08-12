<?php

namespace App\Http\Controllers;

use App\Models\Catalog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CatalogController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return Inertia::render('catalog/CatalogIndex', [
      'catalogs' => Catalog::with('user')->latest()->get()
    ]);
  }

  /**
   * Display the specified resource.
   */
  public function show(Catalog $catalog)
  {
    // Get related catalogs (simple implementation, can be improved)
    $relatedCatalogs = Catalog::where('id', '!=', $catalog->id)
      ->latest()
      ->take(4)
      ->get();

    return Inertia::render('catalog/CatalogDetail', [
      'catalog' => $catalog->load('user'),
      'relatedCatalogs' => $relatedCatalogs
    ]);
  }

  /**
   * Download the catalog PDF.
   */
  public function download(Catalog $catalog)
  {
    if (!$catalog->pdf_file_buku) {
      abort(404, 'File tidak ditemukan');
    }

    $path = storage_path('app/public/' . $catalog->pdf_file_buku);

    if (!file_exists($path)) {
      abort(404, 'File tidak ditemukan');
    }

    return response()->download($path, $catalog->nama . '.pdf');
  }

  public function create()
  {
    return Inertia::render('catalog/CreateCatalog');
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'nama' => 'required|string|max:255',
      'deskripsi' => 'required|string',
      'gambar_sampul' => 'nullable|image|max:2048',
      'pdf_file_buku' => 'nullable|file|mimes:pdf|max:10240',
    ]);

    if ($request->hasFile('gambar_sampul')) {
      $path = $request->file('gambar_sampul')->store('catalogs/covers', 'public');
      $validated['gambar_sampul'] = $path;
    }

    if ($request->hasFile('pdf_file_buku')) {
      $path = $request->file('pdf_file_buku')->store('catalogs/pdfs', 'public');
      $validated['pdf_file_buku'] = $path;
    }

    Catalog::create($validated);

    return redirect()->route('catalogs.index')->with('success', 'Katalog buku berhasil ditambahkan');
  }

  public function edit(Catalog $catalog)
  {
    return Inertia::render('catalog/EditCatalog', [
      'catalog' => $catalog
    ]);
  }

  public function update(Request $request, Catalog $catalog)
  {
    $validated = $request->validate([
      'nama' => 'required|string|max:255',
      'deskripsi' => 'required|string',
      'gambar_sampul' => 'nullable|image|max:2048',
      'pdf_file_buku' => 'nullable|file|mimes:pdf|max:10240',
    ]);

    if ($request->hasFile('gambar_sampul')) {
      // Delete old cover image if exists
      if ($catalog->gambar_sampul && Storage::disk('public')->exists($catalog->gambar_sampul)) {
        Storage::disk('public')->delete($catalog->gambar_sampul);
      }

      $path = $request->file('gambar_sampul')->store('catalogs/covers', 'public');
      $validated['gambar_sampul'] = $path;
    }

    if ($request->hasFile('pdf_file_buku')) {
      // Delete old PDF if exists
      if ($catalog->pdf_file_buku && Storage::disk('public')->exists($catalog->pdf_file_buku)) {
        Storage::disk('public')->delete($catalog->pdf_file_buku);
      }

      $path = $request->file('pdf_file_buku')->store('catalogs/pdfs', 'public');
      $validated['pdf_file_buku'] = $path;
    }

    $catalog->update($validated);

    return redirect()->route('catalogs.index')->with('success', 'Katalog buku berhasil diperbarui');
  }

  public function destroy(Catalog $catalog)
  {
    // Delete associated files
    if ($catalog->gambar_sampul && Storage::disk('public')->exists($catalog->gambar_sampul)) {
      Storage::disk('public')->delete($catalog->gambar_sampul);
    }

    if ($catalog->pdf_file_buku && Storage::disk('public')->exists($catalog->pdf_file_buku)) {
      Storage::disk('public')->delete($catalog->pdf_file_buku);
    }

    $catalog->delete();

    return redirect()->route('catalogs.index')->with('success', 'Katalog buku berhasil dihapus');
  }

  /**
   * Display catalogs management page.
   */
  public function manage()
  {
    $catalogs = Catalog::with('user')->latest()->get();
    
    return Inertia::render('catalog/ManageCatalogs', [
        'catalogs' => $catalogs
    ]);
  }
}
