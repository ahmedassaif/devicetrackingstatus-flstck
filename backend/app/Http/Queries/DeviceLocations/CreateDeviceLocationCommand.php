<?php

namespace App\Http\Queries\DeviceLocations;

use App\Http\Requests\DeviceLocations\CreateDeviceLocationRequest;
use App\Http\Resources\DeviceLocationResource;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\DeviceLocation;
use App\Models\DataUnit;
use Illuminate\Support\Facades\Log;
use Exception;

class CreateDeviceLocationCommand
{
    /**
     * Handle the Create of a DeviceLocation.
     *
     * @param CreateDeviceLocationRequest $CreateDeviceLocationRequest
     * @param string $id
     * @return DeviceLocationResource
     * @throws ValidationException
     * @throws ModelNotFoundException
     */
    public function handle(CreateDeviceLocationRequest $createDeviceLocationRequest): DeviceLocationResource
    {
        $validator = Validator::make((array) $createDeviceLocationRequest, [
            'NameDeviceLocation' => 'required|string|max:255',
            'DataUnitId' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        // Check if a DeviceLocation with the same NameDeviceLocation and DataUnitId already exists
        $existingDeviceLocation = DeviceLocation::where('NameDeviceLocation', $createDeviceLocationRequest->NameDeviceLocation)
            ->where('DataUnitId', $createDeviceLocationRequest->DataUnitId)
            ->first();

        if ($existingDeviceLocation) {
            //throw new Exception('Ada Data yang Sama');
            //return response()->json(['error' => 'Ada Data yang Sama'], 400); 
            //throw new ValidationException('Data Already Exist');
            return response()->json(['error' => 'Data Already Exist'], 400);
        }

        // Convert the request object to an array
        $deviceLocationData = [
            'NameDeviceLocation' => $createDeviceLocationRequest->NameDeviceLocation,
            'DataUnitId' => $createDeviceLocationRequest->DataUnitId,
        ];

        // Create the DeviceLocation using the array
        $deviceLocation = DeviceLocation::create($deviceLocationData);
        $dataUnit = DataUnit::findOrFail($deviceLocation->DataUnitId);
        
        // Prepare the DataUnit data manually
        $dataUnitData = [
            'NameUnit' => $dataUnit->NameUnit,
            'Plan' => $dataUnit->Plan,
        ];
        
        $deviceLocation->NameUnit = $dataUnitData['NameUnit'];
        $deviceLocation->Plan = $dataUnitData['Plan'];

        // Return the DeviceLocationResource with manual DataUnit data
        return new DeviceLocationResource($deviceLocation);
    }
}
