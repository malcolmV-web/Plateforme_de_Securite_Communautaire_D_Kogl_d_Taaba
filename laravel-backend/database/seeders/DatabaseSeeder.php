<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Alerte;
use App\Models\Signalement;
use App\Models\Message;
use App\Models\Conseil;
use App\Models\PointAccueil;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        //  Créer 3 admins avec 2 alertes chacun
        User::factory()
            ->count(3)
            ->state(['role' => 'admin'])
            ->has(Alerte::factory()->count(2), 'alertes')
            ->create();

        // 👨‍👩 Créer 5 citoyens avec 1 ou 2 signalements chacun
        User::factory()
            ->count(5)
            ->state(['role' => 'citoyen'])
            ->has(Signalement::factory()->count(rand(1, 2)), 'signalements')
            ->create();

        //  Créer 2 agents qui envoient des messages à des citoyens
        $agents = User::factory()
            ->count(2)
            ->state(['role' => 'agent'])
            ->create();

        //  Créer 10 messages entre agents et citoyens
        $citoyens = User::where('role', 'citoyen')->get();

        foreach ($agents as $agent) {
            foreach ($citoyens->random(2) as $citoyen) {
                Message::factory()->create([
                    'emetteur_id' => $agent->id,
                    'recepteur_id' => $citoyen->id,
                ]);

                Message::factory()->create([
                    'emetteur_id' => $citoyen->id,
                    'recepteur_id' => $agent->id,
                ]);
            }
        }

        //  Créer des conseils utiles
        Conseil::factory()->count(6)->create();

        //  Créer des points d’accueil (commissariat, gendarmerie, etc.)
        PointAccueil::factory()->count(5)->create();
    }
}
