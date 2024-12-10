<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaginatedListRequest extends FormRequest
{
    public function rules()
    {
        return [
            'per_page' => 'nullable|integer|min:1',
            'search' => 'nullable|string|max:255',
            'from' => 'nullable|date',
            'to' => 'nullable|date|after_or_equal:from',
        ];
    }

    public function getQueryParameters()
    {
        return $this->only(['per_page', 'search', 'from', 'to']);
    }
}