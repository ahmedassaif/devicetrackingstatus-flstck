<?php

namespace App\Http\Queries\DetailedDeviceLocations;

use App\Models\DetailedDeviceLocation;

class DeleteDetailedDeviceLocationCommand{

    public function handle(string $id){
        
        $detailedDeviceLocation = DetailedDeviceLocation::findOrFail($id);
        $detailedDeviceLocation->delete();

        return response()->json(['message' => 'DetailedDeviceLocation deleted successfully'], 200);
    }

}