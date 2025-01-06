/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { GetAuditsAudit } from "@/api/services/types/audit.types"
import { ColumnDef } from "@tanstack/react-table"

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
            const formattedValues = oldValues && oldValues !== "[]" 
            ? JSON.parse(oldValues as string).map((item: { key: string; value: string }, index: number) => (
                <tr key={index}>
                    <td>{item.key}</td>
                    <td>{item.value}</td>
                </tr>
                ))
            : <tr><td colSpan={2}>N/A</td></tr>;
            return (
            <table>
                <thead>
                <tr>
                    <th>Key</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                    {formattedValues}
                </tbody>
            </table>
            );
        },
    },
    {
        header: "New Values",
        accessorKey: "new_values",
        cell: ({ row }) => {
            const oldValues = row.getValue("new_values");
            const formattedValues = oldValues && oldValues !== "[]" 
            ? JSON.parse(oldValues as string).map((item: { key: string; value: string }, index: number) => (
                <tr key={index}>
                    <td>{item.key}</td>
                    <td>{item.value}</td>
                </tr>
                ))
            : <tr><td colSpan={2}>N/A</td></tr>;
            return (
            <table>
                <thead>
                <tr>
                    <th>Key</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                    {formattedValues}
                </tbody>
            </table>
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