<?php

namespace App\Shared\Common\Extensions;

class BooleanExtension
{
    public static function toYesNoDisplayText(bool $value): string
    {
        return $value ? "Yes" : "No";
    }

    public static function toEnabledDisabledDisplayText(bool $value): string
    {
        return $value ? "Enabled" : "Disabled";
    }
}