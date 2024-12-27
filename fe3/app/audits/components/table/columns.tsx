"use client"
 
import { GetAuditsAudit } from "@/api/services/types/audit.types";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { View, SquarePen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<GetAuditsAudit>[] = [
    {
        header: "Action",
        cell: ({ row }) => {
            const audit = row.original;
            return (
                <div className="flex space-x-2">
                    <Button
                        onClick={() => handleDetail(audit.id)}
                        variant="outline"
                        title="View details"
                    >
                        <View />
                    </Button>
                    {/* <Button
                        onClick={() => handleEdit(audit.id)}
                        variant="outline"
                        title="Edit"
                    >
                        <SquarePen />
                    </Button>
                    <Button
                        onClick={() => handleDelete(audit.id)}
                        variant="destructive"
                        title="Edit"
                    >
                        <Trash2 />
                    </Button> */}
                </div>
            );
        },
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
                    {oldValues ? (
                        <pre>{JSON.stringify(oldValues, null, 2)}</pre>
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
                    {newValues ? (
                        <pre>{JSON.stringify(newValues, null, 2)}</pre>
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
function handleDetail(id: number): void {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    router.push(`/audits/detail/${id}`);
}
// function handleEdit(id: string): void {
//     console.log("Edit row with ID:", id);
// }
// function handleDelete(id: number): void {
//     console.log("Delete row with ID:", id);
// }

