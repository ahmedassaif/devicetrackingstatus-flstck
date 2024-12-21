<?php

namespace App\Http\Controllers;

use App\Queries\DataUnits\GetDataUnitsQuery;
use App\Queries\DataUnits\GetDataUnitQuery;
use App\Queries\DataUnits\GetDataUnitsExportToExcelQuery;
use App\Http\Requests\DataUnits\GetDataUnitsRequest;
use App\Queries\DataUnits\CreateDataUnitCommand;
use OpenApi\Annotations as OA;

class DataUnitsController extends Controller
{
    protected $getDataUnitsQuery;
    protected $getDataUnitQuery;
    protected $getDataUnitsExportToExcelQuery;
    protected $createDataUnitCommand;

    public function __construct(
        GetDataUnitsQuery $getDataUnitsQuery,
        GetDataUnitQuery $getDataUnitQuery,
        GetDataUnitsExportToExcelQuery $getDataUnitsExportToExcelQuery,
        CreateDataUnitCommand $createDataUnitCommand
    ) {
        $this->getDataUnitsQuery = $getDataUnitsQuery;
        $this->getDataUnitQuery = $getDataUnitQuery;
        $this->getDataUnitsExportToExcelQuery = $getDataUnitsExportToExcelQuery;
        $this->createDataUnitCommand = $createDataUnitCommand;
    }

    /**
     * @OA\Get(
     *     path="/api/v1/DataUnits",
     *     summary="Get DataUnits",
     *     description="Returns a paginated list of DataUnits with filters",
     *     tags={"DataUnits"},
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Page number",
     *         required=false,
     *         @OA\Schema(type="integer", default=1)
     *     ),
     *     @OA\Parameter(
     *         name="pageSize",
     *         in="query",
     *         description="Number of items per page",
     *         required=false,
     *         @OA\Schema(type="integer", default=10)
     *     ),
     *     @OA\Parameter(
     *         name="searchText",
     *         in="query",
     *         description="search data",
     *         required=false,
     *         @OA\Schema(type="text")
     *     ),
     *     @OA\Parameter(
     *         name="sortField",
     *         in="query",
     *         description="sorting field",
     *         required=false,
     *         @OA\Schema(type="text")
     *     ),
     *     @OA\Parameter(
     *         name="sortOrder",
     *         in="query",
     *         description="sorting field (asc or desc)",
     *         required=false,
     *         @OA\Schema(type="text")
     *     ),       
     *     @OA\Parameter(
     *         name="from",
     *         in="query",
     *         description="Start date for filter",
     *         required=false,
     *         @OA\Schema(type="string", format="date")
     *     ),
     *     @OA\Parameter(
     *         name="to",
     *         in="query",
     *         description="End date for filter",
     *         required=false,
     *         @OA\Schema(type="string", format="date")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Returns a paginated list of DataUnits",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="items",
     *                 type="array",
     *                 @OA\Items(type="object", ref="#/components/schemas/DataUnit")
     *             ),
     *             @OA\Property(
     *                 property="totalCount",
     *                 type="integer"
     *             )
     *         )
     *     ),
     *     @OA\Response(response=400, description="Bad Request"),
     *     @OA\Response(response=500, description="Internal Server Error")
     * )
     */
    public function getDataUnits(GetDataUnitsRequest $request)
    {
        // Call the query service to fetch DataUnits
        $paginatedDataUnits = $this->getDataUnitsQuery->getDataUnits($request);

        // Ensure the response is converted to an array for JSON serialization
        return response()->json($paginatedDataUnits->toArray());
    }

    /**
     * @OA\Get(
     *     path="/api/v1/DataUnit/{id}",
     *     summary="Get DataUnit by ID",
     *     description="Retrieve a specific DataUnit by its unique ID",
     *     tags={"DataUnits"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="DataUnit ID",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="DataUnit retrieved successfully",
     *         @OA\JsonContent(ref="#/components/schemas/DataUnit")
     *     ),
     *     @OA\Response(response=404, description="DataUnit not found"),
     *     @OA\Response(response=500, description="Internal Server Error")
     * )
     */
    public function getDataUnit($id)
    {
        $getDataUnitId = $this->getDataUnitQuery->getDataUnit($id); 
        
        return response()->json($getDataUnitId);
    }
    
    /**
     * @OA\Get(
     *     path="/api/v1/exportDataUnitsToExcel",
     *     summary="Export DataUnit data to an Excel file",
     *     description="Exports DataUnit data from the database to an Excel file and returns the file as a download.",
     *     tags={"DataUnits"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful export",
     *         @OA\MediaType(
     *             mediaType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error"
     *     )
     * )
     */
    public function exportDataUnitsToExcel() { 
        
        $fileResponse = $this->getDataUnitsExportToExcelQuery->export(); 
        
        return response($fileResponse->content)
                        ->header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                        ->header('Content-Disposition', 'attachment; filename="'.$fileResponse->fileName.'"'); 
    }

}
