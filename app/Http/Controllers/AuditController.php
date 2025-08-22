<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAuditRequest;
use App\Models\Audit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuditController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Audit::with('findings');

        // Filter by auditor type
        if ($request->filled('auditor_type')) {
            $query->where('auditor_type', $request->auditor_type);
        }

        // Search by report name or number
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('report_name', 'like', "%{$search}%")
                  ->orWhere('report_number', 'like', "%{$search}%");
            });
        }

        $audits = $query->latest('audit_date')
            ->paginate(10)
            ->withQueryString()
            ->through(function ($audit) {
                return [
                    'id' => $audit->id,
                    'report_name' => $audit->report_name,
                    'report_number' => $audit->report_number,
                    'audit_date' => $audit->audit_date->format('d/m/Y'),
                    'auditor_type' => $audit->auditor_type,
                    'description' => $audit->description,
                    'findings_count' => $audit->findings->count(),
                    'pending_findings' => $audit->findings->where('status', 'Belum Ditindaklanjuti')->count(),
                    'completed_findings' => $audit->findings->where('status', 'Selesai')->count(),
                ];
            });

        return Inertia::render('audits/index', [
            'audits' => $audits,
            'filters' => $request->only(['auditor_type', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('audits/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAuditRequest $request)
    {
        $data = $request->validated();

        // Handle file upload
        if ($request->hasFile('report_file')) {
            $data['report_file'] = $request->file('report_file')->store('audit-reports', 'public');
        }

        $audit = Audit::create($data);

        return redirect()->route('audits.show', $audit)
            ->with('success', 'Audit berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Audit $audit)
    {
        $audit->load(['findings.followUps.user']);

        return Inertia::render('audits/show', [
            'audit' => [
                'id' => $audit->id,
                'report_name' => $audit->report_name,
                'report_number' => $audit->report_number,
                'audit_date' => $audit->audit_date->format('d/m/Y'),
                'auditor_type' => $audit->auditor_type,
                'description' => $audit->description,
                'report_file' => $audit->report_file,
                'findings' => $audit->findings->map(function ($finding) {
                    return [
                        'id' => $finding->id,
                        'finding_code' => $finding->finding_code,
                        'description' => $finding->description,
                        'recommendation' => $finding->recommendation,
                        'status' => $finding->status,
                        'responsible_party' => $finding->responsible_party,
                        'target_completion' => $finding->target_completion?->format('d/m/Y'),
                        'follow_ups_count' => $finding->followUps->count(),
                        'latest_follow_up' => $finding->followUps->first()?->follow_up_date?->format('d/m/Y'),
                    ];
                }),
            ],
        ]);
    }
}