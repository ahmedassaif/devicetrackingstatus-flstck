<?php

namespace App\Shared\Models\Audits\Queries\ExportAudits;

use App\Shared\Common\Attributes\OpenApiContentTypeAttribute;
use App\Shared\Common\Constants\ContentTypes;

class ExportAuditsRequest
{
    #[OpenApiContentTypeAttribute(ContentTypes::TEXT_PLAIN)]
    public array $auditIds = [];

    public function __construct(array $auditIds = [])
    {
        $this->auditIds = $auditIds;
    }
}