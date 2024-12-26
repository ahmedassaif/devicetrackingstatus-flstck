import { GetAuditsAudit } from "@/api/services/types/audit.types";
import { DataTable } from "./data-table";
import { columns } from "./columns";

async function getData(): Promise<GetAuditsAudit[]> {
	return [
        {
            id: 1,
            user_type: "Admin",
            user_id: 1,
            event: "Create",
            auditable_type: "User",
            auditable_id: 1,
            old_values: undefined,
            new_values: undefined,
            url: "www.facebook.com",
            ip_address: "192.168.1.1",
            user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
            tags: "Admin",
            created_at: new Date(),
            updated_at: new Date(),
            timestamp: new Date()
        }
    ];
}

export default async function AuditList() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}