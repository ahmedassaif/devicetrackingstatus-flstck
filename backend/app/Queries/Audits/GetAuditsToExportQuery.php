<?php

namespace App\Queries\Audits;

use App\Models\Audit;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class GetAuditsToExportQuery
{
    public function export()
    {
        try {
            $now = Carbon::now();

            $data = Audit::orderBy('created_at', 'desc')->get();

            // Create new Spreadsheet object
            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();
            $sheet->setTitle('Audit Data');

            // Set header
            $headers = [
                "No", "Table Name", "Entity Name", "Action Type", "Action Name", "Entity ID", "Old Values", "New Values", "Client Application ID", "From IP Address"
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
                $sheet->setCellValue("B{$rowIndex}", $item->user_id ?? "");
                $sheet->setCellValue("C{$rowIndex}", $item->event ?? "");
                $sheet->setCellValue("D{$rowIndex}", $item->auditable_type ?? "");
                $sheet->setCellValue("D{$rowIndex}", $item->auditable_id ?? "");
                $sheet->setCellValue("G{$rowIndex}", $item->old_values ?? "");
                $sheet->setCellValue("H{$rowIndex}", $item->new_values ?? "");
                $sheet->setCellValue("D{$rowIndex}", $item->url ?? "");
                $sheet->setCellValue("D{$rowIndex}", $item->ip_address ?? "");
                $sheet->setCellValue("D{$rowIndex}", $item->user_agent ?? "");
                $sheet->setCellValue("D{$rowIndex}", $item->tags ?? "");
                $sheet->setCellValue("I{$rowIndex}", $item->created_at ?? "");
                $sheet->setCellValue("J{$rowIndex}", $item->updated_at ?? "");
            }

            // Auto-fit columns
            foreach (range('A', $sheet->getHighestColumn()) as $columnID) {
                $sheet->getColumnDimension($columnID)->setAutoSize(true);
            }

            $writer = new Xlsx($spreadsheet);
            $fileName = "AuditData_" . $now->format('Y-m-d_H-i-s') . ".xlsx";
            $filePath = storage_path($fileName);
            $writer->save($filePath);

            return response()->download($filePath)->deleteFileAfterSend(true);
        } catch (\Exception $e) {
            // Handle the exception as needed
            logger()->error('Error while exporting AuditData to Excel', ['exception' => $e]);
            throw $e;
        }
    }
}
