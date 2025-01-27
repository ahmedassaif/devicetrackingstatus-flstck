<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;
use OwenIt\Auditing\Auditable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class DetailedDeviceLocation extends Model implements AuditableContract
{
    use Auditable;
    use SoftDeletes;
    use HasUuids;

    protected $dates = ['deleted_at'];

    protected $table = 'DetailedDeviceLocation';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'NameDetailLocation',
        'MainDetailLocation',
        'SubOfMainDetailLocation',
        'DeviceLocationId',
        'created_at',
        'updated_at'
    ];

    public function DeviceLocation()
    {
        return $this->belongsTo(DeviceLocation::class, 'DeviceLocationId');
    }
}