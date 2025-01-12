/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditService } from "@/api/services/spesific-services/audit.service";
import AuditDetail from "../components/AuditDetail";
// export async function generateStaticParams() {
//     try {
//         const auditService = new AuditService();
//         console.log('AuditService created:', auditService);
//         const response = await auditService.getLookupAllAudits();
//         console.log('Response from getLookupAllAudits:', response);
    
//         if (response.error) {
//             return [];
//         }
    
//         if (Array.isArray(response.result)) {
//             const audits = response.result;
//             const paths = audits.items.map((audit) => ({
//             id: audit.id,
//             }));
//             return paths;
//         } else {
//             return [];
//         }
//     } catch (error) {
//         console.error("Error generating static params:", error);
//         return [];
//     }
// }

// export async function generateStaticParams() {
//     try {
//         // Replace with your API endpoint
//         const apiUrl = "http://127.0.0.1:8000/api/v1/getLookupAllAudits";

//         // Fetch data directly from the API
//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//             throw new Error(`Failed to fetch audits: ${response.statusText}`);
//         }

//         // Parse the response as JSON
//         const audits = await response.json();

//         // Log the response for debugging
//         console.log("API Response:", audits);

//         // Ensure the response is an array
//         if (Array.isArray(audits)) {
//             const paths = audits.map((audit) => ({
//                 id: audit.id.toString(), // Ensure the ID is a string
//             }));
//             console.log("Generated paths:", paths);
//             return paths;
//         } else {
//             console.error("Response is not an array:", audits);
//             return [];
//         }
//     } catch (error) {
//         console.error("Error generating static params:", error);
//         return [];
//     }
// }

interface Props {
    params: {
    id: number;
    }
}

export default async function Page({ params }: Props) {
    
    // // Validate ID
    // const auditId = Number(params.id);
    // if (isNaN(auditId)) {
    //     return <div>Invalid ID</div>;
    // }

    return <AuditDetail auditId={params.id} />;
}