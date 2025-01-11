<?php

namespace App\Http\Queries\Audits;

use App\Models\Audit;
use App\Http\Responses\FileResponse;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\BorderStyle;

class GetAuditsExportToExcelQuery
{
    public function export()
    {
        try {
            $now = Carbon::now();

            $data = Audit::orderBy('updated_at', 'desc')->get();

            // Check if the data is empty 
            if ($data->isEmpty()) {
                return response()->json([
                    'message' => 'Audit Table is Empty.'
                ], 400); 
            }

            // Create new Spreadsheet object
            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();
            $sheet->setTitle('Audit Data');



            // Set header
            $headers = [
                "No", "User Type", "User ID", "Event", "Auditable Type", "Auditable ID", "Old Values", "New Values", "URL", "IP Address", "User Agent", "Tags", "Created At", "Updated At"
            ];

            $sheet->setCellValue('A1', 'Audit Data');
            $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(16);
            $sheet->mergeCells('A1:N1');
            $sheet->getStyle('A1')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
            $sheet->getStyle('A1')->getAlignment()->setVertical(Alignment::VERTICAL_CENTER);
            
            $sheet->setCellValue('A3', 'Generated at: ' . $now);
            $sheet->getStyle('A3')->getFont()->setBold(true)->setSize(12);
            $sheet->mergeCells('A3:D3');
            $sheet->getStyle('A3')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);

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

                // Set cell values
                $sheet->setCellValue("A{$rowIndex}", $index + 1);
                $sheet->setCellValue("B{$rowIndex}", $item->user_type ?? "");
                $sheet->setCellValue("C{$rowIndex}", $item->user_id ?? "");
                $sheet->setCellValue("D{$rowIndex}", $item->event ?? "");
                $sheet->setCellValue("E{$rowIndex}", $item->auditable_type ?? "");
                $sheet->setCellValue("F{$rowIndex}", $item->auditable_id ?? "");
                // $sheet->setCellValue("G{$rowIndex}", $item->old_values ?? "");
                // $sheet->setCellValue("H{$rowIndex}", $item->new_values ?? "");
                // Format and set old_values
                $oldValues = $item->old_values ? json_encode(json_decode($item->old_values), JSON_PRETTY_PRINT) : "";
                $sheet->setCellValue("G{$rowIndex}", $oldValues);
                $sheet->getStyle("G{$rowIndex}")->getAlignment()->setWrapText(true)
                        ->setHorizontal(Alignment::HORIZONTAL_LEFT)
                        ->setVertical(Alignment::VERTICAL_CENTER);

                // Format and set new_values
                $newValues = $item->new_values ? json_encode(json_decode($item->new_values), JSON_PRETTY_PRINT) : "";
                $sheet->setCellValue("H{$rowIndex}", $newValues);
                $sheet->getStyle("H{$rowIndex}")->getAlignment()->setWrapText(true)
                        ->setHorizontal(Alignment::HORIZONTAL_LEFT)
                        ->setVertical(Alignment::VERTICAL_CENTER);

                $sheet->setCellValue("I{$rowIndex}", $item->url ?? "");
                $sheet->setCellValue("J{$rowIndex}", $item->ip_address ?? "");
                $sheet->setCellValue("K{$rowIndex}", $item->user_agent ?? "");
                $sheet->setCellValue("L{$rowIndex}", $item->tags ?? "");
                $sheet->setCellValue("M{$rowIndex}", $item->created_at ?? "");
                $sheet->setCellValue("N{$rowIndex}", $item->updated_at ?? "");

                // Apply alignment for all cells in the row 
                foreach (range('A', 'N') as $column) { 
                    $sheet->getStyle("{$column}{$rowIndex}")->getAlignment() 
                            ->setHorizontal(Alignment::HORIZONTAL_LEFT) 
                            ->setVertical(Alignment::VERTICAL_CENTER); 
                }
            }

            // Get the number of data rows
            $rowCount = count($data) + 5; // +4 for starting from row 5

            // Apply outside border for each column from A to N
            $columns = range('A', 'N');

            foreach ($columns as $column) {
                $cellRange = "{$column}6:{$column}{$rowCount}";
                $sheet->getStyle($cellRange)->getBorders()->getOutline()->setBorderStyle(Border::BORDER_THIN);
            }

            $sheet->getColumnDimension('A')->setWidth(4);

            // Auto-fit columns
            foreach (range('B', 'N') as $columnID) {
                $sheet->getColumnDimension($columnID)->setAutoSize(true);
            }

            $writer = new Xlsx($spreadsheet);
            $fileName = "AuditData_" . $now->format('Y-m-d_H-i-s') . ".xlsx";

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
            logger()->error('Error while exporting AuditData to Excel', ['exception' => $e]);
            throw $e;
        }
    }
}
