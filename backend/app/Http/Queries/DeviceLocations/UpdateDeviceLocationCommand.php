<?php

namespace App\Http\Queries\DeviceLocations;

use App\Http\Requests\DeviceLocations\UpdateDeviceLocationRequest;
use App\Http\Resources\DeviceLocationResource;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\DeviceLocation;
use App\Models\DataUnit;

class UpdateDeviceLocationCommand
{
    /**
     * Handle the update of a DeviceLocation.
     *
     * @param UpdateDeviceLocationRequest $updateDeviceLocationRequest
     * @param string $id
     * @return DeviceLocationResource
     * @throws ValidationException
     * @throws ModelNotFoundException
     */
    public function handle(UpdateDeviceLocationRequest $updateDeviceLocationRequest): DeviceLocationResource
    {
        $validator = Validator::make((array) $updateDeviceLocationRequest, [
            'NameDeviceLocation' => 'required|string|max:255',
            'DataUnitId' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        // Check if a DeviceLocation with the same NameDeviceLocation and DataUnitId already exists (excluding the current record)
        $existingDeviceLocation = DeviceLocation::where('NameDeviceLocation', $updateDeviceLocationRequest->NameDeviceLocation)
            ->where('DataUnitId', $updateDeviceLocationRequest->DataUnitId)
            ->first();

        if ($existingDeviceLocation) {
            return response()->json(['error' => 'Ada Data yang Sama'], 400); 
        }

        // Lock the DeviceLocation for update
        $deviceLocation = DeviceLocation::where('id', $updateDeviceLocationRequest->id)->lockForUpdate()->firstOrFail();
        $deviceLocation->NameDeviceLocation = $updateDeviceLocationRequest->NameDeviceLocation;
        $deviceLocation->DataUnitId = $updateDeviceLocationRequest->DataUnitId;
        $deviceLocation->save();

        $dataUnit = DataUnit::findOrFail($deviceLocation->DataUnitId);
            
        // Prepare the DataUnit data manually
        $dataUnitData = [
            'NameUnit' => $dataUnit->NameUnit,
            'Plan' => $dataUnit->Plan,
        ];

        $deviceLocation->NameUnit = $dataUnitData['NameUnit'];
        $deviceLocation->Plan = $dataUnitData['Plan'];

        return new DeviceLocationResource($deviceLocation);
    }
}
