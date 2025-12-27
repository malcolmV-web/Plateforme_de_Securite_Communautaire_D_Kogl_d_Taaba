<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Conseil>
 */
class ConseilFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
{
    return [
        'titre' => $this->faker->sentence(4),
        'contenu' => $this->faker->paragraph,
        'categorie' => $this->faker->randomElement(['Numérique', 'Famille', 'Habitation']),
        'theme' => $this->faker->word,
        'date_publication' => $this->faker->dateTime,
    ];
}

}
