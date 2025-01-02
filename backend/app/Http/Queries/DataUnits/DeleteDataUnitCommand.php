<?php

namespace App\Http\Queries\DataUnits;

use App\Models\DataUnit;
use App\Models\DeviceLocation;
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

        // Check if the DataUnit is being used in the DeviceLocation table 
        $deviceLocationCount = DeviceLocation::where('DataUnitId', $id)->count(); 
        
        if ($deviceLocationCount > 0) { 
            // Throw a warning if the DataUnit is being used in DeviceLocation 
            return response()->json(['message' => 'Cannot delete DataUnit: it is being used in DeviceLocation'], 400); 
        }

        $dataUnit->delete(); // Soft delete the DataUnit

        return response()->json(['message' => 'DataUnit deleted successfully'], 200);
    }
}
