<?php

namespace App\Http\Queries\DeviceLocations;

use App\Models\DeviceLocation;
use App\Http\Dtos\DeviceLocationDto;

class GetLookupAllDeviceLocationsQuery
{
    public function getLookup(): array
    {
        $deviceLocations = DeviceLocation::query()
                            ->whereNull('DeviceLocation.deleted_at') // Ensure only non-deleted records are retrieved
                            ->orderByDesc('DeviceLocation.updated_at') // Order by Created in descending order
                            ; 

        $deviceLocations = $deviceLocations
                            ->join('DataUnit', 'DeviceLocation.DataUnitId', '=', 'DataUnit.id')
                            ->select(
                                'DeviceLocation.id',
                                'DeviceLocation.NameDeviceLocation',
                                'DataUnit.NameUnit',
                                'DataUnit.Plan'
                                )                
                            ->orderBy('DataUnit.NameUnit') // Order by NameUnit to group data in Excel
                            ->orderBy('NameDeviceLocation') // Then by NameDeviceLocation
                            ->get();

        return array_map(fn($deviceLocationDto) => new DeviceLocationDto(
            $deviceLocationDto->id,
            $deviceLocationDto->NameDeviceLocation,
            $deviceLocationDto->NameUnit, 
            $deviceLocationDto->Plan
        ), 
            $deviceLocations->all()
        );
    }
}