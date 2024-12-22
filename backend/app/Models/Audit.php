<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use Carbon\Carbon;

class Audit extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'table_name',
        'entity_name',
        'action_type',
        'action_name',
        'entity_id',
        'old_values',
        'new_values',
        'client_application_id',
        'from_ip_address',
    ];

    protected $dates = ['created_at', 'updated_at'];

    // Accessor for created_at
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->setTimezone(config('app.timezone'));
    }

    // Accessor for updated_at
    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->setTimezone(config('app.timezone'));
    }
}
