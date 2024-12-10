<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

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

    protected $dates = ['created_at'];
}
