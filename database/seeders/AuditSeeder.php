<?php

namespace Database\Seeders;

use App\Models\Audit;
use App\Models\Finding;
use App\Models\FollowUp;
use App\Models\User;
use Illuminate\Database\Seeder;

class AuditSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a test user if none exists
        $user = User::first() ?? User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);

        // Create 15 audits with findings
        Audit::factory(15)->create()->each(function (Audit $audit) use ($user) {
            // Each audit has 3-8 findings
            $findings = Finding::factory(random_int(3, 8))->create(['audit_id' => $audit->id]);
            
            // Some findings have follow-ups
            $findings->each(function (Finding $finding) use ($user) {
                if (random_int(1, 100) <= 70) { // 70% chance of having follow-ups
                    $followUpCount = random_int(1, 3);
                    FollowUp::factory($followUpCount)->create([
                        'finding_id' => $finding->id,
                        'user_id' => $user->id,
                    ]);
                    
                    // Update finding status based on latest follow-up
                    $latestFollowUp = $finding->followUps()->latest()->first();
                    if ($latestFollowUp && $latestFollowUp instanceof FollowUp) {
                        $finding->update(['status' => $latestFollowUp->new_status]);
                    }
                }
            });
        });
    }
}