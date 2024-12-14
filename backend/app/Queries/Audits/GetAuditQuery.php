<?php

namespace App\Queries\Audits;

use App\Http\Resources\Audits\AuditResource;
use App\Models\Audit;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class GetAuditQuery
{
    /**
     * Fetch a specific audit by its ID.
     *
     * @param int $auditId
     * @return AuditResource
     * @throws ModelNotFoundException
     */
    public function getAudit(int $auditId): AuditResource
    {
        try {
            // Fetch the audit record by ID
            $audit = Audit::findOrFail($auditId);
            // Return as a resource
            return new AuditResource($audit);
        } catch (ModelNotFoundException $e) {
            // Handle case where the audit is not found
            throw new ModelNotFoundException("Audit with ID {$auditId} not found.");
        }
    }
}
