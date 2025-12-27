<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PointAccueil;

class PointAccueilSeeder extends Seeder
{
    public function run(): void
    {
        PointAccueil::insert([
            [
                'id' => 1,
                'type' => 'Gendarmerie',
                'nom' => 'Gendarmerie de Patte d’Oie',
                'ville' => 'Ouagadougou',
                'contact' => '20 30 45 78'
            ],
            [
                'id' => 2,
                'type' => 'Police',
                'nom' => 'Commissariat Central',
                'ville' => 'Bobo-Dioulasso',
                'contact' => '20 31 12 56'
            ],
            [
                'id' => 3,
                'type' => 'Pompiers',
                'nom' => 'Caserne Est',
                'ville' => 'Ouagadougou',
                'contact' => '18'
            ],
            [
                'id' => 1750165890333,
                'nom' => 'Yagma',
                'type' => 'Police',
                'ville' => 'Ouagadougou',
                'contact' => '18394754759'
            ]
        ]);
    }
}
