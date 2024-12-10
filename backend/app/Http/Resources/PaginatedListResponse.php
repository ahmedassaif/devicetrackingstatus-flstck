<?php

namespace App\Http\Resources;

class PaginatedListResponse
{
    public $items;
    public $totalCount;

    public function __construct($items, $totalCount)
    {
        $this->items = $items;
        $this->totalCount = $totalCount;
    }
}