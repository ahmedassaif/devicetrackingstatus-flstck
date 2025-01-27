<?php
namespace App\Http\Queries\DetailedDeviceLocations;

use App\Http\Requests\DetailedDeviceLocations\DetailedDeviceLocationSeletorRequest;
use App\Http\DTOs\DetailedDeviceLocation;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class GetLookupDetailedDeviceLocationsByDeviceLocationQuery{

    public function getLookup(DetailedDeviceLocationSeletorRequest $request): array
    {
        // Log::info('Request Data: ', $request->all());

        $DeviceLocationId =(string) $request->input('DeviceLocationId');
        // Log::info('DeviceLocationId: ' . $DeviceLocationId);
        if (!$DeviceLocationId) {
            return [];
        }
        $query = DB::table('DetailedDeviceLocation')
                ->where('DetailedDeviceLocation.DeviceLocationId', $DeviceLocationId)
                ->whereNull('DetailedDeviceLocation.deleted_at')
                ->select('DetailedDeviceLocation.*')
                ->distinct()
                ;
                // Log::info('Raw SQL Query: ' . $query->toSql());

                // Log the bindings (values that will replace the placeholders)
                Log::info('Bindings: ', $query->getBindings());
        if ($query->count() == 0) {
            return [];
        }

        $query = $query
                ->join('DeviceLocation', 'DetailedDeviceLocation.DeviceLocationId', '=', 'DeviceLocation.id')
                ->leftJoin('DataUnit', 'DeviceLocation.DataUnitId', '=', 'DataUnit.id')
                ->select(
                    'DetailedDeviceLocation.id',
                    'DetailedDeviceLocation.NameDetailLocation',
                    'DetailedDeviceLocation.MainDetailLocation',
                    'DetailedDeviceLocation.SubOfMainDetailLocation',
                    'DeviceLocation.NameDeviceLocation',
                    'DataUnit.NameUnit'
                )
                ->orderBy('DataUnit.NameUnit') // Order by NameUnit to group data in Excel
                ;

        $searchText = (string) $request->query('searchText', ''); // Explicitly cast to string

        if ($searchText) {
            $query->where(function ($q) use ($searchText) {
                $q->where('NameDetailLocation', 'like', '%' . $searchText . '%')
                    ->orWhere('MainDetailLocation', 'like', '%' . $searchText . '%')
                    ->orWhere('SubOfMainDetailLocation', 'like', '%' . $searchText . '%')
                    ->orWhere('NameDeviceLocation', 'like', '%' . $searchText . '%')
                    ->orWhere('NameUnit', 'like', '%' . $searchText . '%');
            });
        }

        $detailedDeviceLocations = $query->get();

        return array_map(fn($detailedDeviceLocationDto) => new DetailedDeviceLocation(
            $detailedDeviceLocationDto->id,
            $detailedDeviceLocationDto->NameDetailLocation,
            $detailedDeviceLocationDto->MainDetailLocation,
            $detailedDeviceLocationDto->SubOfMainDetailLocation,
            $detailedDeviceLocationDto->NameDeviceLocation,
            $detailedDeviceLocationDto->NameUnit
        ), $detailedDeviceLocations->all());
    }
}