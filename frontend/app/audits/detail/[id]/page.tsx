import AuditDetail from "../components/AuditDetail";

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