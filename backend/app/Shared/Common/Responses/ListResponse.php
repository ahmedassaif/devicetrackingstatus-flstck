<?php

namespace App\Shared\Common\Responses;

class ListResponse extends Response
{
    public array $items;

    public function __construct(array $items)
    {
        parent::__construct();
        $this->items = $items;
    }
}