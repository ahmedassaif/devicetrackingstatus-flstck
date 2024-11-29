<?php

namespace App\Shared\Common\Responses;

class ResponseResult extends Response
{
    public ?Response $result;
    public ?ErrorResponse $error;

    public function __construct(Response $result = null, ErrorResponse $error = null)
    {
        parent::__construct();
        $this->result = $result;
        $this->error = $error;
    }
}