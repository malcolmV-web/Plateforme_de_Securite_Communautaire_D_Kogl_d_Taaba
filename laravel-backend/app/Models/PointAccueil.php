<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PointAccueil extends Model
{
    use HasFactory;

    protected $table = 'points_accueil';

    protected $fillable = [
        'nom', 'type', 'ville', 'contact', 'adresse'
    ];
}
