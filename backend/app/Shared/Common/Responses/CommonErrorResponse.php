<?php

namespace App\Shared\Common\Responses;

use Exception;

class CommonErrorResponse extends ErrorResponse
{
    public function __construct(Exception $exception, string $detail)
    {
        parent::__construct($exception, 'Common Error', 'Common Error', 400, $detail);
    }

    public function details(): array
    {
        return [$this->detail];
    }
}