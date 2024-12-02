<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="Audit",
 *     type="object",
 *     description="Audit schema",
 *     @OA\Property(property="id", type="int", description="Unique identifier"),
 *     @OA\Property(property="created_at", type="string", format="date-time", description="Creation timestamp"),
 *     @OA\Property(property="user_id", type="string", nullable=true, description="User ID who performed the action"),
 *     @OA\Property(property="auditable_type", type="string", description="Type of the audited entity"),
 *     @OA\Property(property="auditable_id", type="string", description="ID of the audited entity"),
 *     @OA\Property(property="event", type="string", description="Audit event type"),
 *     @OA\Property(property="old_values", type="object", nullable=true, description="Previous values"),
 *     @OA\Property(property="new_values", type="object", description="New values"),
 *     @OA\Property(property="ip_address", type="string", description="IP address from where the request was made")
 * )
 */
class AuditResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'created_at' => $this->created_at,
            'user_id' => $this->user_id ?? null, // Sesuaikan kolom dengan basis data Anda
            'auditable_type' => $this->auditable_type,
            'auditable_id' => $this->auditable_id,
            'event' => $this->event,
            'old_values' => $this->old_values,
            'new_values' => $this->new_values,
            'ip_address' => $this->ip_address,
        ];
    }
}
