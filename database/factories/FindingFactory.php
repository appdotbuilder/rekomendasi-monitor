<?php

namespace Database\Factories;

use App\Models\Audit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Finding>
 */
class FindingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statuses = ['Belum Ditindaklanjuti', 'Sedang Ditindaklanjuti', 'Selesai', 'Dibatalkan'];
        
        return [
            'audit_id' => Audit::factory(),
            'finding_code' => 'T-' . $this->faker->unique()->numberBetween(100, 999),
            'description' => $this->faker->paragraph(2),
            'recommendation' => $this->faker->paragraph(2),
            'status' => $this->faker->randomElement($statuses),
            'responsible_party' => $this->faker->company(),
            'target_completion' => $this->faker->dateTimeBetween('now', '+6 months'),
        ];
    }
}