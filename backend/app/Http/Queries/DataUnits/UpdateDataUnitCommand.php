<?php

namespace App\Http\Queries\DataUnits;

use App\Http\Requests\DataUnits\UpdateDataUnitRequest;
use App\Http\Resources\DataUnitResource;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\DataUnit;

class UpdateDataUnitCommand
{
    /**
     * Handle the update of a DataUnit.
     *
     * @param UpdateDataUnitRequest $updateDataUnitRequest
     * @return DataUnitResource
     * @throws ValidationException
     * @throws ModelNotFoundException
     */
    public function handle(UpdateDataUnitRequest $updateDataUnitRequest): DataUnitResource
    {
        $validator = Validator::make((array) $updateDataUnitRequest, [
            'NameUnit' => 'required|string|max:255',
            'Plan' => 'string|max:255',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        // Lock the DataUnit for update
        $dataUnit = DataUnit::where('id', $updateDataUnitRequest->id)->lockForUpdate()->firstOrFail();
        $dataUnit->NameUnit = $updateDataUnitRequest->NameUnit;
        $dataUnit->Plan = $updateDataUnitRequest->Plan;
        $dataUnit->save();

        return new DataUnitResource($dataUnit);
    }
}
