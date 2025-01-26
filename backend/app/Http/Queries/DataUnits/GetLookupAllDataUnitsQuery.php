<?php

namespace App\Http\Queries\DataUnits;

use App\Models\DataUnit;
use App\Http\Dtos\DataUnitDto;
use App\Http\Requests\SearchInSelectorRequest;
use Illuminate\Support\Facades\DB;

class GetLookupAllDataUnitsQuery
{
    public function getLookup(SearchInSelectorRequest $request): array
    {
        $query = DB::table('DataUnit')->whereNull('deleted_at')->orderBy('NameUnit', 'asc');
        
        $searchText = (string) $request->query('searchText', ''); // Explicitly cast to string

        if ($searchText) {
            $query->where(function ($q) use ($searchText) {
                $q->where('NameUnit', 'like', '%' . $searchText . '%')
                    ->orWhere('Plan', 'like', '%' . $searchText . '%');
            });
        }

        $dataUnits = $query->get();

        return array_map(fn($dataUnitDto) => new DataUnitDto(
            $dataUnitDto->id,            
            $dataUnitDto->NameUnit, 
            $dataUnitDto->Plan
        ), 
            $dataUnits->all()
        );
    }
}