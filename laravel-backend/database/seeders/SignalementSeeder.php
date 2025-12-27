<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Signalement;

class SignalementSeeder extends Seeder
{
    public function run(): void
    {
        Signalement::insert([
            [
                'id' => 'dec3',
                'type' => 'vol',
                'titre' => 'On a vole mon sac sur la rue de Yatenga',
                'description' => 'khjkhjkhjghjfkj jnknkjhj  jhjh',
                'lieu' => 'Ouagadougou, yatenga',
                'user_id' => 1
            ],
            [
                'id' => '7df5',
                'type' => 'vol',
                'titre' => 'Vol de documents',
                'description' => "J'ai ete apprehende par deux jeunes en moto...",
                'lieu' => 'Kilwin',
                'user_id' => null
            ]
        ]);
    }
}
