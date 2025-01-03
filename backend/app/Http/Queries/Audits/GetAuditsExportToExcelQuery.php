<?php

namespace App\Http\Queries\Audits;

use App\Models\Audit;
use App\Http\Responses\FileResponse;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class GetAuditsExportToExcelQuery
{
    public function export()
    {
        try {
            $now = Carbon::now();

            $data = Audit::orderBy('updated_at', 'desc')->get();

            // Check if the data is empty 
            if ($data->isEmpty()) { 
                return response()->json(['error' => 'Audit Table is Empty'], 400); 
            }

            // Create new Spreadsheet object
            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();
            $sheet->setTitle('Audit Data');

            // Set header
            $headers = [
                "No", "User Type", "User ID", "Event", "Auditable Type", "Auditable ID", "Old Values", "New Values", "URL", "IP Address", "User Agent", "Tags", "Created At", "Updated At"
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
                $sheet->setCellValue("B{$rowIndex}", $item->user_type ?? "");
                $sheet->setCellValue("C{$rowIndex}", $item->user_id ?? "");
                $sheet->setCellValue("D{$rowIndex}", $item->event ?? "");
                $sheet->setCellValue("E{$rowIndex}", $item->auditable_type ?? "");
                $sheet->setCellValue("F{$rowIndex}", $item->auditable_id ?? "");
                $sheet->setCellValue("G{$rowIndex}", $item->old_values ?? "");
                $sheet->setCellValue("H{$rowIndex}", $item->new_values ?? "");
                $sheet->setCellValue("I{$rowIndex}", $item->url ?? "");
                $sheet->setCellValue("J{$rowIndex}", $item->ip_address ?? "");
                $sheet->setCellValue("K{$rowIndex}", $item->user_agent ?? "");
                $sheet->setCellValue("L{$rowIndex}", $item->tags ?? "");
                $sheet->setCellValue("M{$rowIndex}", $item->created_at ?? "");
                $sheet->setCellValue("N{$rowIndex}", $item->updated_at ?? "");
            }

            // Auto-fit columns
            foreach (range('A', $sheet->getHighestColumn()) as $columnID) {
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
