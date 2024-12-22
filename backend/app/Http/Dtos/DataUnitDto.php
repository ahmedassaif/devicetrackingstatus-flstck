<?php

namespace App\Http\Dtos;

/**
 * @OA\Schema(
 *     schema="DataUnitDto",
 *     type="object",
 *     description="DataUnitDto schema",
 *     @OA\Property(property="NameUnit", type="string", description="Lokasi Kerja"),
 *     @OA\Property(property="Plan", type="string", nullable=true, description="Kode Plan untuk Lokasi Kerja")
 * )
 */
class DataUnitDto
{
    public $NameUnit;
    public $Plan;

    /**
     * DataUnitDto constructor.
     *
     * @param string $NameUnit
     * @param string|null $Plan
     */
    public function __construct(string $NameUnit, ?string $Plan)
    {
        $this->NameUnit = $NameUnit;
        $this->Plan = $Plan;
    }
}
