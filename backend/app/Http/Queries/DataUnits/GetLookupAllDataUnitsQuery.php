<?php

namespace App\Http\Queries\DataUnits;

use App\Models\DataUnit;
use App\Http\Dtos\DataUnitDto;

class GetLookupAllDataUnitsQuery
{
    public function getLookup(): array
    {
        $dataUnits = DataUnit::whereNull('deleted_at')->orderBy('NameUnit', 'asc')->get(); 
        return array_map(fn($dataUnitDto) => new DataUnitDto(
            $dataUnitDto->id,            
            $dataUnitDto->NameUnit, 
            $dataUnitDto->Plan
        ), 
            $dataUnits->all()
        );
    }
}