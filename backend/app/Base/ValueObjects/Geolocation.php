<?php

namespace App\ValueObjects;

use App\Base\Common\ValueObject;
use InvalidArgumentException;
use Illuminate\Support\Str;

class Geolocation extends ValueObject
{
    private const SEPARATOR = '||';

    public float $latitude;
    public float $longitude;
    public float $accuracy;

    public function __construct(float $latitude, float $longitude, float $accuracy)
    {
        $this->latitude = $latitude;
        $this->longitude = $longitude;
        $this->accuracy = $accuracy;
    }

    public static function from(string $geolocationText): self
    {
        if ($geolocationText === null) {
            throw new InvalidArgumentException('Geolocation text cannot be null.');
        }

        $splitted = explode(self::SEPARATOR, $geolocationText);
        $expectedSplitLength = 3;

        if (count($splitted) !== $expectedSplitLength) {
            throw new InvalidArgumentException("Provided argument cannot be split into {$expectedSplitLength} parts.");
        }

        if (!is_numeric($splitted[0]) || !is_numeric($splitted[1]) || !is_numeric($splitted[2])) {
            throw new InvalidArgumentException("All parts of the provided argument must be numeric.");
        }

        return new self((float)$splitted[0], (float)$splitted[1], (float)$splitted[2]);
    }

    protected function getEqualityComponents(): array
    {
        return [$this->latitude, $this->longitude, $this->accuracy];
    }

    public function __toString(): string
    {
        return "{$this->latitude}" . self::SEPARATOR . "{$this->longitude}" . self::SEPARATOR . "{$this->accuracy}";
    }

    public function locationUrl(): string
    {
        return sprintf(
            'https://www.google.com/maps/@%s,%s,20z',
            number_format($this->latitude, 6, '.', ''),
            number_format($this->longitude, 6, '.', '')
        );
    }

    public function locationText(): string
    {
        return sprintf(
            'Latitude: %s, Longitude: %s with accuracy: %.2f meters',
            $this->latitudeText(),
            $this->longitudeText(),
            $this->accuracy
        );
    }

    public function latitudeText(): string
    {
        $direction = $this->latitude < 0 ? 'S' : 'N';
        $latitude = abs($this->latitude);
        $degrees = floor($latitude);
        $minutes = floor(($latitude - $degrees) * 60);
        $seconds = round((($latitude - $degrees) * 60 - $minutes) * 60, 4);

        return sprintf("%d°%d'%.4f\"%s", $degrees, $minutes, $seconds, $direction);
    }

    public function longitudeText(): string
    {
        $direction = $this->longitude < 0 ? 'W' : 'E';
        $longitude = abs($this->longitude);
        $degrees = floor($longitude);
        $minutes = floor(($longitude - $degrees) * 60);
        $seconds = round((($longitude - $degrees) * 60 - $minutes) * 60, 4);

        return sprintf("%d°%d'%.4f\"%s", $degrees, $minutes, $seconds, $direction);
    }
}