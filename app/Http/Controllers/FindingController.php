<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFindingRequest;
use App\Models\Audit;
use App\Models\Finding;
use Inertia\Inertia;

class FindingController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Audit $audit)
    {
        return Inertia::render('findings/create', [
            'audit' => [
                'id' => $audit->id,
                'report_name' => $audit->report_name,
                'report_number' => $audit->report_number,
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFindingRequest $request)
    {
        $finding = Finding::create($request->validated());

        return redirect()->route('audits.show', $finding->audit)
            ->with('success', 'Temuan berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Finding $finding)
    {
        $finding->load(['audit', 'followUps.user']);

        return Inertia::render('findings/show', [
            'finding' => [
                'id' => $finding->id,
                'finding_code' => $finding->finding_code,
                'description' => $finding->description,
                'recommendation' => $finding->recommendation,
                'status' => $finding->status,
                'responsible_party' => $finding->responsible_party,
                'target_completion' => $finding->target_completion?->format('d/m/Y'),
                'audit' => [
                    'id' => $finding->audit->id,
                    'report_name' => $finding->audit->report_name,
                    'report_number' => $finding->audit->report_number,
                    'auditor_type' => $finding->audit->auditor_type,
                ],
                'follow_ups' => $finding->followUps->map(function ($followUp) {
                    return [
                        'id' => $followUp->id,
                        'follow_up_date' => $followUp->follow_up_date->format('d/m/Y'),
                        'responsible_party' => $followUp->responsible_party,
                        'action_description' => $followUp->action_description,
                        'new_status' => $followUp->new_status,
                        'supporting_document' => $followUp->supporting_document,
                        'notes' => $followUp->notes,
                        'user_name' => $followUp->user->name,
                        'created_at' => $followUp->created_at->format('d/m/Y H:i'),
                    ];
                }),
            ],
        ]);
    }
}