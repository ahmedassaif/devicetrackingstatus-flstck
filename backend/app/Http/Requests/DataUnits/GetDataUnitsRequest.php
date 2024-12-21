<?php

namespace App\Http\Requests\DataUnits;
use Illuminate\Foundation\Http\FormRequest;

class GetDataUnitsRequest extends FormRequest
{
    public $page;
    public $pageSize;
    public $searchText;
    public $sortField;
    public $sortOrder;
    public $from;
    public $to;

    public $dataUnitOptions;

    public function __construct(DataUnitOptions $DataUnitOptions)
    {
        $this->dataUnitOptions = $DataUnitOptions;
    }

    public function getDataUnitOptions(): DataUnitOptions
    {
        return $this->dataUnitOptions;
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