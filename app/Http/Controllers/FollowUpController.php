<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFollowUpRequest;
use App\Models\Finding;
use App\Models\FollowUp;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FollowUpController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = FollowUp::with(['finding.audit', 'user']);

        // Filter by status
        if ($request->filled('status')) {
            $query->where('new_status', $request->status);
        }

        // Filter by auditor type
        if ($request->filled('auditor_type')) {
            $query->whereHas('finding.audit', function ($q) use ($request) {
                $q->where('auditor_type', $request->auditor_type);
            });
        }

        // Search by responsible party or action description
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('responsible_party', 'like', "%{$search}%")
                  ->orWhere('action_description', 'like', "%{$search}%");
            });
        }

        $followUps = $query->latest('follow_up_date')
            ->paginate(15)
            ->withQueryString()
            ->through(function ($followUp) {
                return [
                    'id' => $followUp->id,
                    'follow_up_date' => $followUp->follow_up_date->format('d/m/Y'),
                    'responsible_party' => $followUp->responsible_party,
                    'action_description' => substr($followUp->action_description, 0, 100) . (strlen($followUp->action_description) > 100 ? '...' : ''),
                    'new_status' => $followUp->new_status,
                    'supporting_document' => $followUp->supporting_document,
                    'user_name' => $followUp->user->name,
                    'finding_code' => $followUp->finding->finding_code,
                    'audit_name' => $followUp->finding->audit->report_name,
                    'auditor_type' => $followUp->finding->audit->auditor_type,
                ];
            });

        return Inertia::render('follow-ups/index', [
            'followUps' => $followUps,
            'filters' => $request->only(['status', 'auditor_type', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Finding $finding)
    {
        $finding->load('audit');

        return Inertia::render('follow-ups/create', [
            'finding' => [
                'id' => $finding->id,
                'finding_code' => $finding->finding_code,
                'description' => $finding->description,
                'recommendation' => $finding->recommendation,
                'current_status' => $finding->status,
                'audit' => [
                    'report_name' => $finding->audit->report_name,
                    'report_number' => $finding->audit->report_number,
                ],
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFollowUpRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();

        // Handle file upload
        if ($request->hasFile('supporting_document')) {
            $data['supporting_document'] = $request->file('supporting_document')->store('follow-up-documents', 'public');
        }

        $followUp = FollowUp::create($data);

        // Update finding status
        $followUp->finding->update(['status' => $data['new_status']]);

        return redirect()->route('findings.show', $followUp->finding)
            ->with('success', 'Tindak lanjut berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(FollowUp $followUp)
    {
        $followUp->load(['finding.audit', 'user']);

        return Inertia::render('follow-ups/show', [
            'followUp' => [
                'id' => $followUp->id,
                'follow_up_date' => $followUp->follow_up_date->format('d/m/Y'),
                'responsible_party' => $followUp->responsible_party,
                'action_description' => $followUp->action_description,
                'new_status' => $followUp->new_status,
                'supporting_document' => $followUp->supporting_document,
                'notes' => $followUp->notes,
                'user_name' => $followUp->user->name,
                'created_at' => $followUp->created_at->format('d/m/Y H:i'),
                'finding' => [
                    'id' => $followUp->finding->id,
                    'finding_code' => $followUp->finding->finding_code,
                    'description' => $followUp->finding->description,
                    'audit' => [
                        'report_name' => $followUp->finding->audit->report_name,
                        'report_number' => $followUp->finding->audit->report_number,
                        'auditor_type' => $followUp->finding->audit->auditor_type,
                    ],
                ],
            ],
        ]);
    }
}