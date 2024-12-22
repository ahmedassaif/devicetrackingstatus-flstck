import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ResponseResult } from '../../../services/Responses/ResponseResult';
import { GetDataUnitsDataUnit } from '../../../services/DataUnits/Requests/GetDataUnitsDataUnit';
import DataUnitService from '../../../services/DataUnits/DataUnitService';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Label, Spinner, TextInput } from 'flowbite-react';
import { DataUnitDto } from '../../../services/DataUnits/Requests/DataUnitDto';

const DataUnitForm: React.FC = () => {  
  const { DataUnitId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState<DataUnitDto>({ 
    id: '',
    NameUnit: '',
    Plant: ''});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataUnitDetail = async () => {
      setLoading(true);
      setError(null);

      if (!DataUnitId) {
        setModel({
          id: '',
          NameUnit: '',
          Plant: ''
        });

        setLoading(false);
        return;
      }
      else {
        try {
        
          const dataUnitService = new DataUnitService();
          const response: ResponseResult<GetDataUnitsDataUnit> = await dataUnitService.getDataUnit(String(DataUnitId));
          if (response.result) {
            setModel(response.result);
          } else {
            setError(response.error?.detail || 'Failed to fetch DataUnit details.');
          }
        } catch (err: any) {
          setError(err.message || 'An unexpected error occurred.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDataUnitDetail();
  }, [DataUnitId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
          <Button>
            <Spinner size="sm" />
            <span className="pl-3">Loading...</span>
          </Button>
      </div>
    );
  }
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!model) return <p>No DataUnit details available.</p>;

//   const getDateLabel = () => {
//     if (DataUnit.event.trim().toLowerCase().includes('create')) {
//       return DataUnit.created_at
//         ? new Date(DataUnit.created_at).toLocaleString()
//         : 'N/A';
//     } else if (DataUnit.event.trim().toLowerCase().includes('update')) {
//       return DataUnit.updated_at
//         ? new Date(DataUnit.updated_at).toLocaleString()
//         : 'N/A';
//     }
//     return 'N/A';
//   };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
      const { name, value } = e.target; 
      setModel((prevModel) => ({ 
        ...prevModel, 
        [name]: value 
      })); 
    };

    function backToIndex(): void {
        navigate(`/DataUnits`); 
    }

    const saveData = () => {
      // Your save logic here
  };


  return (
    <div className="container mx-auto p-4">
      <section className="flex items-center bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="relative bg-white shadow-md sm:rounded-lg dark:bg-gray-800">
            <Card className="max-w-sm">
            <form className="flex flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="nameUnit1" value="Lokasi Kerja" />
                </div>
                  <TextInput
                                name="NameUnit"
                                value={model.NameUnit}
                                onChange={handleInputChange}
                                required
                                placeholder="Nama Unit"
                            />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="plant1" value="Kode Plant" />
                  </div>
                    <TextInput
                                type="string"
                                name="Plant"
                                value={String(model.Plant || '')}
                                onChange={handleInputChange}
                                placeholder="Kode Plant"
                            />
                </div>
                <div className="mt-4 flex space-x-3 lg:mt-6">
                  <Button onClick={saveData} className="inline-flex items-center rounded-lg bg-green-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        Save
                  </Button>
                  <Button onClick={backToIndex} className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                        Back
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>

      
      {/* <div className='pt-2'>
        <button
          type="button" 
          onClick={() => handleBackClick()}
          className="mb-2 me-2 rounded-lg border border-gray-800 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-800"
        >Back</button>
      </div> */}
    </div>
  );
};

export default DataUnitForm;
