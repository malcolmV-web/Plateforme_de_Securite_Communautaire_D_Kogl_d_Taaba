<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
// 'emetteur_id' => \App\Models\User::factory(),
// 'recepteur_id' => \App\Models\User::factory(),

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $citoyen = \App\Models\User::factory()->create(['role' => 'citoyen']);
        return [
            'auteur' => $this->faker->randomElement(['Citoyen', 'Agent']),
            'citoyen_id' => $citoyen->id,
            'contenu' => $this->faker->sentence,
            'created_at' => $this->faker->dateTime,
        ];
}

}
