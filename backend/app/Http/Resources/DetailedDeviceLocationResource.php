<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="DetailedDeviceLocation",
 *     type="object",
 *     description="DetailedDeviceLocation schema",
 *     @OA\Property(property="id", type="string", format="uuid", description="Unique identifier"),
 *     @OA\Property(property="NameDetailLocation", type="string", description="Detail Lokasi Perangkat"),
 *     @OA\Property(property="MainDetailLocation", type="string", description="Sub dari Detail Lokasi Perangkat"),
 *     @OA\Property(property="SubOfMainDetailLocation", type="string", description="Sub dari Sub Detail Lokasi Perangkat"),
 *     @OA\Property(property="DeviceLocationId", type="string", format="uuid", description="Id DeviceLocation"),
 *     @OA\Property(property="NameDeviceLocation", type="string", description="Lokasi Utama Perangkat"),
 *     @OA\Property(property="DataUnitId", type="string", format="uuid", description="Id Lokasi Kerja"),
 *     @OA\Property(property="NameUnit", type="string", description="Lokasi Kerja"),
 * )
 */
class DetailedDeviceLocationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'NameDetailLocation' => $this->NameDetailLocation,
            'MainDetailLocation' => $this->MainDetailLocation,
            'SubOfMainDetailLocation' => $this->SubOfMainDetailLocation,
            'DeviceLocationId' => $this->DeviceLocationId,
            'NameDeviceLocation' => $this->NameDeviceLocation,
            'DataUnitId' => $this->DataUnitId,
            'NameUnit' => $this->NameUnit
        ];
    }
}
