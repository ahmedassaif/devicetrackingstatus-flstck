<?php

namespace App\Shared\Common\Attributes;

use Attribute;

#[Attribute(Attribute::TARGET_PROPERTY | Attribute::TARGET_PARAMETER)]
final class OpenApiContentTypeAttribute
{
    private string $contentType; // Private property to hold the content type

    public function __construct(string $contentType)
    {
        $this->contentType = $contentType; // Initialize the content type
    }

    // Public getter method to access the content type
    public function getContentType(): string
    {
        return $this->contentType;
    }
}