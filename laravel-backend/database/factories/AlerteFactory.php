<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Alerte>
 */
class AlerteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
{
    return [
        'ville' => $this->faker->city,
        'niveau' => $this->faker->randomElement(['info', 'alerte', 'urgence']),
        'message' => $this->faker->sentence(10),
        'admin_id' => \App\Models\User::factory(),
        'date_publication' => $this->faker->dateTime,
    ];
}

}
