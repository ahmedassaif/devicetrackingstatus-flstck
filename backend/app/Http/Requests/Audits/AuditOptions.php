<?php

namespace App\Http\Requests\Audits;

class AuditOptions
{
    public const SECTION_KEY = 'Audits';

    public $filterMinimumYear;
    public $filterMaximumYear;

    public function __construct()
    {
        $this->filterMinimumYear = config('audit.filter_minimum_year', 2021);
        $this->filterMaximumYear = config('audit.filter_maximum_year', 2030);
    }

    public function getFilterMinimumCreated()
    {
        return new \DateTime("$this->filterMinimumYear-01-01 00:00:00");
    }

    public function getFilterMaximumCreated()
    {
        return new \DateTime("$this->filterMaximumYear-12-31 23:59:59");
    }
}