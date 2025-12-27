<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Alerte;

class AlerteSeeder extends Seeder
{
    public function run(): void
    {
        Alerte::insert([
            [
                'id' => 1,
                'ville' => 'Ouagadougou',
                'niveau' => 'urgence',
                'message' => 'Fusillade signalée au marché central',
                'admin_id' => 101,
                'date_publication' => '2025-06-10 17:30:00',
            ],
            [
                'id' => 2,
                'ville' => 'Bobo-Dioulasso',
                'niveau' => 'alerte',
                'message' => 'Rassemblement suspect dans le secteur 9',
                'admin_id' => 102,
                'date_publication' => '2025-06-09 09:15:00',
            ],
            [
                'id' => 1750165806723,
                'ville' => 'Kaya',
                'niveau' => 'info',
                'message' => "Un couvrez-feu est instaure ce soir...",
                'admin_id' => 3,
                'date_publication' => '2025-06-17 13:10:06',
            ]
        ]);
    }
}
