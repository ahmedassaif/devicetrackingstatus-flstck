<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="Audit",
 *     type="object",
 *     description="Audit schema",
 *     @OA\Property(property="id", type="int", description="Unique identifier"),
 *     @OA\Property(property="user_type", type="string", nullable=true, description="User type who performed the action"),
 *     @OA\Property(property="user_id", type="int", nullable=true, description="User ID who performed the action"),
 *     @OA\Property(property="event", type="string", description="Audit event type"),
 *     @OA\Property(property="auditable_type", type="string", description="Type of the audited entity"),
 *     @OA\Property(property="auditable_id", type="int", description="ID of the audited entity"),
 *     @OA\Property(property="old_values", type="string", nullable=true, description="Previous values"),
 *     @OA\Property(property="new_values", type="string", description="New values"),
 *     @OA\Property(property="url", type="string", nullable=true, description="URL where the event occurred"),
 *     @OA\Property(property="ip_address", type="string", nullable=true, description="IP address from where the request was made"),
 *     @OA\Property(property="user_agent", type="string", nullable=true, description="User agent from where the request was made"),
 *     @OA\Property(property="tags", type="string", nullable=true, description="Tags associated with the audit event"),
 *     @OA\Property(property="created_at", type="string", format="date-time", description="Creation timestamp"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", description="Update timestamp")
 * )
 */
class AuditResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'user_type' => $this->user_type,
            'user_id' => $this->user_id,
            'event' => $this->event,
            'auditable_type' => $this->auditable_type,
            'auditable_id' => $this->auditable_id,
            'old_values' => $this->old_values,
            'new_values' => $this->new_values,
            'url' => $this->url,
            'ip_address' => $this->ip_address,
            'user_agent' => $this->user_agent,
            'tags' => $this->tags,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
