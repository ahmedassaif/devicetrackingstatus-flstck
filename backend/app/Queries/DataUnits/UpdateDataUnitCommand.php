<?php

namespace App\Queries\DataUnits;

use App\Http\Dtos\DataUnitDto;
use App\Models\DataUnit;
use App\Http\Resources\DataUnitResource;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UpdateDataUnitCommand
{
    /**
     * Handle the update of a DataUnit.
     *
     * @param DataUnitDto $dataUnitDto
     * @param string $id
     * @return DataUnitResource
     * @throws ValidationException
     * @throws ModelNotFoundException
     */
    public function handle(DataUnitDto $dataUnitDto, string $id): DataUnitResource
    {
        $validator = Validator::make((array) $dataUnitDto, [
            'NameUnit' => 'required|string|max:255',
            'Plan' => 'string|max:255',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $dataUnit = DataUnit::findOrFail($id); // Fetch the DataUnit by ID
        $dataUnit->NameUnit = $dataUnitDto->NameUnit;
        $dataUnit->Plan = $dataUnitDto->Plan;
        $dataUnit->save();

        return new DataUnitResource($dataUnit);
    }
}
