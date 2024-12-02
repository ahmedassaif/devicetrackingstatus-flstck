<?php

namespace App\Shared\Models\Audits\Queries\GetAudit;
use App\Shared\Common\Responses\Response;

class GetAuditResponse extends Response
{
    public int $id; // Corresponds to SERIAL NOT NULL
    public ?string $user_type; // Corresponds to varchar(255)
    public ?int $user_id; // Corresponds to bigint
    public string $event; // Corresponds to varchar(255) NOT NULL
    public string $auditable_type; // Corresponds to varchar(255) NOT NULL
    public int $auditable_id; // Corresponds to bigint NOT NULL
    public ?string $old_values; // Corresponds to text
    public ?string $new_values; // Corresponds to text
    public ?string $url; // Corresponds to text
    public ?string $ip_address; // Corresponds to inet
    public ?string $user_agent; // Corresponds to varchar(1023)
    public ?string $tags; // Corresponds to varchar(255)
    public \DateTime $created_at; // Corresponds to timestamp without time zone
    public \DateTime $updated_at; // Corresponds to timestamp without time zone

    public function __construct(
        int $id,
        ?string $user_type,
        ?int $user_id,
        string $event,
        string $auditable_type,
        int $auditable_id,
        ?string $old_values,
        ?string $new_values,
        ?string $url,
        ?string $ip_address,
        ?string $user_agent,
        ?string $tags,
        \DateTime $created_at,
        \DateTime $updated_at
    ) {
        parent::__construct();
        $this->id = $id;
        $this->user_type = $user_type;
        $this->user_id = $user_id;
        $this->event = $event;
        $this->auditable_type = $auditable_type;
        $this->auditable_id = $auditable_id;
        $this->old_values = $old_values;
        $this->new_values = $new_values;
        $this->url = $url;
        $this->ip_address = $ip_address;
        $this->user_agent = $user_agent;
        $this->tags = $tags;
        $this->created_at = $created_at;
        $this->updated_at = $updated_at;
    }
}