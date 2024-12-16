<?php

namespace App\Http\Responses;

class FileResponse
{
    public $content;
    public $fileName;

    public function __construct($content, $fileName)
    {
        $this->content = $content;
        $this->fileName = $fileName;
    }
}
