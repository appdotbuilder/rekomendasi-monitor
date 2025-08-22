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
        Schema::create('findings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('audit_id')->constrained()->onDelete('cascade');
            $table->string('finding_code')->comment('Unique code for the finding');
            $table->text('description')->comment('Description of the finding');
            $table->text('recommendation')->comment('Recommended action for the finding');
            $table->enum('status', ['Belum Ditindaklanjuti', 'Sedang Ditindaklanjuti', 'Selesai', 'Dibatalkan'])
                  ->default('Belum Ditindaklanjuti')
                  ->comment('Current status of the recommendation follow-up');
            $table->string('responsible_party')->nullable()->comment('Party responsible for follow-up');
            $table->date('target_completion')->nullable()->comment('Target date for completion');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('audit_id');
            $table->index('status');
            $table->index(['audit_id', 'status']);
            $table->unique(['audit_id', 'finding_code']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('findings');
    }
};