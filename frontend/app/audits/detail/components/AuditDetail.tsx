"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { AuditService } from "@/api/services/spesific-services/audit.service";
import { GetAuditsAudit } from "@/api/services/types/audit.types";
import { ResponseResult } from "@/api/services/types/commonResponses.types";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import Image from "next/image";
import loadingBackground from "@/public/images/beams.jpg";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const prettifyJson = (jsonString: string) => {
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

interface AuditDetailProps {
    auditId: string; // Accept auditId as a prop
}

const AuditDetail: React.FC<AuditDetailProps> = ({ auditId }) => {
    const [audit, setAudit] = useState<GetAuditsAudit | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
  
    const router = useRouter();
  
    useEffect(() => {
      const fetchAuditDetail = async () => {
        setLoading(true);
  
        if (!auditId) {
          toast.error("Failed", {
            description: "Audit ID is missing",
            });
          
          return;
        }
        
        try {
          
          const auditService = new AuditService();
          const response: ResponseResult<GetAuditsAudit> = await auditService.getAudit(Number(auditId));
          if (response.result) {
            setAudit(response.result);
          } else {
            toast.error("Failed", {
              description: response.error?.detail || "Failed to fetch Audit detail",
          });
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Failed to handle delete DataUnit";
          toast.error("Failed", {
              description: errorMessage,
          });
      } finally {
          setLoading(false);
        }
      };
  
      fetchAuditDetail();
    }, [auditId]);
  
    if (loading) {
      return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
                    <Image
                        // eslint-disable-next-line @typescript-eslint/no-require-imports
                        src={loadingBackground}
                        alt="Loading Screen"
                        fill
                        className="h-full w-full rounded-md object-cover"                        
                    />
                    <div className="relative px-6 pb-8 pt-10 shadow-xl sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
                        <div className="mx-auto max-w-md">
                            <Button disabled>
                                <RotateCw size="sm" className="animate-spin" />
                                <span className="pl-3">Loading...</span>
                            </Button>
                        </div>
                    </div>
                </div>
      );
    }
  
    const getDateLabel = () => {
      if (audit?.event.trim().toLowerCase().includes('create')) {
        return audit.created_at
          ? new Date(audit.created_at).toLocaleString()
          : 'N/A';
      } else if (audit?.event.trim().toLowerCase().includes('update')) {
        return audit.updated_at
          ? new Date(audit.updated_at).toLocaleString()
          : 'N/A';
      }
      return 'N/A';
    };
  
      function handleBackClick(): void {
        router.push(`/audits`); 
      }
  
    return (
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">{`${audit?.event} ${audit?.auditable_type}`}</h1>
          <p className="text-gray-600">
            On {getDateLabel()}
          </p>
        </div>
  
        <section className="flex items-center justify-center py-4">
          <div className="mx-auto w-full">
            {/* <div className="relative bg-white shadow-md sm:rounded-lg dark:bg-gray-800">
              
            </div> */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded bg-gray-100 p-4 shadow">
                  <h2 className="font-bold">Table Name</h2>
                  <p>{audit?.auditable_type || 'N/A'}</p>
                </div>
                <div className="rounded bg-gray-100 p-4 shadow">
                  <h2 className="font-bold">Entity ID</h2>
                  <p>{audit?.auditable_id || 'N/A'}</p>
                </div>
                <div className="rounded bg-gray-100 p-4 shadow">
                  <h2 className="font-bold">Action Name</h2>
                  <p>{audit?.event || 'N/A'}</p>
                </div>
                <div className="rounded bg-gray-100 p-4 shadow">
                  <h2 className="font-bold">Client Application ID</h2>
                  <p>{audit?.user_id || 'N/A'}</p>
                </div><div className="rounded bg-gray-100 p-4 shadow">
                  <h2 className="font-bold">Client Application Name</h2>
                  <p>{audit?.user_type || 'N/A'}</p>
                </div>
                <div className="rounded bg-gray-100 p-4 shadow">
                  <h2 className="font-bold">From IP Address</h2>
                  <p>{audit?.ip_address || 'N/A'}</p>
                </div>
                <div className="rounded bg-gray-100 p-4 shadow">
                  <h2 className="font-bold">Old Values</h2>
                  <pre className="whitespace-pre-wrap font-mono">
                  {audit?.old_values ? prettifyJson(JSON.stringify(audit?.old_values)) : 'N/A'}
                  </pre>
                </div>
                <div className="rounded bg-gray-100 p-4 shadow">
                  <h2 className="font-bold">New Values</h2>
                  <pre className="whitespace-pre-wrap font-mono">
                  {audit?.new_values ? prettifyJson(JSON.stringify(audit?.new_values)) : 'N/A'}
                  </pre>
                </div>
              </div>
          </div>
        </section>
  
        
        <div className='pt-2'>
        <button
          type="button" 
          onClick={() => handleBackClick()}
          className="mb-2 me-2 rounded-lg border border-gray-800 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-800"
        >Back</button>
        </div>
      </div>
    );
  };
  
  export default AuditDetail;