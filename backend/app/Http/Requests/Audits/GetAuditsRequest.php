<?php

namespace App\Http\Requests\Audits;
use Illuminate\Foundation\Http\FormRequest;

class GetAuditsRequest extends FormRequest
{
    public $page;
    public $pageSize;
    public $searchText;
    public $sortField;
    public $sortOrder;
    public $from;
    public $to;

    public $auditOptions;

    public function __construct(AuditOptions $auditOptions)
    {
        $this->auditOptions = $auditOptions;
    }

    public function getAuditOptions(): AuditOptions
    {
        return $this->auditOptions;
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