<?php

namespace App\Shared\Services\HealthCheck\Queries\GetHealthCheck;

class GetHealthCheckHealthCheckEntry
{
    public string $status;

    public function __construct(string $status = '')
    {
        $this->status = $status;
    }
}

?>