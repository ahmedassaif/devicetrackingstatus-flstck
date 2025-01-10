import { AuditService } from "@/api/services/spesific-services/audit.service";
import AuditDetail from "../components/AuditDetail";
export async function generateStaticParams() {
    try {
        const auditService = new AuditService();
        console.log('AuditService created:', auditService);
        const response = await auditService.getLookupAllAudits();
        console.log('Response from getLookupAllAudits:', response);
    
        if (response.error) {
            return [];
        }
    
        if (Array.isArray(response.result)) {
            const audits = response.result;
            const paths = audits.items.map((audit) => ({
            id: audit.id,
            }));
            return paths;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}
interface Props {
    params: {
    id: number;
    }
}

export default async function AuditDetailPage({ params }: Props) {
    
    // // Validate ID
    // const auditId = Number(params.id);
    // if (isNaN(auditId)) {
    //     return <div>Invalid ID</div>;
    // }

    return <AuditDetail auditId={params.id} />;
}