<?php
namespace App\Http\Queries\DetailedDeviceLocations;

use App\Models\DetailedDeviceLocation;
use App\Http\Responses\FileResponse;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;

class GetDetailedDeviceLocationsExportToExcelQuery{
    public function export(){
        
        try {
            
            $now = Carbon::now();

            // $detailedDeviceLocations = DetailedDeviceLocation::query()
            //                 ->whereNull('DetailedDeviceLocation.deleted_at') // Ensure only non-deleted records are retrieved
            //                 ->orderByDesc('DetailedDeviceLocation.updated_at') // Order by Created in descending order
            //                 ;
            
            // // Check if the data is empty
            // if($detailedDeviceLocations->isEmpty()){
            //     return response()->json([
            //         'message' => 'Detailed Device Location Table is Empty.'
            //     ], 400);
            // }

            // $detailedDeviceLocations = $detailedDeviceLocations->join('DeviceLocation', 'DetailedDeviceLocation.DeviceLocationId', '=', 'DeviceLocation.id')
            //     ->leftJoin('DataUnit', 'DeviceLocation.DataUnitId', '=', 'DataUnit.id')
            //     ->select(
            //         'DetailedDeviceLocation.id',
            //         'DetailedDeviceLocation.NameDetailLocation',
            //         'DetailedDeviceLocation.MainDetailLocation',
            //         'DetailedDeviceLocation.SubOfMainDetailLocation',
            //         'DetailedDeviceLocation.created_at as detailed_created_at',
            //         'DetailedDeviceLocation.updated_at as detailed_updated_at',
            //         'DeviceLocation.NameDeviceLocation',
            //         'DataUnit.NameUnit',
            //     )->orderBy('DataUnit.NameUnit') // Order by NameUnit to group data in Excel
            //     ->orderBy('NameDeviceLocation') // Then by NameDeviceLocation
            //     ->orderBy('NameDetailLocation') // Then by NameDetailLocation
            //     ->get();

            // Execute the query and get the results
            $detailedDeviceLocations = DetailedDeviceLocation::query()
                ->whereNull('DetailedDeviceLocation.deleted_at') // Ensure only non-deleted records are retrieved
                ->join('DeviceLocation', 'DetailedDeviceLocation.DeviceLocationId', '=', 'DeviceLocation.id')
                ->leftJoin('DataUnit', 'DeviceLocation.DataUnitId', '=', 'DataUnit.id')
                ->select(
                    'DetailedDeviceLocation.id',
                    'DetailedDeviceLocation.NameDetailLocation as NameDetailLocation',
                    'DetailedDeviceLocation.MainDetailLocation as MainDetailLocation',
                    'DetailedDeviceLocation.SubOfMainDetailLocation as SubOfMainDetailLocation',
                    'DetailedDeviceLocation.created_at as created_at',
                    'DetailedDeviceLocation.updated_at as updated_at',
                    'DeviceLocation.NameDeviceLocation as NameDeviceLocation',
                    'DataUnit.NameUnit as NameUnit',
                )
                ->orderBy('DataUnit.NameUnit') // Order by NameUnit to group data in Excel
                // ->orderBy('DeviceLocation.NameDeviceLocation') // Then by NameDeviceLocation
                // ->orderBy('DetailedDeviceLocation.NameDetailLocation') // Then by NameDetailLocation
                ->get();

            // Check if the data is empty
            if ($detailedDeviceLocations->isEmpty()) {
                return response()->json([
                    'message' => 'Detailed Device Location Table is Empty.'
                ], 400);
            }
            
            // Create new Spreadsheet object
            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();
            $sheet->setTitle('Data Detail Lokasi Perangkat');

            $sheet->setCellValue('A1', 'Detail Lokasi Perangkat');
            $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(16);
            $sheet->mergeCells('A1:I1');
            $sheet->getStyle('A1')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
            $sheet->getStyle('A1')->getAlignment()->setVertical(Alignment::VERTICAL_CENTER);
            
            $sheet->setCellValue('A3', 'Generated at: ' . $now);
            $sheet->getStyle('A3')->getFont()->setBold(true)->setSize(12);
            $sheet->mergeCells('A3:D3');
            $sheet->getStyle('A3')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);

            // Set header
            $headers = [
                "No", "ID", "Lokasi Kerja", "Lokasi Perangkat", "Detail Lokasi Perangkat", "Main", "Sub", "Created At", "Updated At"
            ]; 

            $headerRow = 5;
            foreach ($headers as $index => $header) {
                $column = chr(65 + $index); // Convert index to column letter (A, B, C, etc.)
                $sheet->setCellValue("{$column}{$headerRow}", $header);
                $sheet->getStyle("{$column}{$headerRow}")
                    ->getFont()
                    ->setBold(true);
                $sheet->getStyle("{$column}{$headerRow}")
                    ->getAlignment()
                    ->setHorizontal(Alignment::HORIZONTAL_CENTER);
            }

            Log::info('Detailed Device Locations:', $detailedDeviceLocations->toArray());
            // Fill data
            foreach ($detailedDeviceLocations as $index => $item) {
                $rowIndex = $index + 6;
                $sheet->setCellValue("A{$rowIndex}", $index + 1);
                $sheet->setCellValue("B{$rowIndex}", $item->id ?? "");
                $sheet->setCellValue("C{$rowIndex}", $item->NameUnit ?? "");
                $sheet->setCellValue("D{$rowIndex}", $item->NameDeviceLocation ?? "");
                $sheet->setCellValue("E{$rowIndex}", $item->NameDetailLocation ?? "");
                $sheet->setCellValue("F{$rowIndex}", $item->MainDetailLocation ?? "");
                $sheet->setCellValue("G{$rowIndex}", $item->SubOfMainDetailLocation ?? "");
                $sheet->setCellValue("H{$rowIndex}", $item->created_at ?? "");
                $sheet->setCellValue("I{$rowIndex}", $item->updated_at ?? "");

                // Apply alignment for all cells in the row 
                foreach (range('A', 'I') as $column) { 
                    $sheet->getStyle("{$column}{$rowIndex}")->getAlignment() 
                            ->setHorizontal(Alignment::HORIZONTAL_LEFT) 
                            ->setVertical(Alignment::VERTICAL_CENTER); 
                }
            }

            // Get the number of data rows
            $rowCount = count($detailedDeviceLocations) + 5; // +4 for starting from row 5

            // Apply outside border for each column from A to N
            $columns = range('A', 'I');

            foreach ($columns as $column) {
                $cellRange = "{$column}6:{$column}{$rowCount}";
                $sheet->getStyle($cellRange)->getBorders()->getOutline()->setBorderStyle(Border::BORDER_THIN);
            }

            $sheet->getColumnDimension('A')->setWidth(4);

            // Auto-fit columns
            foreach (range('B', 'I') as $columnID) {
                $sheet->getColumnDimension($columnID)->setAutoSize(true);
            }

            $writer = new Xlsx($spreadsheet);
            $fileName = "Data Detail Lokasi Perangkat " . $now->format('Y-m-d_H-i-s') . ".xlsx";

            // Save to memory
            $stream = fopen('php://memory', 'w+');
            $writer->save($stream);
            rewind($stream);

            // Get file content
            $fileBytes = stream_get_contents($stream);
            fclose($stream);

            return new FileResponse($fileBytes, $fileName);
            
        } catch (\Exception $e) {
            // Handle the exception as needed
            logger()->error('Error while exporting DeviceLocationData to Excel', ['exception' => $e]);
            throw $e;
        }   
        
    }
}