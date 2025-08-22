<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('follow_ups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('finding_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('follow_up_date')->comment('Date of the follow-up action');
            $table->string('responsible_party')->comment('Party responsible for this follow-up');
            $table->text('action_description')->comment('Description of the action taken');
            $table->enum('new_status', ['Belum Ditindaklanjuti', 'Sedang Ditindaklanjuti', 'Selesai', 'Dibatalkan'])
                  ->comment('New status after this follow-up');
            $table->string('supporting_document')->nullable()->comment('Path to supporting document');
            $table->text('notes')->nullable()->comment('Additional notes for the follow-up');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('finding_id');
            $table->index('user_id');
            $table->index('follow_up_date');
            $table->index(['finding_id', 'follow_up_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('follow_ups');
    }
};