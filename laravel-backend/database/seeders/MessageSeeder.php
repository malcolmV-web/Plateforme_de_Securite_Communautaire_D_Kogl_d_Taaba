<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Message;

class MessageSeeder extends Seeder
{
    public function run(): void
    {
        Message::insert([
            [
                'id' => '1749938318602',
                'auteur' => 'Citoyen',
                'citoyen_id' => 1,
                'contenu' => 'Bonjour',
                'created_at' => '2025-06-14T21:58:38'
            ],
            [
                'id' => '1750116056474',
                'auteur' => 'Citoyen',
                'citoyen_id' => 1,
                'contenu' => 'Bonjour',
                'created_at' => '2025-06-16T23:20:56'
            ],
            [
                'id' => '1750127951666',
                'auteur' => 'Agent',
                'citoyen_id' => 1,
                'contenu' => 'oui bonjour',
                'created_at' => '2025-06-17T02:39:11'
            ],
            [
                'id' => '1750128000239',
                'auteur' => 'Agent',
                'citoyen_id' => 1,
                'contenu' => 'Desole du retard. Que pouvons nous faire pour vous',
                'created_at' => '2025-06-17T02:40:00'
            ],
            [
                'id' => '1750134217034',
                'auteur' => 'Agent',
                'citoyen_id' => 1,
                'contenu' => "j'attend votre retour",
                'created_at' => '2025-06-17T04:23:37'
            ],
            [
                'id' => '1750134276681',
                'auteur' => 'Citoyen',
                'citoyen_id' => null,
                'contenu' => 'ok il y a un rassemblement de gens sur le grand boulevard Tansoba',
                'created_at' => '2025-06-17T04:24:36'
            ]
        ]);
    }
}
