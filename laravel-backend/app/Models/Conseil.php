<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Conseil extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre', 'contenu', 'categorie', 'theme', 'date_publication'
    ];
}
