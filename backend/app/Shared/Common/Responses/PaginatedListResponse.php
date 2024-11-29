<?php

namespace App\Shared\Common\Responses;

class PaginatedListResponse extends Response
{
    public array $items = [];
    public int $totalCount;

    public function __construct(array $items, int $totalCount)
    {
        parent::__construct();
        $this->items = $items;
        $this->totalCount = $totalCount;
    }
}