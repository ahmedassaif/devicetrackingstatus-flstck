<?php

namespace App\Shared\Common\Responses;

class FileResponse extends Response
{
    public string $fileName;
    public string $contentType;
    public string $content;

    public function __construct(string $fileName, string $contentType, string $content)
    {
        parent::__construct();
        $this->fileName = $fileName;
        $this->contentType = $contentType;
        $this->content = $content;
    }
}