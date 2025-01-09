<?php

namespace App\Http\Queries\Audits;

use App\Http\Resources\AuditResource;
use App\Models\Audit;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class GetLookupAllAuditsQuery
{
    public function getLookup(): array
    {
        try {
            // Fetch all audit records
            $audits = Audit::all();
            // Return as a collection of resources
            return AuditResource::collection($audits);
        } catch (ModelNotFoundException $e) {
            // Handle case where no audits are found
            return [];
        }
    }
}