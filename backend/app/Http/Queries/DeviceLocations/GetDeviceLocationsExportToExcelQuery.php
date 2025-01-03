<?php

namespace App\Http\Queries\DeviceLocations;

use App\Models\DeviceLocation;
use App\Http\Responses\FileResponse;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class GetDeviceLocationsExportToExcelQuery
{
    public function export()
    {
        try {
            $now = Carbon::now();

            // Fetch all DeviceLocation records where deleted_at is null
            $deviceLocations = DeviceLocation::query()
                            ->whereNull('DeviceLocation.deleted_at') // Ensure only non-deleted records are retrieved
                            ->orderByDesc('DeviceLocation.updated_at') // Order by Created in descending order
                            ;
                            
            // Check if the data is empty 
            if ($deviceLocations->isEmpty()) { 
                return response()->json(['error' => 'Main Location Table is Empty'], 400); 
            }

            $deviceLocations = $deviceLocations
                            ->join('DataUnit', 'DeviceLocation.DataUnitId', '=', 'DataUnit.id')
                            ->select(
                                'DeviceLocation.id',
                                'DeviceLocation.NameDeviceLocation',
                                'DeviceLocation.created_at as device_created_at',
                                'DeviceLocation.updated_at as device_updated_at',
                                'DataUnit.NameUnit',
                                )                
                            ->orderBy('DataUnit.NameUnit') // Order by NameUnit to group data in Excel
                            ->orderBy('NameDeviceLocation') // Then by NameDeviceLocation
                            ->get();


            // Create new Spreadsheet object
            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();
            $sheet->setTitle('DeviceLocation Data');

            // Set header
            $headers = [
                "No", "ID", "Lokasi Kerja", "Lokasi Perangkat", "Created At", "Updated At"
            ];

            $headerRow = 1;
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

            // Fill data
            foreach ($deviceLocations as $index => $item) {
                $rowIndex = $index + 2;
                $sheet->setCellValue("A{$rowIndex}", $index + 1);
                $sheet->setCellValue("B{$rowIndex}", $item->id ?? "");
                $sheet->setCellValue("C{$rowIndex}", $item->NameUnit ?? "");
                $sheet->setCellValue("D{$rowIndex}", $item->NameDeviceLocation ?? "");
                $sheet->setCellValue("E{$rowIndex}", $item->created_at ?? "");
                $sheet->setCellValue("F{$rowIndex}", $item->updated_at ?? "");
            }

            // Auto-fit columns
            foreach (range('A', $sheet->getHighestColumn()) as $columnID) {
                $sheet->getColumnDimension($columnID)->setAutoSize(true);
            }

            $writer = new Xlsx($spreadsheet);
            $fileName = "Data Lokasi Perangkat " . $now->format('Y-m-d_H-i-s') . ".xlsx";

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
