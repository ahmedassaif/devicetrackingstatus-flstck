export interface GetAuditsAudit {
    id: number; // bigserial
    userType?: string; // character varying(255)
    userId?: number; // bigint
    event: string; // character varying(255)
    auditableType: string; // character varying(255)
    auditableId: number; // bigint
    oldValues?: Record<string, any>; // text
    newValues?: Record<string, any>; // text
    url?: string; // text
    ipAddress?: string; // inet
    userAgent?: string; // character varying(1023)
    tags?: string; // character varying(255)
    createdAt?: string; // timestamp without time zone (ISO string)
    updatedAt?: string; // timestamp without time zone (ISO string)
}