<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;
use OwenIt\Auditing\Auditable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class DeviceLocation extends Model implements AuditableContract
{
    use Auditable;
    use SoftDeletes;
    use HasUuids;

    protected $dates = ['deleted_at'];

    protected $table = 'DeviceLocation';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'NameDeviceLocation',
        'DataUnitId',
        'created_at',
        'updated_at'
    ];

    public function DataUnit()
    {
        return $this->belongsTo(DataUnit::class, 'DataUnitId');
    }
}