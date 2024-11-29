<?php

namespace App\Shared\Common\Responses;

use Exception;

abstract class ErrorResponse extends Response
{
    public Exception $exception;
    public string $type;
    public string $title;
    public int $status;
    public string $detail;
    public array $details;

    public function __construct(Exception $exception, string $type, string $title, int $status, string $detail, array $details = [])
    {
        parent::__construct();
        $this->exception = $exception;
        $this->type = $type;
        $this->title = $title;
        $this->status = $status;
        $this->detail = $detail;
        $this->details = $details;
    }
}