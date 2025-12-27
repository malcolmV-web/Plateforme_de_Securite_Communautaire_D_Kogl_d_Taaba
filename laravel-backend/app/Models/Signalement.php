<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Signalement extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'type', 'titre', 'description', 'lieu', 'statut'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
