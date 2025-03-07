<?php

namespace App\Http\Queries\DeviceLocations;

use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Facades\Response;
use App\Models\DeviceLocation;
use App\Http\Responses\FileResponse;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpSpreadsheet\Style\Border;
use Illuminate\Support\Facades\Validator;
use PhpOffice\PhpSpreadsheet\Style\Color;

class CreateBulkDeviceLocationsFromExcelQuery
{
    public function createDeviceLocationsFromExcel(Request $request)
    {
        $hasErrors = 0;
        $hasErrorsandData = 0;

        try {

            // Validate the request to ensure an Excel file is uploaded
            $request->validate([
                'file' => 'required|mimes:xlsx,xls',
            ]);

            // Load the uploaded Excel file
            $spreadsheet = IOFactory::load($request->file('file')->getPathname());
            $sheet = $spreadsheet->getSheet(1); // Get the second sheet

            // Check if the sheet has at least 3 columns
            if ($sheet->getHighestColumn() < 'C') {
                return response()->json(['message' => 'The Excel file must have at least 3 columns.'], 400);
            }

            // Add "Error Message" column header
            $sheet->setCellValue('D2', 'Error Message');
            $sheet->getStyle('D2')
                    ->getFont()->setBold(true);
            $sheet->getStyle('D2')
                ->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_MEDIUM);
            $sheet->getColumnDimension('D')->setAutoSize(true);

            // Initialize variables
            $newData = [];

            // Iterate through the rows in the sheet, starting from row 3
            $rowIterator = $sheet->getRowIterator();
            $rowCount = 0;

            //Log::info("1. Starting to iterate through the rows in the sheet.");

            foreach ($rowIterator as $row) {
                
                $rowCount++;
                
                // Skip the first two rows (headers)
                if ($rowCount < 3) {
                    continue;
                    Log::info("Skipping the first two rows (headers).");
                }

                $cellIterator = $row->getCellIterator();
                $cellIterator->setIterateOnlyExistingCells(false); // This will include empty cells
                
                $dataUnitId = $cellIterator->current()->getFormattedValue(); // Lokasi Kerja Id
                $cellIterator->next();
                $location = $cellIterator->current()->getValue(); // Lokasi Kerja
                $cellIterator->next();
                $nameDeviceLocation = $cellIterator->current()->getValue(); // Lokasi Utama Perangkat


                // Add valid data to the array if both fields are not empty
                if (!empty($dataUnitId) && !empty($nameDeviceLocation)) {
                    
                    $newData[] = [
                        'DataUnitId' => $dataUnitId,
                        'NameDeviceLocation' => $nameDeviceLocation,
                    ];
                    //Log::info("Data added to the array.");

                    // Check if the data already exists in the database
                    $deviceLocation = DeviceLocation::where('NameDeviceLocation', $nameDeviceLocation)
                                                    ->where('DataUnitId', $dataUnitId)
                                                    ->first();
                    //Log::info("2. Checking if the data already exists in the database.");

                    if ($deviceLocation) {
                        
                        // Data already exists, add error message
                        $sheet->setCellValue('D' . $rowCount, 'Data Already Exist')->getStyle('D' . $rowCount)->getFont()->getColor()->setARGB(Color::COLOR_RED);
                        $hasErrors++;
                        
                        if (count($newData) > 1) {
                            $hasErrorsandData++;
                        }
                        
                        //Log::info("3. Data already exists in the database.");
                    } else {
                        
                        // Data does not exist, validate before creating
                        $validator = Validator::make([
                            'NameDeviceLocation' => $nameDeviceLocation,
                            'DataUnitId' => $dataUnitId,
                        ], [
                            'NameDeviceLocation' => 'required|string|max:255',
                            'DataUnitId' => 'required|string|max:255',
                        ]);
                        
                        //Log::info("4. Validating data before creating.");
                        
                        if ($validator->fails()) {
                            
                            // Handle validation errors
                            $errors = $validator->errors();
                            $sheet->setCellValue('D' . $rowCount, $errors->first())->getStyle('D' . $rowCount)->getFont()->getColor()->setARGB(Color::COLOR_RED);
                            
                            $hasErrors++;
                            if (count($newData) > 1) {
                                $hasErrorsandData++;
                            }
                            
                            //Log::info("5. Validation failed.");
                        } else {
                            // Create new DeviceLocation entry

                            DeviceLocation::create([
                                'DataUnitId' => $dataUnitId,
                                'NameDeviceLocation' => $nameDeviceLocation,
                            ]);
                            //Log::info("6. Creating new DeviceLocation entry.");
                            if ($hasErrorsandData > 0) {
                                $sheet->setCellValue('D' . $rowCount, 'Input Data Successfully, Please Delete This Row')->getStyle('D' . $rowCount)->getFont()->getColor()->setARGB(Color::COLOR_GREEN);
                                Log::info("7. Input data successfully, please delete this row.");
                            }
                        }
                    }
                }
            }

            // If there are errors, export the modified Excel file
            if ($hasErrors > 0 || $hasErrorsandData > 0) {
                $writer = new Xlsx($spreadsheet);
                $fileName = 'BulkInsertDeviceLocationsWithErrors.xlsx';

                // Save to memory
                $stream = fopen('php://memory', 'w+');
                $writer->save($stream);
                rewind($stream);

                // Get file content
                $fileBytes = stream_get_contents($stream);
                fclose($stream);
                //Log::info("8. File exported.");
                return new FileResponse($fileBytes, $fileName);
            }
            else {
                if (empty($newData)) {
                    // If no data was inserted, return error response
                    return response()->json(['message' => 'Data Empty. Please Fill Data in Excel File.'], 400);
                    //Log::info("9. Data empty. Please fill data in Excel file.");
                }
            }

            // If no errors, return success response
            return response()->json(['message' => 'All data inserted successfully'], 200);
            
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 400);
        }
        finally {
            $hasErrors = 0;
            $hasErrorsandData = 0;
        }

        
    }
}
