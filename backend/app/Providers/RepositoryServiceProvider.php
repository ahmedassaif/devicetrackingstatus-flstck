<?php

namespace App\Providers;

use App\Interfaces\AuditRepositoryInterface;
use App\Repositories\AuditRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(AuditRepositoryInterface::class,AuditRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
