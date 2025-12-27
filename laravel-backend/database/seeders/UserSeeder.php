<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::insert([
            [
                'id' => 1,
                'name' => 'Awa Ouédraogo',
                'email' => 'awa@example.com',
                'password' => Hash::make('awa123'),
                'ville' => 'Ouagadougou',
                'role' => 'citoyen',
            ],
            [
                'id' => 2,
                'name' => 'Agent B',
                'email' => 'agentb@example.com',
                'password' => Hash::make('agent456'),
                'ville' => 'Bobo-Dioulasso',
                'role' => 'agent',
            ],
            [
                'id' => 3,
                'name' => 'Admin C',
                'email' => 'admin@example.com',
                'password' => Hash::make('admin789'),
                'ville' => 'Ouagadougou',
                'role' => 'admin',
            ],
            [
                'id' => 8085,
                'name' => 'Sam Sami',
                'email' => 'sam@example.com',
                'password' => Hash::make('sam1234'),
                'ville' => 'Gaoua',
                'role' => 'citoyen',
            ]
        ]);
    }
}
