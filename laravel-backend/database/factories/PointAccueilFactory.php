<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PointAccueil>
 */
class PointAccueilFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
{
    return [
        'type' => $this->faker->randomElement(['Gendarmerie', 'Police', 'Pompiers']),
        'nom' => $this->faker->company . ' ' . $this->faker->city,
        'ville' => $this->faker->city,
        'contact' => $this->faker->phoneNumber,
    ];
}

}
