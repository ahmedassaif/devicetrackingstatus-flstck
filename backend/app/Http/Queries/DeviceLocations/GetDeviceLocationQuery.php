<?php

namespace App\Http\Queries\DeviceLocations;

use App\Http\Resources\DeviceLocationResource;
use App\Models\DeviceLocation;
use App\Models\DataUnit;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class GetDeviceLocationQuery
{
    /**
     * Fetch a specific DeviceLocation by its ID.
     *
     * @param int $deviceLocationId
     * @return DeviceLocationResource
     * @throws ModelNotFoundException
     */
    public function getDeviceLocation(string $deviceLocationId): DeviceLocationResource
    {
        try {
            // Fetch the DeviceLocation record by ID and load the related DataUnit
            $deviceLocation = DeviceLocation::findOrFail($deviceLocationId);
            $dataUnit = DataUnit::findOrFail($deviceLocation->DataUnitId);
            
            // Prepare the DataUnit data manually
            $dataUnitData = [
                'NameUnit' => $dataUnit->NameUnit,
                'Plan' => $dataUnit->Plan,
            ];

            $deviceLocation->NameUnit = $dataUnitData['NameUnit'];
            $deviceLocation->Plan = $dataUnitData['Plan'];
            
            // Return as a resource
            return new DeviceLocationResource($deviceLocation);
        } catch (ModelNotFoundException $e) {

            // Handle case where the DeviceLocation is not found
            throw new ModelNotFoundException("DeviceLocation with ID {$deviceLocationId} is not found.");
        }
    }
}
