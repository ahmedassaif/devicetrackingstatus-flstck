<?php

namespace App\Http\Queries\DataUnits;

use App\Http\Resources\DataUnitResource;
use App\Models\DataUnit;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class GetDataUnitQuery
{
    /**
     * Fetch a specific DataUnit by its ID.
     *
     * @param int $dataUnitId
     * @return DataUnitResource
     * @throws ModelNotFoundException
     */
    public function getDataUnit(string $dataUnitId): DataUnitResource
    {
        try {
            // Fetch the DataUnit record by ID
            $dataUnit = DataUnit::findOrFail($dataUnitId);
            // Return as a resource
            return new DataUnitResource($dataUnit);
        } catch (ModelNotFoundException $e) {
            // Handle case where the DataUnit is not found
            throw new ModelNotFoundException("DataUnit with ID {$dataUnitId} is not found.");
        }
    }
}
