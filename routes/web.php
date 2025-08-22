<?php

use App\Http\Controllers\AuditController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FindingController;
use App\Http\Controllers\FollowUpController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Audits
    Route::resource('audits', AuditController::class);
    
    // Findings
    Route::get('/audits/{audit}/findings/create', [FindingController::class, 'create'])->name('findings.create');
    Route::post('/findings', [FindingController::class, 'store'])->name('findings.store');
    Route::get('/findings/{finding}', [FindingController::class, 'show'])->name('findings.show');
    
    // Follow-ups
    Route::get('/follow-ups', [FollowUpController::class, 'index'])->name('follow-ups.index');
    Route::get('/findings/{finding}/follow-ups/create', [FollowUpController::class, 'create'])->name('follow-ups.create');
    Route::post('/follow-ups', [FollowUpController::class, 'store'])->name('follow-ups.store');
    Route::get('/follow-ups/{followUp}', [FollowUpController::class, 'show'])->name('follow-ups.show');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';