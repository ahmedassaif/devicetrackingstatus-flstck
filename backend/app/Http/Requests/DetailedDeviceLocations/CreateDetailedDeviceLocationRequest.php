<?php
namespace App\Http\Requests\DetailedDeviceLocations;

/**
 * @OA\Schema(
 *     schema="CreateDetailedDeviceLocationRequest",
 *     type="object",
 *     description="Create DetailedDeviceLocation Request schema",
 *     @OA\Property(property="DeviceLocationId", type="string", format="uuid", description="Id DeviceLocation"),
 *     @OA\Property(property="NameDetailLocation", type="string", description="Detail Lokasi Perangkat"),
 *     @OA\Property(property="MainDetailLocation", type="string", nullable=true, description="Sub dari Detail Lokasi Perangkat"),
 *     @OA\Property(property="SubOfMainDetailLocation", type="string", nullable=true, description="Sub dari Sub Detail Lokasi Perangkat")
 * )
 */

class CreateDetailedDeviceLocationRequest{
    
    public $NameDetailLocation;
    public $MainDetailLocation;
    public $SubOfMainDetailLocation;
    public $DeviceLocationId;

    /**
     * CreateDetailedDeviceLocationRequest constructor.
     *
     * @param string $NameDetailLocation
     * @param string $MainDetailLocation
     * @param string $SubOfMainDetailLocation
     * @param string $DeviceLocationId
     */
    public function __construct(
        string $NameDetailLocation,
        ?string $MainDetailLocation,
        ?string $SubOfMainDetailLocation,
        string $DeviceLocationId)
    {
        $this->NameDetailLocation = $NameDetailLocation;
        $this->MainDetailLocation = $MainDetailLocation;
        $this->SubOfMainDetailLocation = $SubOfMainDetailLocation;
        $this->DeviceLocationId = $DeviceLocationId;
    }

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'NameDetailLocation' => 'required|string|max:255',
            'MainDetailLocation' => 'nullable|string|max:255',
            'SubOfMainDetailLocation' => 'nullable|string|max:255',
            'DeviceLocationId' => 'required|string|max:255|exists:DeviceLocation,id',
        ];
    }

    public function messages()
    {
        return [
            'DeviceLocationId.exists' => 'The specified DeviceLocation does not exist.',
        ];
    }
}