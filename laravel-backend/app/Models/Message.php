<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'contenu', 'auteur', 'citoyen_id', 'created_at'
    ];

    public function citoyen()
    {
        return $this->belongsTo(User::class, 'citoyen_id');
    }
}
