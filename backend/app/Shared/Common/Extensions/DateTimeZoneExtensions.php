<?php

namespace App\Shared\Common\Extensions;

use App\Shared\Common\Formats\DateTimeFormats;
use App\Shared\Common\Constants\DefaultTextFor;

class DateTimeZoneExtensions
{
    public static function toShortDateDisplayText(\DateTimeZone $dateTimeZone): string
    {
        return (new \DateTime('now', $dateTimeZone))->format(DateTimeFormats::DD_MMM_YYYY);
    }

    public static function toShortDateDisplayTextNullable(?\DateTimeZone $dateTimeZone): string
    {
        if ($dateTimeZone === null) {
            return DefaultTextFor::DASH;
        }

        return (new \DateTime('now', $dateTimeZone))->format(DateTimeFormats::DD_MMM_YYYY);
    }

    public static function toShortDateTimeDisplayText(\DateTimeZone $dateTimeZone): string
    {
        return (new \DateTime('now', $dateTimeZone))->format(DateTimeFormats::DD_MMM_YYYY_HH_MM_SS);
    }

    public static function toShortDateTimeDisplayTextNullable(?\DateTimeZone $dateTimeZone): string
    {
        if ($dateTimeZone === null) {
            return DefaultTextFor::DASH;
        }

        return (new \DateTime('now', $dateTimeZone))->format(DateTimeFormats::DD_MMM_YYYY_HH_MM_SS);
    }

    public static function toLongDateDisplayText(\DateTimeZone $dateTimeZone): string
    {
        return (new \DateTime('now', $dateTimeZone))->format(DateTimeFormats::DD_MMMM_YYYY);
    }

    public static function toLongDateDisplayTextNullable(?\DateTimeZone $dateTimeZone): string
    {
        if ($dateTimeZone === null) {
            return DefaultTextFor::DASH;
        }

        return (new \DateTime('now', $dateTimeZone))->format(DateTimeFormats::DD_MMMM_YYYY);
    }

    public static function toLongDateTimeDisplayText(\DateTimeZone $dateTimeZone): string
    {
        return (new \DateTime('now', $dateTimeZone))->format(DateTimeFormats::DD_MMMM_YYYY_HH_MM_SS);
    }

    public static function toLongDateTimeDisplayTextNullable(?\DateTimeZone $dateTimeZone): string
    {
        if ($dateTimeZone === null) {
            return DefaultTextFor::DASH;
        }

        return (new \DateTime('now', $dateTimeZone))->format(DateTimeFormats::DD_MMMM_YYYY_HH_MM_SS);
    }

    public static function toCompleteDateTimeDisplayText(\DateTimeZone $dateTimeZone): string
    {
        return (new \DateTime('now', $dateTimeZone))->format(DateTimeFormats::DD_MMMM_YYYY_HH_MM_SS_ZZZ);
    }

    public static function toCompleteDateTimeDisplayTextNullable(?\DateTimeZone $dateTimeZone): string
    {
        if ($dateTimeZone === null) {
            return DefaultTextFor::DASH;
        }

        return (new \DateTime('now', $dateTimeZone))->format(DateTimeFormats::DD_MMMM_YYYY_HH_MM_SS_ZZZ);
    }

    public static function toFriendlyTimeDisplayText(\DateTimeZone $dateTimeZone): string
    {
        $hour = (new \DateTime('now', $dateTimeZone))->format('G'); // 24-hour format without leading zeros

        return $hour >= 4 && $hour < 12 ? "Morning" :
               ($hour >= 12 && $hour < 17 ? "Afternoon" :
               ($hour >= 17 && $hour < 21 ? "Evening" : "Night"));
    }
}