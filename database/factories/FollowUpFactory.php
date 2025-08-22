<?php

namespace Database\Factories;

use App\Models\Finding;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FollowUp>
 */
class FollowUpFactory extends Factory
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
            'finding_id' => Finding::factory(),
            'user_id' => User::factory(),
            'follow_up_date' => $this->faker->dateTimeBetween('-6 months', 'now'),
            'responsible_party' => $this->faker->company(),
            'action_description' => $this->faker->paragraph(2),
            'new_status' => $this->faker->randomElement($statuses),
            'notes' => $this->faker->sentence(),
        ];
    }
}