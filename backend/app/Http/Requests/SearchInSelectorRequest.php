<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchInSelectorRequest extends FormRequest
{
    public $searchText;

    public function rules()
    {
        return [
            'searchText' => 'nullable|string|max:255'
        ];
    }

    public function getQueryParameters()
    {
        return $this->only(['search']);
    }
}
