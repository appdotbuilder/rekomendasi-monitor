<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Audit
 *
 * @property int $id
 * @property string $report_name
 * @property string $report_number
 * @property \Illuminate\Support\Carbon $audit_date
 * @property string $auditor_type
 * @property string|null $report_file
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Finding> $findings
 * @property-read int|null $findings_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Audit newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Audit newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Audit query()
 * @method static \Illuminate\Database\Eloquent\Builder|Audit whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Audit whereReportName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Audit whereReportNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Audit whereAuditDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Audit whereAuditorType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Audit whereReportFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Audit whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Audit whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Audit whereUpdatedAt($value)
 * @method static \Database\Factories\AuditFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Audit extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'report_name',
        'report_number',
        'audit_date',
        'auditor_type',
        'report_file',
        'description',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'audit_date' => 'date',
    ];

    /**
     * Get the findings for the audit.
     */
    public function findings(): HasMany
    {
        return $this->hasMany(Finding::class);
    }
}