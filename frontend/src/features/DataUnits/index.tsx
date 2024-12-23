import React from 'react';
import DataUnitList from './components/DataUnitList'; // Adjust the path as needed
import { Button } from 'flowbite-react';
import { FaPlusCircle } from "react-icons/fa";

const DataUnits : React.FC = () =>{
  return (
    <div className="flex h-full flex-col">

        <h1 className="mb-4 text-2xl font-bold">Tabel Lokasi Kerja</h1>
        <Button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700" onClick={() => window.location.href = '/DataUnit/Form'}>
            <FaPlusCircle />
            Tambah Lokasi Kerja
        </Button>
        <DataUnitList />
    </div>    
  );
};

export default DataUnits;