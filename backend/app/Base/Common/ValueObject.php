<?php

namespace App\Base\Common;

abstract class ValueObject
{
    protected static function equalOperator(?ValueObject $left, ?ValueObject $right): bool
    {
        return !($left === null xor $right === null) && ($left === null || $left->equals($right));
    }

    protected static function notEqualOperator(?ValueObject $left, ?ValueObject $right): bool
    {
        return !self::equalOperator($left, $right);
    }

    protected abstract function getEqualityComponents(): array;

    public function equals(?object $obj): bool
    {
        if ($obj === null || get_class($obj) !== get_class($this)) {
            return false;
        }

        $other = $obj;

        return $this->getEqualityComponents() === $other->getEqualityComponents();
    }

    public function getHashCode(): int
    {
        return array_reduce(
            $this->getEqualityComponents(),
            function ($carry, $item) {
                return $carry ^ ($item !== null ? spl_object_hash($item) : 0);
            },
            0
        );
    }
}