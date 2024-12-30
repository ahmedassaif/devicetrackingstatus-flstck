<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="DeviceLocation",
 *     type="object",
 *     description="DeviceLocation schema",
 *     @OA\Property(property="id", type="string", format="uuid", description="Unique identifier"),
 *     @OA\Property(property="NameDeviceLocation", type="string", description="Nama Lokasi Perangkat"),
 *     @OA\Property(property="DataUnitId", type="string", format="uuid", description="Id DataUnit"),
 *     @OA\Property(property="NameUnit", type="string", description="Lokasi Kerja"),
 *     @OA\Property(property="Plan", type="string", description="Kode Plan untuk Lokasi Kerja"),
 *     @OA\Property(property="created_at", type="string", format="date-time", description="Creation timestamp"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", description="Update timestamp"),
 *     @OA\Property(property="deleted_at", type="string", nullable=true, format="date-time", description="Deletion timestamp")
 * )
 */
class DeviceLocationResource extends JsonResource
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
            'NameDeviceLocation' => $this->NameDeviceLocation,
            'DataUnitId' => $this->DataUnitId,
            'NameUnit' => $this->NameUnit,
            'Plan' => $this->Plan,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}
