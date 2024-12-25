/* eslint-disable prettier/prettier */
import { Response } from "../types/commonResponses.types";

export namespace ApiEndpoint {
  export namespace V1 {
    export const Audits = {
      Segment: "v1/audits",
    };
    export const Audit = {
      Segment: "v1/audit",
    };
    export const ExportToExcel = {
      Segment: "v1/exportAuditsToExcel",
    };
  }
}

export interface GetAuditsAudit extends Response{
    id: number;
    user_type?: string; // character varying(255)
    user_id?: number; // bigint
    event: string; // character varying(255)
    auditable_type: string; // character varying(255)
    auditable_id: number; // bigint
    old_values?: Record<string, any>; // text
    new_values?: Record<string, any>; // text
    url?: string; // text
    ip_address?: string; // inet
    user_agent?: string; // character varying(1023)
    tags?: string; // character varying(255)
    created_at?: Date; // timestamp without time zone (ISO string)
    updated_at?: Date; // timestamp without time zone (ISO string)
}
