<?php
namespace App\Http\Requests\DeviceLocations;

/**
 * @OA\Schema(
 *     schema="CreateDeviceLocationRequest",
 *     type="object",
 *     description="Create DeviceLocation Request schema",
 *     @OA\Property(property="NameDeviceLocation", type="string", description="Nama Lokasi Perangkat"),
 *     @OA\Property(property="DataUnitId", type="string", format="uuid", description="Id DataUnit")
 * )
 */

class CreateDeviceLocationRequest{
    public $NameDeviceLocation;
    public $DataUnitId;

    /**
     * CreateDeviceLocationRequest constructor.
     *
     * @param string $NameDeviceLocation
     * @param string $DataUnitId
     */
    public function __construct(string $NameDeviceLocation, string $DataUnitId)
    {
        $this->NameDeviceLocation = $NameDeviceLocation;
        $this->DataUnitId = $DataUnitId;
    }

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'NameDeviceLocation' => 'required|string|max:255',
            'DataUnitId' => 'required|string|max:255|exists:data_units,id',
        ];
    }

    public function messages()
    {
        return [
            'DataUnitId.exists' => 'The specified DataUnit does not exist.',
        ];
    }
}