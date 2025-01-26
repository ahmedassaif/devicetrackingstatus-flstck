<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeviceLocations\CreateDeviceLocationRequest;
use App\Http\Requests\DeviceLocations\UpdateDeviceLocationRequest;
use App\Http\Queries\DeviceLocations\GetDeviceLocationsQuery;
use App\Http\Queries\DeviceLocations\GetDeviceLocationQuery;
use App\Http\Queries\DeviceLocations\GetDeviceLocationsExportToExcelQuery;
use App\Http\Requests\DeviceLocations\GetDeviceLocationsRequest;
use App\Http\Queries\DeviceLocations\CreateDeviceLocationCommand;
use App\Http\Queries\DeviceLocations\UpdateDeviceLocationCommand;
use App\Http\Queries\DeviceLocations\DeleteDeviceLocationCommand;
use App\Http\Queries\DeviceLocations\GetLookupAllDeviceLocationsQuery;
use OpenApi\Annotations as OA;
use Illuminate\Http\Request;

class DeviceLocationsController extends Controller
{
    protected $getDeviceLocationsQuery;
    protected $getDeviceLocationQuery;
    protected $getDeviceLocationsExportToExcelQuery;
    protected $createDeviceLocationCommand;
    protected $updateDeviceLocationCommand;
    protected $deleteDeviceLocationCommand;
    protected $getLookupAllDeviceLocationsQuery;

    public function __construct(
        GetDeviceLocationsQuery $getDeviceLocationsQuery,
        GetDeviceLocationQuery $getDeviceLocationQuery,
        GetDeviceLocationsExportToExcelQuery $getDeviceLocationsExportToExcelQuery,
        CreateDeviceLocationCommand $createDeviceLocationCommand,
        UpdateDeviceLocationCommand $updateDeviceLocationCommand,
        DeleteDeviceLocationCommand $deleteDeviceLocationCommand,
        GetLookupAllDeviceLocationsQuery $getLookupAllDeviceLocationsQuery
    ) {
        $this->getDeviceLocationsQuery = $getDeviceLocationsQuery;
        $this->getDeviceLocationQuery = $getDeviceLocationQuery;
        $this->getDeviceLocationsExportToExcelQuery = $getDeviceLocationsExportToExcelQuery;
        $this->createDeviceLocationCommand = $createDeviceLocationCommand;
        $this->updateDeviceLocationCommand = $updateDeviceLocationCommand;
        $this->deleteDeviceLocationCommand = $deleteDeviceLocationCommand;
        $this->getLookupAllDeviceLocationsQuery = $getLookupAllDeviceLocationsQuery;
    }

    /**
     * @OA\Get(
     *     path="/api/v1/deviceLocations",
     *     summary="Get DeviceLocations",
     *     description="Returns a paginated list of DeviceLocations with filters",
     *     tags={"DeviceLocations"},
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
     *         description="Returns a paginated list of DeviceLocations",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="items",
     *                 type="array",
     *                 @OA\Items(type="object", ref="#/components/schemas/DeviceLocation")
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
    public function getDeviceLocations(GetDeviceLocationsRequest $request)
    {
        // Call the query service to fetch DeviceLocations
        $paginatedDeviceLocations = $this->getDeviceLocationsQuery->getDeviceLocations($request);

        // Ensure the response is converted to an array for JSON serialization
        return response()->json($paginatedDeviceLocations->toArray());
    }

    /**
     * @OA\Get(
     *     path="/api/v1/deviceLocation/{id}",
     *     summary="Get DeviceLocation by ID",
     *     description="Retrieve a specific DeviceLocation by its unique ID",
     *     tags={"DeviceLocations"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="DeviceLocation ID",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="DeviceLocation retrieved successfully",
     *         @OA\JsonContent(ref="#/components/schemas/DeviceLocation")
     *     ),
     *     @OA\Response(response=404, description="DeviceLocation not found"),
     *     @OA\Response(response=500, description="Internal Server Error")
     * )
     */
    public function getDeviceLocation($id)
    {
        $getDeviceLocationId = $this->getDeviceLocationQuery->getDeviceLocation($id); 
        
        return response()->json($getDeviceLocationId);
    }
    
    /**
     * @OA\Get(
     *     path="/api/v1/exportDeviceLocationsToExcel",
     *     summary="Export DeviceLocation data to an Excel file",
     *     description="Exports DeviceLocation data from the database to an Excel file and returns the file as a download.",
     *     tags={"DeviceLocations"},
     *     @OA\Response(
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
    public function exportDeviceLocationsToExcel() { 
        
        $fileResponse = $this->getDeviceLocationsExportToExcelQuery->export(); 
        
        //if (is_array($fileResponse) && isset($fileResponse['error'])) { 
        //    return response()->json($fileResponse, 400); // Return the error response if the data is empty 
        //}
        
        // Check if the response is a JsonResponse 
        if ($fileResponse instanceof \Illuminate\Http\JsonResponse) { 
            return $fileResponse; // Return the JSON error response
        }

        return response($fileResponse->content)
                        ->header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                        ->header('Content-Disposition', 'attachment; filename="'.$fileResponse->fileName.'"'); 
    }

    /**
     * @OA\Post(
     *     path="/api/v1/deviceLocation",
     *     summary="Create a new DeviceLocation",
     *     description="Creates a new DeviceLocation and returns the created entity",
     *     tags={"DeviceLocations"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/CreateDeviceLocationRequest")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="DeviceLocation created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/DeviceLocation")
     *     ),
     *     @OA\Response(response=400, description="Bad Request"),
     *     @OA\Response(response=500, description="Internal Server Error"),
     *     @OA\Response(response=409, description="Duplicate Data")
     * )
     */
    public function insertDeviceLocation(Request $request) 
    { 
        
        $createDeviceLocationRequest = new CreateDeviceLocationRequest(
            $request->input('NameDeviceLocation'), 
            $request->input('DataUnitId') 
        );

        $deviceLocationResource = $this->createDeviceLocationCommand->handle($createDeviceLocationRequest);

        return response()->json($deviceLocationResource, 201);
    }

    /**
     * @OA\Put(
     *     path="/api/v1/deviceLocation/{id}",
     *     summary="Update a DeviceLocation",
     *     description="Updates an existing DeviceLocation and returns the updated entity",
     *     tags={"DeviceLocations"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/UpdateDeviceLocationRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="DeviceLocation updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/DeviceLocation")
     *     ),
     *     @OA\Response(response=404, description="DeviceLocation not found"),
     *     @OA\Response(response=400, description="Bad Request"),
     *     @OA\Response(response=500, description="Internal Server Error"),
     *     @OA\Response(response=409, description="Duplicate Data") 
     * )
     */
    public function updateDeviceLocation(Request $request)
    {
        $updateDeviceLocationRequest = new UpdateDeviceLocationRequest(
            id: $request->input('id'),
            NameDeviceLocation: $request->input('NameDeviceLocation'), 
            DataUnitId: $request->input('DataUnitId') 
        );

        $deviceLocationResource = $this->updateDeviceLocationCommand->handle($updateDeviceLocationRequest);

        return response()->json($deviceLocationResource);
    }

    /**
     * @OA\Delete(
     *     path="/api/v1/deviceLocation/{id}",
     *     summary="Delete a DeviceLocation",
     *     description="Soft deletes a DeviceLocation by its unique ID",
     *     tags={"DeviceLocations"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="DeviceLocation ID",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="DeviceLocation deleted successfully"
     *     ),
     *     @OA\Response(response=404, description="DeviceLocation not found"),
     *     @OA\Response(response=500, description="Internal Server Error")
     * )
     */
    public function deleteDeviceLocation(string $id)
    {
        $response = $this->deleteDeviceLocationCommand->handle($id);

        return $response;
    }

    /**
     * @OA\Get(
     *     path="/api/v1/getLookupAllDeviceLocations",
     *     summary="Get all DeviceLocations",
     *     description="Returns a list of all DeviceLocations",
     *     tags={"DeviceLocations"},
     *     @OA\Response(
     *         response=200,
     *         description="DeviceLocations retrieved successfully",
     *         @OA\JsonContent(ref="#/components/schemas/DeviceLocationDto")
     *     ),
     *     @OA\Response(response=500, description="Internal Server Error")
     * )
     */
    public function getLookupAllDeviceLocations() { 
        
        $deviceLocations = $this->getLookupAllDeviceLocationsQuery->getLookup(); 
        
        return response()->json($deviceLocations); 
    }

}
