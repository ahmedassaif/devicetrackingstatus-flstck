<?php

namespace App\Http\Queries\DataUnits;

use App\Http\Requests\DataUnits\CreateDataUnitRequest;
use App\Models\DataUnit;
use App\Http\Resources\DataUnitResource;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use DateTime;
use DateTimeZone;

class CreateDataUnitCommand
{
    /**
     * Handle the creation of a DataUnit.
     *
     * @param CreateDataUnitRequest $createDataUnitRequest
     * @return DataUnitResource
     * @throws ValidationException
     */
    public function handle(CreateDataUnitRequest $createDataUnitRequest): DataUnitResource
    {
        $validator = Validator::make((array) $createDataUnitRequest, [
            'NameUnit' => 'required|string|max:255',
            'Plan' => 'nullable|string|max:255',
        ]);

        // Log the data for debugging purposes 
        Log::info('Request data:', (array) $createDataUnitRequest);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        // Convert current UTC time to Asia/Jakarta timezone 
        $utcNow = new DateTime('now', new DateTimeZone('UTC')); 
        $jakartaNow = $utcNow->setTimezone(new DateTimeZone('Asia/Jakarta'));

        Log::info('Current time:', ['UTC' => $utcNow->format('Y-m-d H:i:s'), 'Asia/Jakarta' => $jakartaNow->format('Y-m-d H:i:s')]);

        // Create and save DataUnit with manual timestamps 
        $dataUnit = DataUnit::create([ 
            'NameUnit' => $createDataUnitRequest->NameUnit, 
            'Plan' => $createDataUnitRequest->Plan, 
            'created_at' => $jakartaNow->format('Y-m-d H:i:s'), 
            'updated_at' => $jakartaNow->format('Y-m-d H:i:s'),
        ]);

        // $dataUnit->save();

        Log::info('DataUnit created:', $dataUnit->toArray());

        return new DataUnitResource($dataUnit);
    }
}
