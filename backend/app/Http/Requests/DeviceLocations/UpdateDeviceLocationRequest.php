<?php
namespace App\Http\Requests\DeviceLocations;

/**
 * @OA\Schema(
 *     schema="UpdateDeviceLocationRequest",
 *     type="object",
 *     description="Update DeviceLocation Request schema",
 *     @OA\Property(property="id", type="string", format="uuid", description="Unique identifier"),
 *     @OA\Property(property="NameDeviceLocation", type="string", description="Nama Lokasi Perangkat"),
 *     @OA\Property(property="DataUnitId", type="string", format="uuid", description="Id DataUnit")
 * )
 */

class UpdateDeviceLocationRequest{
    public $id;
    public $NameDeviceLocation;
    public $DataUnitId;

    /**
     * UpdateDeviceLocationRequest constructor.
     * @param string $id
     * @param string $NameDeviceLocation
     * @param string $DataUnitId
     */
    public function __construct(string $id, string $NameDeviceLocation, ?string $DataUnitId)
    {
        $this->id = $id;
        $this->NameDeviceLocation = $NameDeviceLocation;
        $this->DataUnitId = $DataUnitId;
    }
}