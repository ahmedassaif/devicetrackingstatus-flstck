<?php

namespace App\Shared\Common\Extensions;

class Int64Extensions
{
    public static function toReadableFileSize(int $fileSize): string
    {
        $sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        $length = (double)$fileSize;
        $order = 0;

        while ($length >= 1024 && $order < count($sizes) - 1) {
            $order++;
            $length /= 1024;
        }

        return sprintf('%.2f %s', $length, $sizes[$order]);
    }
}

// Example usage
// echo Int64Extensions::toReadableFileSize(123456789); // Outputs: 117.74 MB