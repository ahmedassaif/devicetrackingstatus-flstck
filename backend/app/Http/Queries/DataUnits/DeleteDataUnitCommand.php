<?php

namespace App\Http\Queries\DataUnits;

use App\Models\DataUnit;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class DeleteDataUnitCommand
{
    /**
     * Handle the soft deletion of a DataUnit.
     *
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     * @throws ModelNotFoundException
     */
    public function handle(string $id)
    {
        $dataUnit = DataUnit::findOrFail($id); // Fetch the DataUnit by ID

        $dataUnit->delete(); // Soft delete the DataUnit

        return response()->json(['message' => 'DataUnit deleted successfully'], 200);
    }
}
