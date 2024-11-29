<?php

namespace App\Shared\Common\Enums;

class SortOrder
{
    const NONE = 0;
    const ASC = 1;
    const DESC = 2;

    // Method to get the possible values
    public static function getValues(): array
    {
        return [
            self::NONE,
            self::ASC,
            self::DESC,
        ];
    }

    // Optional: You can add a method to get the name of the constant
    public static function getName(int $value): string
    {
        switch ($value) {
            case self::NONE:
                return 'None';
            case self::ASC:
                return 'Ascending';
            case self::DESC:
                return 'Descending';
            default:
                return 'Unknown';
        }
    }
}