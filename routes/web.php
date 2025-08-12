<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\CatalogController;
use App\Models\Publication;
use App\Models\Catalog;
use App\Models\Comment;

// Public Routes
Route::get('/', function () {
    return Inertia::render('Beranda', [
        'publications' => Publication::with('user')->latest()->take(6)->get(),
        'catalogs' => Catalog::with('user')->latest()->take(4)->get() // Tambahkan data katalog
    ]);
})->name('home');

// Publications routes for public access
Route::get('/publications', [PublicationController::class, 'index'])->name('publications');
Route::get('/publications/{publication}', [PublicationController::class, 'show'])->name('publications.show');

// Contact page
Route::get('/Contact', function () {
    return Inertia::render('Contact');
})->name('contact');

// Public catalog routes
Route::get('/catalogs', [CatalogController::class, 'index'])->name('catalogs.index');
Route::get('/catalogs/{catalog}', [CatalogController::class, 'show'])->name('catalogs.show');
Route::get('/catalogs/{catalog}/download', [CatalogController::class, 'download'])->name('catalogs.download');

// Authentication protected routes
Route::middleware(['auth'])->group(function () {
    // Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard/Dashboard', [
            'publications' => Publication::with('user')->latest()->take(5)->get(),
            'stats' => [
                'totalPublications' => Publication::count(),
                'totalCatalogs' => Catalog::count(),
                'totalComments' => Comment::count()
            ]
        ]);
    })->name('dashboard');

    // Publications Management
    Route::get('/manage-publications', [PublicationController::class, 'manage'])->name('manage.publications');
    Route::resource('publications', PublicationController::class)->except(['show', 'index']);

    // Catalogs Management
    Route::get('/manage-catalogs', [CatalogController::class, 'manage'])->name('manage.catalogs');
    Route::resource('catalogs', CatalogController::class);
    Route::get('catalogs/{catalog}/download', [CatalogController::class, 'download'])->name('catalogs.download');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
