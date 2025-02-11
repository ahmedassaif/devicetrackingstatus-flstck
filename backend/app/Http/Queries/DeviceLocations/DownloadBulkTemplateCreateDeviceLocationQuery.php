<?php

namespace App\Http\Queries\DeviceLocations;

use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Color;
use PhpOffice\PhpSpreadsheet\Cell\DataValidation;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Carbon\Carbon;
use App\Models\DataUnit;
use App\Http\Responses\FileResponse;

class DownloadBulkTemplateCreateDeviceLocationQuery{

    public function downloadBulkTemplate(){

        $now = Carbon::now();

        // Fetch all DataUnit records where deleted_at is null
        $dataUnits = DataUnit::whereNull('deleted_at')->orderBy('updated_at', 'desc')->get();

        // Check if the data is empty 
        if ($dataUnits->isEmpty()) { 
            return response()->json([
                'message' => 'DataUnit Table is Empty.'
            ], 400); 
        }

        // Create a new Spreadsheet
        $spreadsheet = new Spreadsheet();

        // Sheet 1: DataUnits
        $sheet1 = $spreadsheet->getActiveSheet();
        $sheet1->setTitle('Lokasi Kerja');

        // Set headers for Sheet 1
        $sheet1->setCellValue('A1', 'Data Lokasi Kerja');
        $sheet1->getStyle('A1')->getFont()->setBold(true)->setSize(16);
        $sheet1->mergeCells('A1:D1');
        $sheet1->getStyle('A1')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
        $sheet1->getStyle('A1')->getAlignment()->setVertical(Alignment::VERTICAL_CENTER);
        
        $sheet1->setCellValue('A3', 'Generated at: ' . $now);
        $sheet1->getStyle('A3')->getFont()->setBold(true)->setSize(12);
        $sheet1->mergeCells('A3:D3');
        $sheet1->getStyle('A3')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);

        // Set header
        $headers = [
            "No", "ID", "Nama Lokasi Kerja", "Kode Plan"
        ];

        $headerRow = 5;
        foreach ($headers as $index => $header) {
            $column = chr(65 + $index); // Convert index to column letter (A, B, C, etc.)
            $sheet1->setCellValue("{$column}{$headerRow}", $header);
            $sheet1->getStyle("{$column}{$headerRow}")
                ->getFont()
                ->setBold(true);
            $sheet1->getStyle("{$column}{$headerRow}")
                ->getAlignment()
                ->setHorizontal(Alignment::HORIZONTAL_CENTER);
            $sheet1->getStyle("{$column}{$headerRow}")
                ->getBorders()
                ->getAllBorders()
                ->setBorderStyle(Border::BORDER_MEDIUM);
        }

        // Fill data
        foreach ($dataUnits as $index => $item) {
            $rowIndex = $index + 6;
            $sheet1->setCellValue("A{$rowIndex}", $index + 1);
            $sheet1->setCellValue("B{$rowIndex}", $item->id ?? "");
            $sheet1->setCellValue("C{$rowIndex}", $item->NameUnit ?? "");
            $sheet1->setCellValue("D{$rowIndex}", $item->Plan ?? "");

            // Apply alignment for all cells in the row 
            foreach (range('A', 'D') as $column) { 
                $sheet1->getStyle("{$column}{$rowIndex}")->getAlignment() 
                        ->setHorizontal(Alignment::HORIZONTAL_LEFT) 
                        ->setVertical(Alignment::VERTICAL_CENTER); 
            }
        }

        // Get the number of data rows
        $rowCount = count($dataUnits) + 5; // +4 for starting from row 5

        // Apply outside border for each column from A to D
        $columns = range('A', 'D');

        foreach ($columns as $column) {
            $cellRange = "{$column}6:{$column}{$rowCount}";
            $sheet1->getStyle($cellRange)->getBorders()->getOutline()->setBorderStyle(Border::BORDER_THIN);
        }

        $sheet1->getColumnDimension('A')->setWidth(4);

        // Auto-fit columns
        foreach (range('B', 'D') as $columnID) {
            $sheet1->getColumnDimension($columnID)->setAutoSize(true);
        }
        
        // Sheet 2: DeviceIdentityTemplate
        $sheet2 = $spreadsheet->createSheet();
        $sheet2->setTitle('Input Lokasi Utama Perangkat');

        // Set headers for Sheet 1
        $sheet2->setCellValue('A1', 'Input Lokasi Utama Perangkat');
        $sheet2->getStyle('A1')->getFont()->setBold(true)->setSize(16);
        $sheet2->mergeCells('A1:C1');
        $sheet2->getStyle('A1')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
        $sheet2->getStyle('A1')->getAlignment()->setVertical(Alignment::VERTICAL_CENTER);

        $headers = [
            "DataUnit ID", "Lokasi Kerja", "Lokasi Utama Perangkat"
        ];

        $headerRow = 3;
        foreach ($headers as $index => $header) {
            $column = chr(65 + $index); // Convert index to column letter (A, B, C, etc.)
            $sheet2->setCellValue("{$column}{$headerRow}", $header);
            $sheet2->getStyle("{$column}{$headerRow}")
                ->getFont()
                ->setBold(true);
            $sheet2->getStyle("{$column}{$headerRow}")
                ->getAlignment()
                ->setHorizontal(Alignment::HORIZONTAL_CENTER);
            $sheet2->getStyle("{$column}{$headerRow}")
                ->getBorders()
                ->getAllBorders()
                ->setBorderStyle(Border::BORDER_MEDIUM);
        }

        // Hide the ID column (Column A)
        $sheet2->getColumnDimension('A')->setVisible(false);

        // Add dropdown for Device Category in Sheet 2 (Column B)
        $validation = $sheet2->getCell('B2')->getDataValidation();
        $validation->setType(DataValidation::TYPE_LIST);
        $validation->setErrorStyle(DataValidation::STYLE_INFORMATION);
        $validation->setAllowBlank(false);
        $validation->setShowInputMessage(true);
        $validation->setShowErrorMessage(true);
        $validation->setShowDropDown(true);

        // Set dropdown options (DataUnit)
        $validation->setFormula1('DataUnit!$B$2:$B$' . ($dataUnits->count() + 1));

        // Apply the dropdown to all cells in column B
        for ($i = 2; $i <= 600; $i++) {
            $sheet2->getCell('B' . $i)->setDataValidation(clone $validation);

            // Set formula to display DataUnit based on the selected ID
            $sheet2->setCellValue('A' . $i, '=IFERROR(VLOOKUP(B' . $i . ', DeviceCategories!$B$2:$C$' . ($dataUnits->count() + 1) . ', 2, FALSE), "")');
        }

        // Adjust column widths for Sheet 2
        foreach (range('B', 'C') as $columnID) {
            $sheet2->getColumnDimension($columnID)->setAutoSize(true);
        }

        // Save the spreadsheet to a temporary file
        // $writer = new Xlsx($spreadsheet);
        // $fileName = 'BulkInsertDeviceIdentityTemplate.xlsx';
        // $tempFile = tempnam(sys_get_temp_dir(), $fileName);
        // $writer->save($tempFile);

        $writer = new Xlsx($spreadsheet);
        $fileName = 'BulkInsertDeviceLocationsTemplate.xlsx';

        // Save to memory
        $stream = fopen('php://memory', 'w+');
        $writer->save($stream);
        rewind($stream);

        // Get file content
        $fileBytes = stream_get_contents($stream);
        fclose($stream);

        return new FileResponse($fileBytes, $fileName);

    }

}