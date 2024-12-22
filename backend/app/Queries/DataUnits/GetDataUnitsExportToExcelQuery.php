<?php

namespace App\Queries\DataUnits;

use App\Models\DataUnit;
use App\Http\Responses\FileResponse;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class GetDataUnitsExportToExcelQuery
{
    public function export()
    {
        try {
            $now = Carbon::now();

            // Fetch all DataUnit records where deleted_at is null
            $data = DataUnit::whereNull('deleted_at')->orderBy('created_at', 'desc')->get();

            // Create new Spreadsheet object
            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();
            $sheet->setTitle('DataUnit Data');

            // Set header
            $headers = [
                "No", "ID", "Name Unit", "Plan", "Created At", "Updated At"
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
            foreach ($data as $index => $item) {
                $rowIndex = $index + 2;
                $sheet->setCellValue("A{$rowIndex}", $index + 1);
                $sheet->setCellValue("B{$rowIndex}", $item->id ?? "");
                $sheet->setCellValue("C{$rowIndex}", $item->NameUnit ?? "");
                $sheet->setCellValue("D{$rowIndex}", $item->Plan ?? "");
                $sheet->setCellValue("E{$rowIndex}", $item->created_at ?? "");
                $sheet->setCellValue("F{$rowIndex}", $item->updated_at ?? "");
            }

            // Auto-fit columns
            foreach (range('A', $sheet->getHighestColumn()) as $columnID) {
                $sheet->getColumnDimension($columnID)->setAutoSize(true);
            }

            $writer = new Xlsx($spreadsheet);
            $fileName = "DataUnitData_" . $now->format('Y-m-d_H-i-s') . ".xlsx";

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
