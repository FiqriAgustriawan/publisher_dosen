<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Catalog extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'deskripsi',
        'gambar_sampul',
        'pdf_file_buku',
        'user_id'
    ];

    /**
     * Get the user that created the catalog.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
