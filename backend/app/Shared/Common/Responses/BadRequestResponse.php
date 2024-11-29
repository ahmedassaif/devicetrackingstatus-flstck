<?php

namespace App\Shared\Common\Responses;

use Exception;

class BadRequestResponse extends ErrorResponse
{
    public array $errors;

    public function __construct(Exception $exception, array $errors)
    {
        parent::__construct($exception, 'Bad Request', 'Invalid request data', 400, 'The request could not be understood by the server due to malformed syntax.', []);
        $this->errors = $errors;
    }

    public function details(): array
    {
        // Flatten the errors array to a single list of error messages
        return array_merge(...array_values($this->errors));
    }
}