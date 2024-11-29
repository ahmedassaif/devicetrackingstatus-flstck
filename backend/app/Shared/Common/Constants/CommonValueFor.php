<?php

namespace App\Shared\Common\Constants;

class CommonValueFor
{
    public static function operatingSystemDescription()
    {
        return php_uname();
    }

    public static function entryAssembly()
    {
        return app()->make('Illuminate\Foundation\Application')->getBasePath();
    }

    public static function environmentName()
    {
        return env('APP_ENV', 'local');
    }

    public static function entryAssemblyName()
    {
        return basename(self::entryAssembly());
    }

    public static function entryAssemblyVersion()
    {
        return app()->version();
    }

    public static function entryAssemblySimpleName()
    {
        return self::entryAssemblyName();
    }

    public static function entryAssemblyInformationalVersion()
    {
        return config('app.version');
    }

    public static function entryAssemblyFrameworkName()
    {
        return app()->version();
    }

    public static function entryAssemblyLastBuild()
    {
        return filemtime(self::entryAssembly());
    }
}