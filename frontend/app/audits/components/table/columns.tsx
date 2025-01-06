/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
 
import { GetAuditsAudit } from "@/api/services/types/audit.types";
import { ColumnDef } from "@tanstack/react-table";

const formatJson = (jsonString: string) => {
    try {
        // Parse the JSON string into an object
        const jsonObject = JSON.parse(jsonString);
    
        // Convert the object back to a JSON string with indentation
        const formattedJson = JSON.stringify(jsonObject, null, 2)
            .replace(/"/g, "'") // Replace double quotes with single quotes
            .replace(/\\/g, ""); // Remove escape characters
    
        // Add a tab space at the beginning of each line (except the first and last lines)
        const lines = formattedJson.split("\n");
        const formattedLines = lines.map((line, index) => {
            if (index === 0 || index === lines.length - 1) {
            return line; // Skip the first and last lines
            }
            return `\t${line}`; // Add a tab space to the beginning of the line
        });
    
        return formattedLines.join("\n"); // Join the lines back together
    } catch (error) {
        console.error("Error formatting JSON:", error);
        return jsonString; // Return the original string if parsing fails
    }
};

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
                <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    {formatJson(String(oldValues))}
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
                    {formatJson(String(newValues))}
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