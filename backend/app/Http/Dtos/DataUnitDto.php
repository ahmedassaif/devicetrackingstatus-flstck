<?php

namespace App\Http\Dtos;

class DataUnitDto
{
    public $NameUnit;
    public $Plan;

    /**
     * DataUnitDto constructor.
     *
     * @param string $NameUnit
     * @param string|null $Plan
     */
    public function __construct(string $NameUnit, ?string $Plan)
    {
        $this->NameUnit = $NameUnit;
        $this->Plan = $Plan;
    }
}
