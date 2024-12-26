"use client"
 
import { GetAuditsAudit } from "@/api/services/types/audit.types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<GetAuditsAudit>[] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "User Type",
        accessorKey: "user_type",
    },
    {
        header: "User ID",
        accessorKey: "user_id",
    },
    {
        header: "Event",
        accessorKey: "event",
    },
    {
        header: "Auditable Type",
        accessorKey: "auditable_type",
    },
    {
        header: "Auditable ID",
        accessorKey: "auditable_id",
    },
    {
        header: "Old Values",
        accessorKey: "old_values",
    },
    {
        header: "New Values",
        accessorKey: "new_values",
    },
    {
        header: "URL",
        accessorKey: "url",
    },
    {
        header: "IP Address",
        accessorKey: "ip_address",
    },
    {
        header: "User Agent",
        accessorKey: "user_agent",
    },
    {
        header: "Tags",
        accessorKey: "tags",
    },
    {
        header: "Created At",
        accessorKey: "created_at",
    },
    {
        header: "Updated At",
        accessorKey: "updated_at",
    },
];