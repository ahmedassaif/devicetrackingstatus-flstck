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
            if (oldValues !== "[]") {
                return (
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th colSpan={3}>{'{'}</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(JSON.parse(oldValues as string)).map((key: string, index: number) => (
                                    <tr key={index}>
                                        <td colSpan={3}>{' '}</td>
                                        <td>{key}</td>
                                        <td>:</td>
                                        <td>{JSON.parse(oldValues as string)[key]}</td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td colSpan={3}>{'}'}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                );
            }
            else
            {
                return () => "N/A";
            }
        },
    },
    {
        header: "New Values",
        accessorKey: "new_values",
        cell: ({ row }) => {
            const newValues = row.getValue("new_values");
            if (newValues !== "[]") {
                return (
                    <table>
                    <thead>
                        <tr>
                            <th colSpan={3}>{'{'}</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(JSON.parse(newValues as string)).map((key: string, index: number) => (
                                <tr key={index}>
                                    <td colSpan={3}></td>
                                    <td>{key}</td>
                                    <td>:</td>
                                    <td>{JSON.parse(newValues as string)[key]}</td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td colSpan={3}>{'}'}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                    </table>
                );
            }
            else
            {
                return () => "N/A";
            }
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