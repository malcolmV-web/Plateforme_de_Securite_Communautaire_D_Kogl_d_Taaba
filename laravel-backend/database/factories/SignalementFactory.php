<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Signalement>
 */
class SignalementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
{
    return [
        'type' => $this->faker->randomElement(['vol', 'agression', 'disparition']),
        'titre' => $this->faker->sentence,
        'description' => $this->faker->paragraph,
        'lieu' => $this->faker->address,
        'user_id' => \App\Models\User::factory(), // Relation automatique
    ];
}
}
