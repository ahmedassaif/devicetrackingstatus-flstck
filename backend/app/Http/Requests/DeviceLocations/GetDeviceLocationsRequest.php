<?php

namespace App\Http\Requests\DeviceLocations;
use Illuminate\Foundation\Http\FormRequest;

class GetDeviceLocationsRequest extends FormRequest
{
    public $page;
    public $pageSize;
    public $searchText;
    public $sortField;
    public $sortOrder;
    public $from;
    public $to;

    public $deviceLocationOptions;

    public function __construct(DeviceLocationOptions $deviceLocationOptions)
    {
        $this->deviceLocationOptions = $deviceLocationOptions;
    }

    public function getDeviceLocationOptions(): DeviceLocationOptions
    {
        return $this->deviceLocationOptions;
    }

    public function rules()
    {
        return [
            'page' => 'integer|min:1',
            'pageSize' => 'integer|min:1|max:100',
            'searchText' => 'nullable|string|max:255',
            'from' => 'nullable|date',
            'to' => 'nullable|date',
            'sortField' => 'nullable|string',
            'sortOrder' => 'nullable|in:asc,desc',
        ];
    }

    public function authorize()
    {
        return true; // You can add logic here for authorization if needed
    }
}