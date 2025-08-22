<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Finding
 *
 * @property int $id
 * @property int $audit_id
 * @property string $finding_code
 * @property string $description
 * @property string $recommendation
 * @property string $status
 * @property string|null $responsible_party
 * @property \Illuminate\Support\Carbon|null $target_completion
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Audit $audit
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\FollowUp> $followUps
 * @property-read int|null $follow_ups_count
 * @property-read \App\Models\FollowUp|null $latestFollowUp
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Finding newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Finding newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Finding query()
 * @method static \Illuminate\Database\Eloquent\Builder|Finding whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finding whereAuditId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finding whereFindingCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finding whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finding whereRecommendation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finding whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finding whereResponsibleParty($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finding whereTargetCompletion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finding whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finding whereUpdatedAt($value)
 * @method static \Database\Factories\FindingFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Finding extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'audit_id',
        'finding_code',
        'description',
        'recommendation',
        'status',
        'responsible_party',
        'target_completion',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'target_completion' => 'date',
    ];

    /**
     * Get the audit that owns the finding.
     */
    public function audit(): BelongsTo
    {
        return $this->belongsTo(Audit::class);
    }

    /**
     * Get the follow-ups for the finding.
     */
    public function followUps(): HasMany
    {
        return $this->hasMany(FollowUp::class);
    }

    /**
     * Get the latest follow-up for the finding.
     */
    public function latestFollowUp(): HasMany
    {
        return $this->hasMany(FollowUp::class)->latest();
    }
}