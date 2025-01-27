<?php

namespace App\Http\Requests\DetailedDeviceLocations;
use Illuminate\Foundation\Http\FormRequest;

class GetDetailedDeviceLocationsRequest extends FormRequest
{
    public $page;
    public $pageSize;
    public $searchText;
    public $sortField;
    public $sortOrder;
    public $from;
    public $to;

    public $detailedDeviceLocationOptions;

    public function __construct(DetailedDeviceLocationOptions $detailedDeviceLocationOptions)
    {
        $this->detailedDeviceLocationOptions = $detailedDeviceLocationOptions;
    }

    public function getDetailedDeviceLocationOptions(): DetailedDeviceLocationOptions
    {
        return $this->detailedDeviceLocationOptions;
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