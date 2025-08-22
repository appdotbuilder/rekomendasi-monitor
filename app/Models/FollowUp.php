<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\FollowUp
 *
 * @property int $id
 * @property int $finding_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon $follow_up_date
 * @property string $responsible_party
 * @property string $action_description
 * @property string $new_status
 * @property string|null $supporting_document
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Finding $finding
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|FollowUp newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FollowUp newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FollowUp query()
 * @method static \Illuminate\Database\Eloquent\Builder|FollowUp whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FollowUp whereFindingId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FollowUp whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FollowUp whereFollowUpDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FollowUp whereResponsibleParty($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FollowUp whereActionDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FollowUp whereNewStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FollowUp whereSupportingDocument($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FollowUp whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FollowUp whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FollowUp whereUpdatedAt($value)
 * @method static \Database\Factories\FollowUpFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class FollowUp extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'finding_id',
        'user_id',
        'follow_up_date',
        'responsible_party',
        'action_description',
        'new_status',
        'supporting_document',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'follow_up_date' => 'date',
    ];

    /**
     * Get the finding that owns the follow-up.
     */
    public function finding(): BelongsTo
    {
        return $this->belongsTo(Finding::class);
    }

    /**
     * Get the user who created the follow-up.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}