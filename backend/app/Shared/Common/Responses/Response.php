<?php

namespace App\Shared\Common\Responses;

use Illuminate\Support\Carbon;

abstract class Response
{
    public Carbon $timestamp;

    public function __construct()
    {
        $this->timestamp = Carbon::now();
    }
}