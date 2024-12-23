import React from 'react';
import DataUnitList from './components/DataUnitList'; // Adjust the path as needed
import { Button } from 'flowbite-react';
import { FaPlusCircle } from "react-icons/fa";

const DataUnits : React.FC = () =>{
  return (
    <div className="flex h-full flex-col">

        <h1 className="mb-4 text-2xl font-bold">Tabel Lokasi Kerja</h1>
        <Button className="flex w-fit rounded bg-blue-500 px-6 py-2 my-6 font-bold text-white hover:bg-blue-700" onClick={() => window.location.href = '/DataUnit/Form'}>
          <div className="flex items-center">
            <FaPlusCircle size={18} className="mr-2" />
            Tambah Lokasi Kerja
          </div>
        </Button>
        <DataUnitList />
    </div>    
  );
};

export default DataUnits;