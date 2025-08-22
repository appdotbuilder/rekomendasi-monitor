<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Audit>
 */
class AuditFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $auditorTypes = ['SPI', 'BPK', 'KAP'];
        $auditorType = $this->faker->randomElement($auditorTypes);
        
        return [
            'report_name' => 'Laporan Pemeriksaan ' . $auditorType . ' ' . $this->faker->year(),
            'report_number' => $auditorType . '/' . $this->faker->unique()->numberBetween(1000, 9999) . '/' . $this->faker->year(),
            'audit_date' => $this->faker->dateTimeBetween('-2 years', 'now'),
            'auditor_type' => $auditorType,
            'description' => $this->faker->paragraph(3),
        ];
    }
}