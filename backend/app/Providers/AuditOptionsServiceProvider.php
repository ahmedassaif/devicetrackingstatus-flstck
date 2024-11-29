<?php

namespace App\Providers;

use App\Shared\Audits\Options\AuditOptions;
use Illuminate\Support\ServiceProvider;

class AuditOptionsServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register()
    {
        // Bind the AuditOptions class to the service container
        $this->app->singleton(AuditOptions::class, function ($app) {
            $config = $app['config']['audits']; // Assuming you have a 'audits' section in your config files
            $options = new AuditOptions();
            $options->filterMinimumYear = $config['filter_minimum_year'] ?? 0;
            $options->filterMaximumYear = $config['filter_maximum_year'] ?? 0;

            return $options;
        });
    }

    public function boot()
    {
        //
    }
}
