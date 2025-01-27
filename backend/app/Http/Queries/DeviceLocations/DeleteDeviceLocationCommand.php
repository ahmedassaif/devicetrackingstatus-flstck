<?php

namespace App\Http\Queries\DeviceLocations;

use App\Models\DeviceLocation;
use App\Models\DetailedDeviceLocation;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class DeleteDeviceLocationCommand
{
    /**
     * Handle the soft deletion of a DeviceLocation.
     *
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     * @throws ModelNotFoundException
     */
    public function handle(string $id)
    {
        $deviceLocation = DeviceLocation::findOrFail($id); // Fetch the DeviceLocation by ID

        // Check if the DeviceLocation is being used in the DetailedDeviceLocation table
        $detailedDeviceLocationCount = DetailedDeviceLocation::where('DeviceLocationId', $id)->count();

        if ($detailedDeviceLocationCount > 0) {
            return response()->json(['message' => 'DeviceLocation is being used in DetailedDeviceLocation'], 409);
        }
        
        $deviceLocation->delete(); // Soft delete the DeviceLocation

        return response()->json(['message' => 'DeviceLocation deleted successfully'], 200);
    }
}
