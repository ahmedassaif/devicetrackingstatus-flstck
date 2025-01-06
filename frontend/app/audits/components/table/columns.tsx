/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
 
import { GetAuditsAudit } from "@/api/services/types/audit.types";
import { ColumnDef } from "@tanstack/react-table";
import styles from "./columns.module.css";

export const columns: ColumnDef<GetAuditsAudit>[] = [
    {
        header: "Actions",
    },
    {
        header: "User  Type",
        accessorKey: "user_type",
        cell: ({ row }) => row.getValue("user_type") || "N/A",
    },
    {
        header: "User  ID",
        accessorKey: "user_id",
        cell: ({ row }) => row.getValue("user_id") || "N/A",
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
        cell: ({ row }) => {
          const oldValues = row.getValue("old_values");
          return (
            <div>
              {oldValues && oldValues !== "[]" ? (
                <pre className={styles.preWrapper}>
                    <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    {JSON.stringify(oldValues, null, 2)
                        .replace(/"/g, "'") // Replace double quotes with single quotes
                        .replace(/\\/g, "") // Remove escape characters
                    }
                    </pre>
                </pre>
              ) : (
                "N/A"
              )}
            </div>
          );
        },
      },
      {
        header: "New Values",
        accessorKey: "new_values",
        cell: ({ row }) => {
          const newValues = row.getValue("new_values");
          return (
            <div>
              {newValues && newValues !== "[]" ? (
                <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                  {JSON.stringify(newValues, null, 2)
                    .replace(/"/g, "'") // Replace double quotes with single quotes
                    .replace(/\\/g, "") // Remove escape characters
                  }
                </pre>
              ) : (
                "N/A"
              )}
            </div>
          );
        },
    },
    {
        header: "URL",
        accessorKey: "url",
        cell: ({ row }) => row.getValue("url") || "N/A",
    },
    {
        header: "IP Address",
        accessorKey: "ip_address",
        cell: ({ row }) => row.getValue("ip_address") || "N/A",
    },
    {
        header: "Tags",
        accessorKey: "tags",
        cell: ({ row }) => row.getValue("tags") || "N/A",
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