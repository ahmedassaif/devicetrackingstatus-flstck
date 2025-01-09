import { AuditService } from "@/api/services/spesific-services/audit.service";
import AuditDetail from "../components/AuditDetail";
export async function generateStaticParams() { 
    const auditService = new AuditService();
    const response = await auditService.getLookupAllAudits();
    const audits = response.result;

    if (!audits?.items) { 
        return []; 
    }
    else { 
        const paths = audits.items.map((audit) => ({ 
            id: audit.id, 
        })); 
    
        return paths;
    }
}
interface Props {
    params: {
    id: string;
    }
}

export default async function AuditDetailPage({ params }: Props) {
    
    // Validate ID
    const auditId = Number(params.id);
    if (isNaN(auditId)) {
        return <div>Invalid ID</div>;
    }

    return <AuditDetail auditId={params.id} />;
}