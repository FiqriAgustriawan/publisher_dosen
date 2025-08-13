<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\CommentController;
use App\Models\Publication;
use App\Models\Catalog;
use App\Models\Comment;

// Public Routes
Route::get('/', function () {
    return Inertia::render('Beranda', [
        'publications' => Publication::with('user')->latest()->take(6)->get(),
        'catalogs' => Catalog::with('user')->latest()->take(4)->get()
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
                'totalComments' => Comment::count(),
                'pendingComments' => Comment::where('status', 'pending')->count() // Tambahkan ini
            ]
        ]);
    })->name('dashboard');

    // Publications Management
    Route::get('/manage-publications', [PublicationController::class, 'manage'])->name('manage.publications');
    Route::resource('publications', PublicationController::class)->except(['show', 'index']);

    // Halaman manajemen katalog
    Route::get('/manage-catalogs', [CatalogController::class, 'manage'])->name('manage.catalogs');

    // PENTING: Gunakan prefix 'admin' untuk rute katalog admin
    Route::prefix('admin')->group(function () {
        Route::get('/catalogs/create', [CatalogController::class, 'create'])->name('catalogs.create');
        Route::post('/catalogs', [CatalogController::class, 'store'])->name('catalogs.store');
        Route::get('/catalogs/{catalog}/edit', [CatalogController::class, 'edit'])->name('catalogs.edit');
        Route::put('/catalogs/{catalog}', [CatalogController::class, 'update'])->name('catalogs.update');
        Route::delete('/catalogs/{catalog}', [CatalogController::class, 'destroy'])->name('catalogs.destroy');

        // Comments management routes
        Route::get('/comments', [CommentController::class, 'adminIndex'])->name('admin.comments.index');
        Route::put('/comments/{comment}/approve', [CommentController::class, 'approve'])->name('admin.comments.approve');
        Route::put('/comments/{comment}/reject', [CommentController::class, 'reject'])->name('admin.comments.reject');
        Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('admin.comments.destroy');
    });
});

// Error handling
Route::fallback(function () {
    return Inertia::render('errors/Error', [
        'status' => 404,
        'message' => 'Halaman Tidak Ditemukan',
        'description' => 'Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.'
    ]);
});

// Public comment route
Route::post('/comments', [CommentController::class, 'store'])
    ->name('comments.store');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
