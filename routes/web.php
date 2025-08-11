<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PublicationController;
use App\Models\Publication;
use App\Models\User;
use App\Models\Catalog;
use App\Models\Comment;

Route::get('/', function () {
    return Inertia::render('Beranda', [
        'publications' => Publication::with('user')->latest()->take(6)->get()
    ]);
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'publications' => Publication::with('user')->latest()->get(),
            'stats' => [
                'totalPublications' => Publication::count(),
                'totalCatalogs' => Catalog::count(),
                'totalComments' => Comment::count()
            ]
        ]);
    })->name('dashboard');

    Route::resource('publications', PublicationController::class)
        ->except(['show']);
});

Route::get('/Contact', function () {
    return Inertia::render('Contact');
})->name('contact');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
