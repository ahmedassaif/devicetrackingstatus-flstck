<?php
namespace App\Http\Requests\DataUnits;

/**
 * @OA\Schema(
 *     schema="CreateDataUnitRequest",
 *     type="object",
 *     description="Create DataUnit Request schema",
 *     @OA\Property(property="NameUnit", type="string", description="Lokasi Kerja"),
 *     @OA\Property(property="Plan", type="string", nullable=true, description="Kode Plan untuk Lokasi Kerja")
 * )
 */

class CreateDataUnitRequest{
    public $NameUnit;
    public $Plan;

    /**
     * CreateDataUnitRequest constructor.
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