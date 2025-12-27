<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Conseil;

class ConseilSeeder extends Seeder
{
    public function run(): void
    {
        Conseil::insert([
            [
                'id' => 1,
                'titre' => 'Reconnaître une arnaque en ligne',
                'contenu' => 'Ne répondez jamais aux messages qui demandent vos infos personnelles...',
                'categorie' => 'Numérique',
                'theme' => 'arnaques',
                'date_publication' => '2025-06-11 10:00:00'
            ],
            [
                'id' => 2,
                'titre' => 'Prévenir un cambriolage',
                'contenu' => "Fermez toutes les issues et installez un éclairage extérieur à détection...",
                'categorie' => 'Habitation',
                'theme' => 'cambriolages',
                'date_publication' => '2025-06-10 09:00:00'
            ],
            [
                'id' => 3,
                'titre' => 'Numéros utiles pour les victimes',
                'contenu' => "Composez le 17 en cas d'urgence, 116000 pour une disparition...",
                'categorie' => 'Famille',
                'theme' => 'numéros utiles',
                'date_publication' => '2025-06-08 15:45:00'
            ]
        ]);
    }
}
