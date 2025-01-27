<?php

namespace App\Http\Requests\DetailedDeviceLocations;

use App\Http\Requests\SearchInSelectorRequest;
use Illuminate\Foundation\Http\FormRequest;

class DetailedDeviceLocationSeletorRequest extends SearchInSelectorRequest{

    public $DeviceLocationId;

    public function rules()
    {
        return [
            'DeviceLocationId' => 'nullable|string|max:255'
        ];
    }
}