<?php

namespace App\Http\Controllers;

use App\Queries\Audits\GetAuditsQuery;
use App\Queries\Audits\GetAuditQuery;
use App\Queries\Audits\GetAuditsExportToExcelQuery;
use App\Http\Requests\Audits\GetAuditsRequest;
use OpenApi\Annotations as OA;

class AuditsController extends Controller
{
    protected $getAuditsQuery;
    protected $getAuditQuery;
    protected $getAuditsExportToExcelQuery;

    public function __construct(
        GetAuditsQuery $getAuditsQuery,
        GetAuditQuery $getAuditQuery,
        GetAuditsExportToExcelQuery $getAuditsExportToExcelQuery
        )
    {
        $this->getAuditsQuery = $getAuditsQuery;
        $this->getAuditQuery = $getAuditQuery;
        $this->getAuditsExportToExcelQuery = $getAuditsExportToExcelQuery;
    }

    /**
     * @OA\Get(
     *     path="/api/v1/audits",
     *     summary="Get Audits",
     *     description="Returns a paginated list of audits with filters",
     *     tags={"Audits"},
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
     *         description="Returns a paginated list of audits",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="items",
     *                 type="array",
     *                 @OA\Items(type="object", ref="#/components/schemas/Audit")
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
    public function getAudits(GetAuditsRequest $request)
    {
        // Call the query service to fetch audits
        $paginatedAudits = $this->getAuditsQuery->getAudits($request);

        // Ensure the response is converted to an array for JSON serialization
        return response()->json($paginatedAudits->toArray());
    }

    /**
     * @OA\Get(
     *     path="/api/v1/audit/{id}",
     *     summary="Get Audit by ID",
     *     description="Retrieve a specific audit by its unique ID",
     *     tags={"Audits"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Audit ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Audit retrieved successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Audit")
     *     ),
     *     @OA\Response(response=404, description="Audit not found"),
     *     @OA\Response(response=500, description="Internal Server Error")
     * )
     */
    public function getAudit($id)
    {
        $getAuditId = $this->getAuditQuery->getAudit($id); 
        
        return response()->json($getAuditId);
    }
    
    /**
     * @OA\Get(
     *     path="/api/v1/exportAuditsToExcel",
     *     summary="Export audit data to an Excel file",
     *     description="Exports audit data from the database to an Excel file and returns the file as a download.",
     *     tags={"Audits"},
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
    public function exportAuditsToExcel() { 
        
        $fileResponse = $this->getAuditsExportToExcelQuery->export(); 
        
        return response($fileResponse->content)
                        ->header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                        ->header('Content-Disposition', 'attachment; filename="'.$fileResponse->fileName.'"'); 
    }

}
