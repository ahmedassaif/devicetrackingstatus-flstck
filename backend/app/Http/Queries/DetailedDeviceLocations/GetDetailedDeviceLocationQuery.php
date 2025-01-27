<?php

namespace App\Http\Queries\DetailedDeviceLocations;

use App\Http\Resources\DetailedDeviceLocationResource;
use App\Models\DetailedDeviceLocation;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class GetDetailedDeviceLocationQuery
{
    /**
     * Fetch a specific DetailedDeviceLocation by its ID.
     *
     * @param string $detailedDeviceLocationId
     * @return DetailedDeviceLocationResource
     * @throws ModelNotFoundException
     */
    public function getDetailedDeviceLocation(string $detailedDeviceLocationId): DetailedDeviceLocationResource
    {
        try {
            
            // Fetch the DetailedDeviceLocation record by ID with joins
            $detailedDeviceLocation = DetailedDeviceLocation::query()
                ->join('DeviceLocation', 'DetailedDeviceLocation.DeviceLocationId', '=', 'DeviceLocation.id')
                ->leftJoin('DataUnit', 'DeviceLocation.DataUnitId', '=', 'DataUnit.id')
                ->select(
                    'DetailedDeviceLocation.id',
                    'DetailedDeviceLocation.NameDetailLocation',
                    'DetailedDeviceLocation.MainDetailLocation',
                    'DetailedDeviceLocation.SubOfMainDetailLocation',
                    'DetailedDeviceLocation.DeviceLocationId',
                    'DeviceLocation.NameDeviceLocation',
                    'DeviceLocation.DataUnitId',
                    'DataUnit.NameUnit'
                )
                ->where('DetailedDeviceLocation.id', $detailedDeviceLocationId)
                ->firstOrFail();

            // Return as a resource
            return new DetailedDeviceLocationResource($detailedDeviceLocation);

        } catch (ModelNotFoundException $e) {
            
            // Handle case where the DetailedDeviceLocation is not found
            throw new ModelNotFoundException("DetailedDeviceLocation with ID {$detailedDeviceLocationId} is not found." || $e);
        }
    }
}