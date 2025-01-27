<?php

namespace App\Http\Queries\DetailedDeviceLocations;

use App\Http\Requests\DetailedDeviceLocations\UpdateDetailedDeviceLocationRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Models\DetailedDeviceLocation;
use App\Models\DeviceLocation;
use App\Models\DataUnit;
use App\Http\Resources\DetailedDeviceLocationResource;


class UpdateDetailedDeviceLocationCommand{


    public function handle(UpdateDetailedDeviceLocationRequest $request){
        
        $validator = Validator::make((array) $request, $request->rules(), $request->messages());

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $detailedDeviceLocation = DetailedDeviceLocation::where('id', $request->id)
                                        ->where('NameDetailLocation', $request->NameDetailLocation)
                                        ->where('MainDetailLocation', $request->MainDetailLocation)
                                        ->where('SubOfMainDetailLocation', $request->SubOfMainDetailLocation)
                                        ->where('DeviceLocationId', $request->DeviceLocationId)
                                        ->first();
        
        if ($detailedDeviceLocation) {
            throw new \Illuminate\Http\Exceptions\HttpResponseException(
                response()->json(['message' => 'Data already exists'], 409)
            );
        }

        $detailedDeviceLocationData = [
            'NameDetailLocation' => $request->NameDetailLocation,
            'MainDetailLocation' => $request->MainDetailLocation,
            'SubOfMainDetailLocation' => $request->SubOfMainDetailLocation,
            'DeviceLocationId' => $request->DeviceLocationId,
        ];

        $detailedDeviceLocation = DetailedDeviceLocation::findOrFail($request->id);
        $detailedDeviceLocation->NameDetailLocation = $request->NameDetailLocation;
        $detailedDeviceLocation->MainDetailLocation = $request->MainDetailLocation;
        $detailedDeviceLocation->SubOfMainDetailLocation = $request->SubOfMainDetailLocation;
        $detailedDeviceLocation->DeviceLocationId = $request->DeviceLocationId;
        $detailedDeviceLocation->save();

        $query = DetailedDeviceLocation::query()
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
            ->where('DetailedDeviceLocation.id', $detailedDeviceLocation->id);

        // Log the raw SQL query and bindings
        // Log::info('SQL Query:', [
        //     'query' => $query->toSql(),
        //     'bindings' => $query->getBindings(),
        // ]);

        // Execute the query and log the result
        $result = $query->first();
        // Log::info('Query result:', $result ? $result->toArray() : 'No result found');

        // Return the resource with the joined data
        return new DetailedDeviceLocationResource($result);
    }
}