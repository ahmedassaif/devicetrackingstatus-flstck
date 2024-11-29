<?php

namespace App\Shared\Common\Dtos;

class LookupDto
{
    private mixed $id; // Can hold any type
    private string $text;
    private string $text1;
    private string $text2;
    private string $text3;
    private string $text4;
    private string $text5;
    private string $text6;
    private string $text7;
    private string $text8;
    private string $text9;

    private int $textInt1;
    private int $textInt2;
    private int $textInt3;
    private int $textInt4;
    private int $textInt5;

    private ?\DateTime $textDateTime1;
    private ?\DateTime $textDateTime2;
    private ?\DateTime $textDateTime3;
    private ?\DateTime $textDateTime4;
    private ?\DateTime $textDateTime5;

    public function __construct(
        mixed $id,
        string $text,
        string $text1,
        string $text2,
        string $text3,
        string $text4,
        string $text5,
        string $text6,
        string $text7,
        string $text8,
        string $text9,
        int $textInt1,
        int $textInt2,
        int $textInt3,
        int $textInt4,
        int $textInt5,
        ?\DateTime $textDateTime1,
        ?\DateTime $textDateTime2,
        ?\DateTime $textDateTime3,
        ?\DateTime $textDateTime4,
        ?\DateTime $textDateTime5
    ) {
        $this->id = $id;
        $this->text = $text;
        $this->text1 = $text1;
        $this->text2 = $text2;
        $this->text3 = $text3;
        $this->text4 = $text4;
        $this->text5 = $text5;
        $this->text6 = $text6;
        $this->text7 = $text7;
        $this->text8 = $text8;
        $this->text9 = $text9;
        $this->textInt1 = $textInt1;
        $this->textInt2 = $textInt2;
        $this->textInt3 = $textInt3;
        $this->textInt4 = $textInt4;
        $this->textInt5 = $textInt5;
        $this->textDateTime1 = $textDateTime1;
        $this->textDateTime2 = $textDateTime2;
        $this->textDateTime3 = $textDateTime3;
        $this->textDateTime4 = $textDateTime4;
        $this->textDateTime5 = $textDateTime5;
    }

    // Getters for properties
    public function getId(): mixed
    {
        return $this->id;
    }

    public function getText(): string
    {
        return $this->text;
    }

    public function getText1(): string
    {
        return $this->text1;
    }

    public function getText2(): string
    {
        return $this->text2;
    }

    public function getText3(): string
    {
        return $this->text3;
    }

    public function getText4(): string
    {
        return $this->text4;
    }

    public function getText5(): string
    {
        return $this->text5;
    }

    public function getText6(): string
    {
        return $this->text6;
    }

    public function getText7(): string
    {
        return $this->text7;
    }

    public function getText8(): string
    {
        return $this->text8;
    }

    public function getText9(): string
    {
        return $this->text9;
    }

    public function getTextInt1(): int
    {
        return $this->textInt1;
    }

    public function getTextInt2(): int
    {
        return $this->textInt2;
    }

    public function getTextInt3(): int
    {
        return $this->textInt3;
    }

    public function getTextInt4(): int
    {
        return $this->textInt4;
    }

    public function getTextInt5(): int
    {
        return $this->textInt5;
    }

    public function getTextDateTime1(): ?\DateTime
    {
        return $this->textDateTime1;
    }

    public function getTextDateTime2(): ?\DateTime
    {
        return $this->textDateTime2;
    }

    public function getTextDateTime3(): ?\DateTime
    {
        return $this->textDateTime3;
    }

    public function getTextDateTime4(): ?\DateTime
    {
        return $this->textDateTime4;
    }

    public function getTextDateTime5(): ?\DateTime
    {
        return $this->textDateTime5;
    }
}