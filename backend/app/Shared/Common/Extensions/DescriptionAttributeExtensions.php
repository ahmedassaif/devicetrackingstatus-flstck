<?php

namespace App\Shared\Common\Extensions;

use ReflectionClass;
use ReflectionProperty;

class DescriptionAttributeExtensions
{
    public static function getDescription($enumValue): string
    {
        if (!is_subclass_of($enumValue, \BackedEnum::class)) {
            return (string)$enumValue;
        }

        $reflection = new ReflectionClass($enumValue);
        $constName = $reflection->getConstant($enumValue->value);
        $property = $reflection->getProperty($constName);

        return self::getAttributeDescription($property) ?: (string)$enumValue;
    }

    public static function getMemberDescription(object $object, string $memberName): string
    {
        $reflection = new ReflectionClass($object);
        $property = $reflection->getProperty($memberName);

        return self::getAttributeDescription($property) ?: $memberName;
    }

    public static function getTypeDescription(object $object): string
    {
        $reflection = new ReflectionClass($object);
        return self::getAttributeDescription($reflection) ?: get_class($object);
    }

    private static function getAttributeDescription($reflection): ?string
    {
        $attributes = $reflection->getAttributes(Description::class);

        if (empty($attributes)) {
            return null;
        }

        return $attributes[0]->newInstance()->description;
    }
}

// Example of a Description attribute
#[Attribute]
class Description
{
    public string $description;

    public function __construct(string $description)
    {
        $this->description = $description;
    }
}