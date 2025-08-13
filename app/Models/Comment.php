<?php
// filepath: d:\jurnal-fikri\jurnalnih\app\Models\Comment.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Mews\Purifier\Facades\Purifier; // Namespace yang benar

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'publication_id',
        'nama',
        'email',
        'komentar',
        'status',
        'ip_address'
    ];

    // Automatically sanitize content before saving
    public function setKomentarAttribute($value)
    {
        $this->attributes['komentar'] = Purifier::clean($value);
    }

    public function publication()
    {
        return $this->belongsTo(Publication::class);
    }
}
