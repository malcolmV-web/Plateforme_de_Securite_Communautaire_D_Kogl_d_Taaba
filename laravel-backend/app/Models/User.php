<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable;
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'role', 'ville'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function signalements()
    {
        return $this->hasMany(Signalement::class);
    }

    public function alertes()
    {
        return $this->hasMany(Alerte::class, 'admin_id');
    }

    public function messagesEnvoyes()
    {
        return $this->hasMany(Message::class, 'emetteur_id');
    }

    public function messagesRecus()
    {
        return $this->hasMany(Message::class, 'recepteur_id');
    }
}
