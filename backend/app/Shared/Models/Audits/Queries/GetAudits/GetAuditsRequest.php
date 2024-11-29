<?php

namespace App\Shared\Models\Audits\Queries\GetAudits;

use Illuminate\Foundation\Http\FormRequest; // Laravel's FormRequest for validation
use App\Shared\Common\Enums\SortOrder; // Assuming this is your enum for SortOrder

class GetAuditsRequest extends FormRequest
{
    // Define the properties
    public int $page = 1; // Default value
    public int $pageSize = 10; // Default value
    public ?string $searchText = null;
    public ?string $sortField = null;
    public ?SortOrder $sortOrder = null; // Assuming SortOrder is an enum

    // Define the rules for validation
    public function rules()
    {
        return [
            'page' => 'integer|min:1',
            'pageSize' => 'integer|min:1|max:100',
            'sortOrder' => 'nullable|in:' . implode(',', SortOrder::getValues()), // Assuming SortOrder has a method to get values
        ];
    }

    // Optionally, you can customize messages
    public function messages()
    {
        return [
            'page.integer' => 'The page must be an integer.',
            'page.min' => 'The page must be at least 1.',
            'pageSize.integer' => 'The page size must be an integer.',
            'pageSize.min' => 'The page size must be at least 1.',
            'pageSize.max' => 'The page size must not exceed 100.',
            'sortOrder.in' => 'The selected sort order is invalid.',
        ];
    }
}