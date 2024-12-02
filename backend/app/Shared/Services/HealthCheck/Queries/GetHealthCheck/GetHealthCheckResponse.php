<?php

namespace App\Shared\Services\HealthCheck\Queries\GetHealthCheck;

use App\Shared\Services\HealthCheck\Constants\HealthCheckStatus;

class GetHealthCheckResponse
{
    public string $status;
    public \DateInterval $totalDuration; // Using DateInterval to represent TimeSpan
    public array $entries; // Using an associative array for key-value pairs

    public function __construct()
    {
        $this->status = HealthCheckStatus::LOADING; // Default status
        $this->totalDuration = new \DateInterval('PT0S'); // Default TimeSpan
        $this->entries = []; // Initialize as an empty associative array
    }

    // Optional: Method to add an entry
    public function addEntry(string $key, GetHealthCheckEntry $entry): void
    {
        $this->entries[$key] = $entry;
    }
}