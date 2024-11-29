<?php

namespace App\Shared\Services\HealthCheck\Constants;

class HealthCheckStatus
{
    const LOADING = 'Loading';
    const HEALTHY = 'Healthy';
    const UNHEALTHY = 'Unhealthy';
    const DEGRADED = 'Degraded';
    const UNKNOWN = 'Unknown';
}

?>