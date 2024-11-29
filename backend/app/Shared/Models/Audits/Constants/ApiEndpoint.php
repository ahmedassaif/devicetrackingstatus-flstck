<?php

namespace App\MITO\Shared\Audits\Constants;

class ApiEndpoint
{
    public const Segment = "V1/Audits";

    public static function getRouteTemplateFor()
    {
        return [
            'AuditId' => '{auditId:guid}',
            'Export' => 'Export'
        ];
    }
}