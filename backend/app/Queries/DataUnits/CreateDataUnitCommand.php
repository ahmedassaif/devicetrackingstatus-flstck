<?php

namespace App\Queries\DataUnits;

use App\Http\Dtos\DataUnitDto;
use App\Models\DataUnit;
use App\Http\Resources\DataUnitResource;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;

class CreateDataUnitCommand
{
    /**
     * Handle the creation of a DataUnit.
     *
     * @param DataUnitDto $dataUnitDto
     * @return DataUnitResource
     * @throws ValidationException
     */
    public function handle(DataUnitDto $dataUnitDto): DataUnitResource
    {
        $validator = Validator::make((array) $dataUnitDto, [
            'NameUnit' => 'required|string|max:255',
            'Plan' => 'string|max:255',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $dataUnit = new DataUnit();
        $dataUnit->NameUnit = $dataUnitDto->NameUnit;
        $dataUnit->Plan = $dataUnitDto->Plan;
        $dataUnit->save();

        return new DataUnitResource($dataUnit);
    }
}
