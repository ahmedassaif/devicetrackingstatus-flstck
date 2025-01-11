<?php

namespace App\Http\Queries\DataUnits;

use App\Models\DataUnit;
use App\Http\Responses\FileResponse;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;

class GetDataUnitsExportToExcelQuery
{
    public function export()
    {
        try {
            $now = Carbon::now();

            // Fetch all DataUnit records where deleted_at is null
            $data = DataUnit::whereNull('deleted_at')->orderBy('updated_at', 'desc')->get();

            // Check if the data is empty 
            if ($data->isEmpty()) { 
                return response()->json([
                    'message' => 'DataUnit Table is Empty.'
                ], 400); 
            }

            // Create new Spreadsheet object
            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();
            $sheet->setTitle('Lokasi Kerja');

            $sheet->setCellValue('A1', 'Lokasi Kerja');
            $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(16);
            $sheet->mergeCells('A1:F1');
            $sheet->getStyle('A1')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
            $sheet->getStyle('A1')->getAlignment()->setVertical(Alignment::VERTICAL_CENTER);
            
            $sheet->setCellValue('A3', 'Generated at: ' . $now);
            $sheet->getStyle('A3')->getFont()->setBold(true)->setSize(12);
            $sheet->mergeCells('A3:D3');
            $sheet->getStyle('A3')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);

            // Set header
            $headers = [
                "No", "ID", "Name Unit", "Plan", "Created At", "Updated At"
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
                $sheet->getStyle("{$column}{$headerRow}")
                    ->getBorders()
                    ->getAllBorders()
                    ->setBorderStyle(Border::BORDER_MEDIUM);
            }

            // Fill data
            foreach ($data as $index => $item) {
                $rowIndex = $index + 6;
                $sheet->setCellValue("A{$rowIndex}", $index + 1);
                $sheet->setCellValue("B{$rowIndex}", $item->id ?? "");
                $sheet->setCellValue("C{$rowIndex}", $item->NameUnit ?? "");
                $sheet->setCellValue("D{$rowIndex}", $item->Plan ?? "");
                $sheet->setCellValue("E{$rowIndex}", $item->created_at ?? "");
                $sheet->setCellValue("F{$rowIndex}", $item->updated_at ?? "");

                // Apply alignment for all cells in the row 
                foreach (range('A', 'F') as $column) { 
                    $sheet->getStyle("{$column}{$rowIndex}")->getAlignment() 
                            ->setHorizontal(Alignment::HORIZONTAL_LEFT) 
                            ->setVertical(Alignment::VERTICAL_CENTER); 
                }
            }

            // Get the number of data rows
            $rowCount = count($data) + 5; // +4 for starting from row 5

            // Apply outside border for each column from A to N
            $columns = range('A', 'F');

            foreach ($columns as $column) {
                $cellRange = "{$column}6:{$column}{$rowCount}";
                $sheet->getStyle($cellRange)->getBorders()->getOutline()->setBorderStyle(Border::BORDER_THIN);
            }

            $sheet->getColumnDimension('A')->setWidth(4);

            // Auto-fit columns
            foreach (range('B', 'F') as $columnID) {
                $sheet->getColumnDimension($columnID)->setAutoSize(true);
            }

            $writer = new Xlsx($spreadsheet);
            $fileName = "Data Lokasi Kerja " . $now->format('Y-m-d_H-i-s') . ".xlsx";

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
            logger()->error('Error while exporting DataUnitData to Excel', ['exception' => $e]);
            throw $e;
        }
    }
}
