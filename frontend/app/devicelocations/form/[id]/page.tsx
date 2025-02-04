/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeviceLocationService } from "@/api/services/spesific-services/deviceLocation.service";
import { GetStaticPaths, GetStaticProps } from 'next';
import DeviceLocationEditForm from "./Form";

// export async function generateStaticParams() { 
//     const deviceLocationService = new DeviceLocationService(); 
//     const response = await deviceLocationService.getLookupAllDeviceLocations();
//     const deviceLocations = response.result;
    
//     if (!deviceLocations?.items) { 
//         return []; 
//     }
//     else { 
//         const paths = deviceLocations.items.map((deviceLocation) => ({ 
//             id: deviceLocation.id, 
//         })); 
    
//         return paths;
//     }
// };

interface Props {
  params: {
  id: string;
  }
}

export default async function DeviceLocationFormPage({ params }: Props) {
    
  // // Validate ID
  // const deviceLocationId = String(params.id);
  // if (!deviceLocationId) {
  //     return <div>Invalid ID</div>;
  // }

  return <DeviceLocationEditForm deviceLocationId={params.id} />;
}