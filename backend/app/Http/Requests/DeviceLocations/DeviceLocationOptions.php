<?php

namespace App\Http\Requests\DeviceLocations;

class DeviceLocationOptions
{
    public const SECTION_KEY = 'DeviceLocations';

    public $filterMinimumYear;
    public $filterMaximumYear;

    public function __construct()
    {
        $this->filterMinimumYear = config('DeviceLocation.filter_minimum_year', 2021);
        $this->filterMaximumYear = config('DeviceLocation.filter_maximum_year', 2030);
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