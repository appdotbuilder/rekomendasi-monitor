<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Audit;
use App\Models\Finding;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with audit findings summary.
     */
    public function index()
    {
        // Get findings summary by status
        $statusSummary = Finding::select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get()
            ->keyBy('status');

        // Get findings summary by auditor type
        $auditorSummary = Finding::join('audits', 'findings.audit_id', '=', 'audits.id')
            ->select('audits.auditor_type', 'findings.status', DB::raw('count(*) as count'))
            ->groupBy('audits.auditor_type', 'findings.status')
            ->get()
            ->groupBy('auditor_type');

        // Recent audits
        $recentAudits = Audit::with('findings')
            ->latest('audit_date')
            ->limit(5)
            ->get()
            ->map(function ($audit) {
                return [
                    'id' => $audit->id,
                    'report_name' => $audit->report_name,
                    'report_number' => $audit->report_number,
                    'audit_date' => $audit->audit_date->format('d/m/Y'),
                    'auditor_type' => $audit->auditor_type,
                    'findings_count' => $audit->findings->count(),
                ];
            });

        // Statistics for cards
        $totalAudits = Audit::count();
        $totalFindings = Finding::count();
        $pendingFindings = Finding::where('status', 'Belum Ditindaklanjuti')->count();
        $completedFindings = Finding::where('status', 'Selesai')->count();

        return Inertia::render('dashboard', [
            'statusSummary' => $statusSummary,
            'auditorSummary' => $auditorSummary,
            'recentAudits' => $recentAudits,
            'stats' => [
                'totalAudits' => $totalAudits,
                'totalFindings' => $totalFindings,
                'pendingFindings' => $pendingFindings,
                'completedFindings' => $completedFindings,
            ],
        ]);
    }
}