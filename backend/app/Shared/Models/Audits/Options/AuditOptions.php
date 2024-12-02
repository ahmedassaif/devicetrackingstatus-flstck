<?php

namespace App\Shared\Models\Audits\Options;

class AuditOptions
{
    public const SECTION_KEY = 'audits'; // This is the section key for configuration

    public int $filterMinimumYear;
    public int $filterMaximumYear;

    public function getFilterMinimumCreated(): \DateTime
    {
        return new \DateTime("{$this->filterMinimumYear}-01-01 00:00:00");
    }

    public function getFilterMaximumCreated(): \DateTime
    {
        return new \DateTime("{$this->filterMaximumYear}-12-31 23:59:59");
    }
}