<?php

namespace App\Shared\Common\Responses;
use Exception;

class ServiceUnavailableResponse extends ErrorResponse
{
    public function __construct(Exception $exception, string $detail)
    {
        parent::__construct($exception, 'Service Unavailable', 'Service Unavailable', 503, $detail);
    }

    public function details(): array
    {
        return [$this->detail];
    }
}