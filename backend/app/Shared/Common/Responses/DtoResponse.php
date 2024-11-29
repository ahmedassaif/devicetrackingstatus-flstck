<?php

namespace App\Shared\Common\Responses;

class DtoResponse extends Response
{
    public $item;
    public ?ErrorResponse $error;

    public function __construct($item = null, ErrorResponse $error = null)
    {
        parent::__construct();
        $this->item = $item;
        $this->error = $error;
    }
}