<?php

namespace App\Http\Dtos;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="DataUnitDto",
 *     type="object",
 *     description="DataUnitDto schema",
 *     @OA\Property(property="NameUnit", type="string", description="Lokasi Kerja"),
 *     @OA\Property(property="Plan", type="string", description="Kode Plan untuk Lokasi Kerja")
 * )
 */
class DataUnitDto extends JsonResource
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
            'NameUnit' => $this->NameUnit,
            'Plan' => $this->Plan
        ];
    }
}
