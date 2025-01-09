// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client"

// import { useEffect, useState } from 'react';
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { DeviceLocationService } from '@/api/services/spesific-services/deviceLocation.service';
// import { GetDeviceLocationsDeviceLocation, UpdateDeviceLocationRequest, deviceLocationFormSchema, emptyDeviceLocation } from '@/api/services/types/deviceLocation.types';
// import { ResponseResult } from '@/api/services/types/commonResponses.types';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { useRouter } from 'next/navigation';
// import { toast } from "sonner";
// import { RotateCw } from 'lucide-react';
// import loadingBackground from "@/public/images/beams.jpg";
// import Image from "next/image";
// import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
// import { DataUnitSelect } from "@/components/selectors/dataunit.selector";

// interface Props {
//   params: {
//     id: string;
//   }
// }

// export default function DeviceLocationEditPage({ params }: Props) {
//   const [loading, setLoading] = useState<boolean>(true);
//   const router = useRouter();
//   const form = useForm({
//     resolver: zodResolver(deviceLocationFormSchema),
//     defaultValues: emptyDeviceLocation,
//   });

//   useEffect(() => {
//     const fetchDeviceLocationDetail = async () => {
//       if (!params.id) return;
      
//       try {
//         const deviceLocationService = new DeviceLocationService();
//         const response: ResponseResult<GetDeviceLocationsDeviceLocation> = 
//           await deviceLocationService.getDeviceLocation(params.id);

//         if (response.result) {
//           form.reset({
//             NameDeviceLocation: response.result.NameDeviceLocation,
//             DataUnitId: response.result.DataUnitId
//           });
//         } else {
//           toast.error("Failed", {
//             description: response.error?.detail || "Failed to fetch DeviceLocation detail",
//           });
//         }
//       } catch (error: unknown) { 
//         const errorMessage = error instanceof Error ? error.message : "Failed to fetch DeviceLocation details";
//         toast.error("Failed", {
//           description: errorMessage,
//         });
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchDeviceLocationDetail();
//   }, [params.id, form]); 

//   const saveData = async (values: z.infer<typeof deviceLocationFormSchema>) => {
//     setLoading(true);

//     try {
//       const deviceLocationService = new DeviceLocationService();
//       const updateDeviceLocationRequest = new UpdateDeviceLocationRequest(
//         params.id,
//         values.NameDeviceLocation,
//         values.DataUnitId
//       );

//       const response: ResponseResult<GetDeviceLocationsDeviceLocation> = 
//         await deviceLocationService.updateDeviceLocation(updateDeviceLocationRequest);

//       if (response.result) {
//         toast.success("Success", {
//           description: "Data Lokasi Kerja berhasil diubah!",
//         });
//         router.push(`/devicelocations/form/${response.result.id}`);
//       } else {
//         const errorText = response?.error?.detail || "Failed to Update DeviceLocations";
//         toast.error("Failed", {
//           description: errorText,
//         });
//       }
//     } catch (error: unknown) { 
//       const errorMessage = error instanceof Error ? error.message : "Failed to update DeviceLocations";
//       toast.error("Failed", {
//         description: errorMessage,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
//         <Image
//           src={loadingBackground}
//           alt="Loading Screen"
//           fill
//           className="h-full w-full rounded-md object-cover"                        
//         />
//         <div className="relative px-6 pb-8 pt-10 shadow-xl sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
//           <div className="mx-auto max-w-md">
//             <Button disabled>
//               <RotateCw size="sm" className="animate-spin" />
//               <span className="pl-3">Loading...</span>
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="mb-4 text-2xl font-bold">Edit Lokasi Kerja</h1>
//       <section className="flex w-full items-center">
//         <div className="w-full">
//           <Card className="p-6">
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(saveData)} className="flex flex-col gap-4">
//                 <FormField
//                   control={form.control}
//                   name="DataUnitId"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Lokasi Kerja</FormLabel>
//                       <FormControl>
//                         <DataUnitSelect onValueChange={field.onChange} value={field.value} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="NameDeviceLocation"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Kode Plan</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Lokasi Utama Perangkat" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <div className="flex space-x-3">
//                   <Button 
//                     type="submit" 
//                     className="bg-green-700 hover:bg-green-800"
//                   >
//                     Save
//                   </Button>
//                   <Button 
//                     type="button"
//                     variant="outline"
//                     onClick={() => router.push('/devicelocations')}
//                   >
//                     Back
//                   </Button>
//                 </div>
//               </form>
//             </Form>
//           </Card>
//         </div>
//       </section>
//     </div>
//   );
// }


/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeviceLocationService } from "@/api/services/spesific-services/deviceLocation.service";
import { GetStaticPaths, GetStaticProps } from 'next';
import DeviceLocationEditForm from "./Form";

export async function generateStaticParams() { 
    const deviceLocationService = new DeviceLocationService(); 
    const response = await deviceLocationService.getLookupAllDeviceLocations();
    const deviceLocations = response.result;
    
    if (!deviceLocations?.items) { 
        return []; 
    }
    else { 
        const paths = deviceLocations.items.map((deviceLocation) => ({ 
            id: deviceLocation.id, 
        })); 
    
        return paths;
    }
};

interface Props {
  params: {
  id: string;
  }
}

export default async function DeviceLocationFormPage({ params }: Props) {
    
  // Validate ID
  const auditId = Number(params.id);
  if (isNaN(auditId)) {
      return <div>Invalid ID</div>;
  }

  return <DeviceLocationEditForm deviceLocationId={params.id} />;
}