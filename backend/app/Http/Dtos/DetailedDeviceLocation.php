<?php

namespace App\Http\Dtos;

/**
 * @OA\Schema(
 *     schema="DetailedDeviceLocationDto",
 *     type="object",
 *     description="DetailedDeviceLocationDto schema",
 *     @OA\Property(property="id", type="string", format="uuid", description="Unique identifier"),
 *     @OA\Property(property="NameUnit", type="string", description="Lokasi Kerja"),
 *     @OA\Property(property="NameDeviceLocation", type="string", description="Detail Lokasi Perangkat"),
 *     @OA\Property(property="NameDetailLocation", type="string", description="Detail Lokasi Perangkat"),
 *     @OA\Property(property="MainDetailLocation", type="string", description="Sub dari Detail Lokasi Perangkat"),
 *     @OA\Property(property="SubOfMainDetailLocation", type="string", description="Sub dari Sub Detail Lokasi Perangkat")
 * )
 */
class DetailedDeviceLocation
{
    public $id;
    public $NameUnit;
    public $NameDeviceLocation;
    public $NameDetailLocation;
    public $MainDetailLocation;
    public $SubOfMainDetailLocation;

    public function __construct(string $id, string $NameUnit, string $NameDeviceLocation, string $NameDetailLocation, string $MainDetailLocation, string $SubOfMainDetailLocation)
    {
        $this->id = $id;
        $this->NameUnit = $NameUnit;
        $this->NameDeviceLocation = $NameDeviceLocation;
        $this->NameDetailLocation = $NameDetailLocation;
        $this->MainDetailLocation = $MainDetailLocation;
        $this->SubOfMainDetailLocation = $SubOfMainDetailLocation;
    }
}