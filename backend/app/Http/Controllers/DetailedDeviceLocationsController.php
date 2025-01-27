<?php

namespace App\Http\Controllers;

use App\Http\Requests\DetailedDeviceLocations\CreateDetailedDeviceLocationRequest;
use App\Http\Requests\DetailedDeviceLocations\UpdateDetailedDeviceLocationRequest;
use App\Http\Requests\DetailedDeviceLocations\DetailedDeviceLocationSeletorRequest;
use App\Http\Requests\DetailedDeviceLocations\GetDetailedDeviceLocationsRequest;
use App\Http\Queries\DetailedDeviceLocations\CreateDetailedDeviceLocationCommand;
use App\Http\Queries\DetailedDeviceLocations\DeleteDetailedDeviceLocationCommand;
use App\Http\Queries\DetailedDeviceLocations\UpdateDetailedDeviceLocationCommand;
use App\Http\Queries\DetailedDeviceLocations\GetDetailedDeviceLocationQuery;
use App\Http\Queries\DetailedDeviceLocations\GetDetailedDeviceLocationsQuery;
use App\Http\Queries\DetailedDeviceLocations\GetDetailedDeviceLocationsExportToExcelQuery;
use App\Http\Queries\DetailedDeviceLocations\GetLookupDetailedDeviceLocationsByDeviceLocationQuery;
use OpenApi\Annotations as OA;
use Illuminate\Http\Request;

class DetailedDeviceLocationsController extends Controller{
    
    protected $createDetailedDeviceLocationCommand;
    protected $deleteDetailedDeviceLocationCommand;
    protected $updateDetailedDeviceLocationCommand;
    protected $getDetailedDeviceLocationQuery;
    protected $getDetailedDeviceLocationsQuery;
    protected $getLookupDetailedDeviceLocationsByDeviceLocationQuery;
    protected $getDetailedDeviceLocationsExportToExcelQuery;

    public function __construct(
        CreateDetailedDeviceLocationCommand $createDetailedDeviceLocationCommand,
        DeleteDetailedDeviceLocationCommand $deleteDetailedDeviceLocationCommand,
        UpdateDetailedDeviceLocationCommand $updateDetailedDeviceLocationCommand,
        GetDetailedDeviceLocationQuery $getDetailedDeviceLocationQuery,
        GetDetailedDeviceLocationsQuery $getDetailedDeviceLocationsQuery,
        GetLookupDetailedDeviceLocationsByDeviceLocationQuery $getLookupDetailedDeviceLocationsByDeviceLocationQuery,
        GetDetailedDeviceLocationsExportToExcelQuery $getDetailedDeviceLocationsExportToExcelQuery
        ){
            $this->createDetailedDeviceLocationCommand = $createDetailedDeviceLocationCommand;
            $this->deleteDetailedDeviceLocationCommand = $deleteDetailedDeviceLocationCommand;
            $this->updateDetailedDeviceLocationCommand = $updateDetailedDeviceLocationCommand;
            $this->getDetailedDeviceLocationQuery = $getDetailedDeviceLocationQuery;
            $this->getDetailedDeviceLocationsQuery = $getDetailedDeviceLocationsQuery;
            $this->getLookupDetailedDeviceLocationsByDeviceLocationQuery = $getLookupDetailedDeviceLocationsByDeviceLocationQuery;
            $this->getDetailedDeviceLocationsExportToExcelQuery = $getDetailedDeviceLocationsExportToExcelQuery;
        }
    
    /**
     * @OA\Get(
     *    path="/api/v1/detaileddevicelocations",
     *    summary="Get all DetailedDeviceLocations",
     *    tags={"DetailedDeviceLocations"},
     *    description="Returns a paginated list of DetailedDeviceLocations with filters",
     *    @OA\Parameter(
     *       name="page",
     *       in="query",
     *       description="The page number",
     *       required=false,
     *       @OA\Schema(type="integer", default=1)
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
     *         description="Returns a paginated list of DetailedDeviceLocations",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="items",
     *                 type="array",
     *                 @OA\Items(type="object", ref="#/components/schemas/DetailedDeviceLocation")
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
    public function getDetailedDeviceLocations(GetDetailedDeviceLocationsRequest $request)
    {
        $paginatedDetailedDeviceLocations = $this->getDetailedDeviceLocationsQuery->getDetailedDeviceLocations($request);

        return response()->json($paginatedDetailedDeviceLocations->toArray());
    }

    /**
     * @OA\Get(
     *    path="/api/v1/detaileddevicelocation/{id}",
     *    summary="Get DetailedDeviceLocation by id",
     *    tags={"DetailedDeviceLocations"},
     *    description="Returns a DetailedDeviceLocation by id",
     *    @OA\Parameter(
     *       name="id",
     *       in="path",
     *       description="The id of DetailedDeviceLocation",
     *       required=true,
     *       @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Returns a DetailedDeviceLocation",
     *         @OA\JsonContent(ref="#/components/schemas/DetailedDeviceLocation")
     *     ),
     *     @OA\Response(response=400, description="Bad Request"),
     *     @OA\Response(response=404, description="Not Found"),
     *     @OA\Response(response=500, description="Internal Server Error")
     * )
     */
    public function getDetailedDeviceLocation($id)
    {
        $detailedDeviceLocation = $this->getDetailedDeviceLocationQuery->getDetailedDeviceLocation($id);

        return response()->json($detailedDeviceLocation);
    }

    /**
     * @OA\Get(
     *   path="/api/v1/detaileddevicelocations/exporttoexcel",
     *   summary="Get DetailedDeviceLocations export to excel",
     *   tags={"DetailedDeviceLocations"},
     *   description="Returns a DetailedDeviceLocations export to excel",
     *    @OA\Response(
     *         response=200,
     *         description="Successful export",
     *         @OA\MediaType(
     *             mediaType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
     *         )
     *     ),
     *     @OA\Response( 
     *          response=400, 
     *          description="Empty data" 
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error"
     *     )
     * )
     */
    public function exportToExcel()
    {
        $fileResponse = $this->getDetailedDeviceLocationsExportToExcelQuery->export();

        // Check if the response is a JsonResponse 
        if ($fileResponse instanceof \Illuminate\Http\JsonResponse) { 
            return $fileResponse; // Return the JSON error response
        }

        return response($fileResponse->content)
                        ->header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                        ->header('Content-Disposition', 'attachment; filename="'.$fileResponse->fileName.'"');
    }

    /**
     * @OA\Get(
     *    path="/api/v1/detaileddevicelocations/lookup",
     *    summary="Get Lookup DetailedDeviceLocations by DeviceLocation",
     *    tags={"DetailedDeviceLocations"},
     *    description="Returns a list of Lookup DetailedDeviceLocations by DeviceLocation",
     *    @OA\Parameter(
     *       name="DeviceLocationId",
     *       in="query",
     *       description="The id of DeviceLocation",
     *       required=true,
     *       @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="searchText",
     *         in="query",
     *         description="search data",
     *         required=false,
     *         @OA\Schema(type="text")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Returns a list of Lookup DetailedDeviceLocations by DeviceLocation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(type="object", ref="#/components/schemas/DetailedDeviceLocation")
     *         )
     *     ),
     *     @OA\Response(response=400, description="Bad Request"),
     *     @OA\Response(response=404, description="Not Found"),
     *     @OA\Response(response=500, description="Internal Server Error")
     * )
     */
    public function getLookupDetailedDeviceLocationsByDeviceLocation(DetailedDeviceLocationSeletorRequest $request)
    {
        $response = $this->getLookupDetailedDeviceLocationsByDeviceLocationQuery->getLookup($request);

        return response()->json($response);
    }
    
    /**
     * @OA\Post(
     *    path="/api/v1/detaileddevicelocation",
     *    summary="Create DetailedDeviceLocation",
     *    tags={"DetailedDeviceLocations"},
     *    description="Create DetailedDeviceLocation",
     *    @OA\RequestBody(
     *        required=true,
     *        @OA\JsonContent(ref="#/components/schemas/CreateDetailedDeviceLocationRequest")
     *    ),
     *    @OA\Response(
     *        response=201,
     *        description="Returns the DetailedDeviceLocation created",
     *        @OA\JsonContent(ref="#/components/schemas/DetailedDeviceLocation")
     *    ),
     *    @OA\Response(response=400, description="Bad Request"),
     *    @OA\Response(response=500, description="Internal Server Error"),
     *    @OA\Response(response=409, description="Duplicate Data")
     * )
     */
    public function createDetailedDeviceLocation(Request $request)
    {
        $createDetailedDeviceLocationRequest = new CreateDetailedDeviceLocationRequest(
            $request->input('NameDetailLocation'),
            $request->input('MainDetailLocation'),
            $request->input('SubOfMainDetailLocation'),
            $request->input('DeviceLocationId')
        );
        
        $detailedDeviceLocationResource = $this->createDetailedDeviceLocationCommand->handle($createDetailedDeviceLocationRequest);
        
        return response()->json($detailedDeviceLocationResource, 201);
        
    }

    /**
     * @OA\Put(
     *    path="/api/v1/detaileddevicelocation/{id}",
     *    summary="Update DetailedDeviceLocation",
     *    tags={"DetailedDeviceLocations"},
     *    description="Update DetailedDeviceLocation",
     *    @OA\RequestBody(
     *        required=true,
     *        @OA\JsonContent(ref="#/components/schemas/UpdateDetailedDeviceLocationRequest")
     *    ),
     *    @OA\Response(
     *        response=200,
     *        description="Returns the DetailedDeviceLocation updated",
     *        @OA\JsonContent(ref="#/components/schemas/DetailedDeviceLocation")
     *    ),
     *    @OA\Response(response=400, description="Bad Request"),
     *    @OA\Response(response=404, description="Not Found"),
     *    @OA\Response(response=500, description="Internal Server Error"),
     *    @OA\Response(response=409, description="Duplicate Data")
     * )
     */
    public function updateDetailedDeviceLocation(Request $request)
    {
        $updateDetailedDeviceLocationRequest = new UpdateDetailedDeviceLocationRequest(
            $request->input('id'),
            $request->input('NameDetailLocation'),
            $request->input('MainDetailLocation'),
            $request->input('SubOfMainDetailLocation'),
            $request->input('DeviceLocationId')
        );

        $detailedDeviceLocationResource = $this->updateDetailedDeviceLocationCommand->handle($updateDetailedDeviceLocationRequest);

        return response()->json($detailedDeviceLocationResource);
    }

    /**
     * @OA\Delete(
     *    path="/api/v1/detaileddevicelocation/{id}",
     *    summary="Delete DetailedDeviceLocation",
     *    tags={"DetailedDeviceLocations"},
     *    description="Delete DetailedDeviceLocation",
     *    @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="DetailedDeviceLocation ID",
     *         @OA\Schema(type="string")
     *     ),
     *    @OA\Response(
     *         response=200,
     *         description="DeviceLocation deleted successfully"
     *     ),
     *    @OA\Response(response=400, description="Bad Request"),
     *    @OA\Response(response=404, description="Not Found"),
     *    @OA\Response(response=500, description="Internal Server Error")
     * )
     */
    public function deleteDetailedDeviceLocation(string $id)
    {
        $response = $this->deleteDetailedDeviceLocationCommand->handle($id);

        return $response;
    }


}