<?php

namespace App\Http\Queries\DetailedDeviceLocations;

use App\Http\Requests\DetailedDeviceLocations\CreateDetailedDeviceLocationRequest;
use App\Http\Resources\DetailedDeviceLocationResource;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use App\Models\DetailedDeviceLocation;
use App\Models\DeviceLocation;
use App\Models\DataUnit;

class CreateDetailedDeviceLocationCommand{

    public function handle(CreateDetailedDeviceLocationRequest $createDetailedDeviceLocationRequest): DetailedDeviceLocationResource
    {
        // Log::info('Request data:', (array) $createDetailedDeviceLocationRequest);

        $validator = Validator::make((array) $createDetailedDeviceLocationRequest, $createDetailedDeviceLocationRequest->rules(), $createDetailedDeviceLocationRequest->messages());

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $detailedDeviceLocation = DetailedDeviceLocation::where('NameDetailLocation', $createDetailedDeviceLocationRequest->NameDetailLocation)
            ->where('MainDetailLocation', $createDetailedDeviceLocationRequest->MainDetailLocation)
            ->where('SubOfMainDetailLocation', $createDetailedDeviceLocationRequest->SubOfMainDetailLocation)
            ->where('DeviceLocationId', $createDetailedDeviceLocationRequest->DeviceLocationId)
            ->first();

        if ($detailedDeviceLocation) {
            throw new \Illuminate\Http\Exceptions\HttpResponseException(
                response()->json(['message' => 'Data already exists'], 409)
            );
        }

        $detailedDeviceLocationData = [
            'NameDetailLocation' => $createDetailedDeviceLocationRequest->NameDetailLocation,
            'MainDetailLocation' => $createDetailedDeviceLocationRequest->MainDetailLocation,
            'SubOfMainDetailLocation' => $createDetailedDeviceLocationRequest->SubOfMainDetailLocation,
            'DeviceLocationId' => $createDetailedDeviceLocationRequest->DeviceLocationId,
        ];

        // Log::info('DetailedDeviceLocation data to be created:', $detailedDeviceLocationData);

        $detailedDeviceLocation = DetailedDeviceLocation::create($detailedDeviceLocationData);

        // Log::info('DetailedDeviceLocation created:', $detailedDeviceLocation->toArray());

        // Fetch the created record with joined data
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