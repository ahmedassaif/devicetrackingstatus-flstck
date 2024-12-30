<?php

namespace App\Http\Queries\DeviceLocations;

use App\Models\DeviceLocation;
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

        $deviceLocation->delete(); // Soft delete the DeviceLocation

        return response()->json(['message' => 'DeviceLocation deleted successfully'], 200);
    }
}
