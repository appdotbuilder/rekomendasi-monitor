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
        Schema::create('audits', function (Blueprint $table) {
            $table->id();
            $table->string('report_name')->comment('Name of the audit report');
            $table->string('report_number')->unique()->comment('Unique audit report number');
            $table->date('audit_date')->comment('Date when audit was conducted');
            $table->enum('auditor_type', ['SPI', 'BPK', 'KAP'])->comment('Type of auditor');
            $table->string('report_file')->nullable()->comment('Path to uploaded report file');
            $table->text('description')->nullable()->comment('Audit description');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('auditor_type');
            $table->index('audit_date');
            $table->index(['auditor_type', 'audit_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audits');
    }
};