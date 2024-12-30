<?php

namespace App\Http\Dtos;

/**
 * @OA\Schema(
 *     schema="DeviceLocationDto",
 *     type="object",
 *     description="DeviceLocationDto schema",
 *     @OA\Property(property="id", type="string", format="uuid", description="Unique identifier"),
 *     @OA\Property(property="NameDeviceLocation", type="string", description="Lokasi Kerja"),
 *     @OA\Property(property="NameUnit", type="string", description="Lokasi Kerja"),
 *     @OA\Property(property="Plan", type="string", nullable=true, description="Kode Plan untuk Lokasi Kerja"),
 * )
 */
class DeviceLocationDto
{
    public $id;
    public $NameDeviceLocation;
    public $NameUnit;
    public $Plan;

    /**
     * DeviceLocationDto constructor.
     * @param string $NameDeviceLocation
     * @param string $NameUnit
     * @param string|null $Plan
     */
    public function __construct(string $id, string $NameDeviceLocation,string $NameUnit, ?string $Plan)
    {
        $this->id = $id;
        $this->NameDeviceLocation = $NameDeviceLocation;
        $this->NameUnit = $NameUnit;
        $this->Plan = $Plan;
    }
}
