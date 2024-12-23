<?php
namespace App\Http\Requests\DataUnits;

/**
 * @OA\Schema(
 *     schema="UpdateDataUnitRequest",
 *     type="object",
 *     description="Update DataUnit Request schema",
 *     @OA\Property(property="id", type="string", format="uuid", description="Unique identifier"),
 *     @OA\Property(property="NameUnit", type="string", description="Lokasi Kerja"),
 *     @OA\Property(property="Plan", type="string", nullable=true, description="Kode Plan untuk Lokasi Kerja")
 * )
 */

class UpdateDataUnitRequest{
    public $id;
    public $NameUnit;
    public $Plan;

    /**
     * UpdateDataUnitRequest constructor.
     * @param string $id
     * @param string $NameUnit
     * @param string|null $Plan
     */
    public function __construct(string $id, string $NameUnit, ?string $Plan)
    {
        $this->id = $id;
        $this->NameUnit = $NameUnit;
        $this->Plan = $Plan;
    }
}