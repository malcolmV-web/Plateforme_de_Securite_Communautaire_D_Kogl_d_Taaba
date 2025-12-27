<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Alerte extends Model
{
    use HasFactory;

    protected $fillable = [
        'ville', 'niveau', 'message', 'admin_id', 'date_publication'
    ];

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }
}
