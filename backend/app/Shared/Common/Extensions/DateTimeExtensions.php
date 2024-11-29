<?php

namespace App\Shared\Common\Extensions;

use App\Shared\Common\Formats\DateTimeFormats;
use App\Shared\Common\Constants\DefaultTextFor;

class DateTimeExtensions
{
    public static function toShortDateDisplayText(\DateTime $dateTime): string
    {
        return $dateTime->format(DateTimeFormats::DD_MMM_YYYY);
    }

    public static function toShortDateDisplayTextNullable(?\DateTime $dateTime): string
    {
        if ($dateTime === null) {
            return DefaultTextFor::DASH;
        }

        return $dateTime->format(DateTimeFormats::DD_MMM_YYYY);
    }

    public static function toLongDateTimeDisplayText(\DateTime $dateTime): string
    {
        return $dateTime->format(DateTimeFormats::DD_MMMM_YYYY_HH_MM_SS);
    }

    public static function toLongDateTimeDisplayTextNullable(?\DateTime $dateTime): string
    {
        if ($dateTime === null) {
            return DefaultTextFor::DASH;
        }

        return $dateTime->format(DateTimeFormats::DD_MMMM_YYYY_HH_MM_SS);
    }

    public static function toCompleteDateTimeDisplayText(\DateTime $dateTime): string
    {
        return $dateTime->format(DateTimeFormats::DD_MMMM_YYYY_HH_MM_SS_ZZZ);
    }

    public static function toCompleteDateTimeDisplayTextNullable(?\DateTime $dateTime): string
    {
        if ($dateTime === null) {
            return DefaultTextFor::DASH;
        }

        return $dateTime->format(DateTimeFormats::DD_MMMM_YYYY_HH_MM_SS_ZZZ);
    }
}