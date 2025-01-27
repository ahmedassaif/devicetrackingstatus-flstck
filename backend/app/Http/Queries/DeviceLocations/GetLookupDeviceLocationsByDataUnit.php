<?php

namespace App\Http\Queries\DeviceLocations;

use App\Models\DeviceLocation;
use App\Http\Dtos\DeviceLocationDto;
use App\Http\Requests\DeviceLocations\DeviceLocationsSelectorRequest;
use Illuminate\Support\Facades\DB;

class GetLookupDeviceLocationsByDataUnit{

    public function getLookup(DeviceLocationsSelectorRequest $request): array
    {
        $dataUnitId =(string) $request->input('DataUnitId');
        if (!$dataUnitId) {
            return [];
        }

        $query = DB::table('DeviceLocation')
                ->whereNull('DeviceLocation.deleted_at')
                ->where('DeviceLocation.DataUnitId', $dataUnitId)
                ->select('DeviceLocation.*')
                ->distinct()
                ;
        
        if ($query->count() == 0) {
            return [];
        }

        $query = $query
                ->join('DataUnit', 'DeviceLocation.DataUnitId', '=', 'DataUnit.id')
                ->select(
                    'DeviceLocation.id',
                    'DeviceLocation.NameDeviceLocation',
                    'DataUnit.NameUnit',
                    'DataUnit.Plan'
                )                
                ->orderBy('DataUnit.NameUnit') // Order by NameUnit to group data in Excel
                ;
        
        $searchText = (string) $request->query('searchText', ''); // Explicitly cast to string

        if ($searchText) {
            $query->where(function ($q) use ($searchText) {
                $q->where('NameDeviceLocation', 'like', '%' . $searchText . '%')
                    ->orWhere('NameUnit', 'like', '%' . $searchText . '%');
            });
        }

        $deviceLocations = $query->get();

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