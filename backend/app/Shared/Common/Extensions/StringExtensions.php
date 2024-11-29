<?php

namespace App\Shared\Common\Extensions;

use App\Shared\Common\Constants\DefaultTextFor;

class StringExtensions
{
    public static function splitWords(string $sentence): string
    {
        $pattern = '/(?<=[A-Z])(?=[A-Z][a-z])|(?<=[^A-Z])(?=[A-Z])|(?<=[A-Za-z])(?=[^A-Za-z])/';
        $removedExistingSpace = str_replace(' ', '', $sentence);
        
        return preg_replace($pattern, ' ', $removedExistingSpace);
    }

    public static function replaceNewLineToBr(string $text): string
    {
        $pattern = '/(\r\n|\r|\n)+/';
        
        return preg_replace($pattern, '<br />', $text);
    }

    public static function replace(string $source, array $replacements): string
    {
        foreach ($replacements as $key => $value) {
            $source = str_replace($key, $value, $source);
        }

        return $source;
    }

    public static function toSafeDisplayText(?string $text): string
    {
        if (is_null($text) || trim($text) === '') {
            return DefaultTextFor::DASH; // Using DefaultTextFor class
        }

        return $text;
    }
}

// Example usage
// echo StringExtensions::splitWords("HelloWorldExample"); // Outputs: "Hello World Example"
// echo StringExtensions::replaceNewLineToBr("Line1\nLine2\nLine3"); // Outputs: "Line1<br />Line2<br />Line3"
// echo StringExtensions::replace("Hello World", ["World" => "PHP"]); // Outputs: "Hello PHP"
// echo StringExtensions::toSafeDisplayText(null); // Outputs: "-"