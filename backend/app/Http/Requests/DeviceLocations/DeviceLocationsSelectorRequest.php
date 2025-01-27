<?php

namespace App\Http\Requests\DeviceLocations;

use App\Http\Requests\SearchInSelectorRequest;

class DeviceLocationsSelectorRequest extends SearchInSelectorRequest {

    public $DataUnitId;

    public function rules()
    {
        return [
            'DataUnitId' => 'nullable|string|max:255'
        ];
    }
}