<?php
namespace App\Http\Queries\DetailedDeviceLocations;

use App\Http\Requests\DetailedDeviceLocations\GetDetailedDeviceLocationsRequest;
use Illuminate\Support\Facades\DB;
use App\Http\Responses\PaginatedListResponse;
use App\Http\Requests\DetailedDeviceLocations\DetailedDeviceLocationOptions;
use Illuminate\Support\Facades\Log;

class GetDetailedDeviceLocationsQuery
{
    protected $detailedDeviceLocationOptions;

    public function __construct(DetailedDeviceLocationOptions $detailedDeviceLocationOptions)
    {
        $this->detailedDeviceLocationOptions = $detailedDeviceLocationOptions;
    }

    public function getDetailedDeviceLocations(GetDetailedDeviceLocationsRequest $request)
    {
        // Retrieve filter values from the request
        $from = $request->input('from', $this->detailedDeviceLocationOptions->getFilterMinimumCreated());
        $to = $request->input('to', $this->detailedDeviceLocationOptions->getFilterMaximumCreated());

        // Pagination parameters
        $page = (int) $request->query('page', 1);
        $pageSize = (int) $request->query('pageSize', 10);
        $offset = ($page - 1) * $pageSize; // Adjust for one-based index

        // Base query for DetailedDeviceLocation
        $query = DB::table('DetailedDeviceLocation')
            ->whereBetween('DetailedDeviceLocation.created_at', [$from, $to])
            ->whereNull('DetailedDeviceLocation.deleted_at');

        // Join with DeviceLocation and DataUnit
        $query = $query->join('DeviceLocation', 'DetailedDeviceLocation.DeviceLocationId', '=', 'DeviceLocation.id')
            ->leftJoin('DataUnit', 'DeviceLocation.DataUnitId', '=', 'DataUnit.id')
            ->select(
                'DetailedDeviceLocation.id',
                'DetailedDeviceLocation.NameDetailLocation',
                'DetailedDeviceLocation.MainDetailLocation',
                'DetailedDeviceLocation.SubOfMainDetailLocation',
                'DetailedDeviceLocation.created_at',
                'DeviceLocation.NameDeviceLocation',
                'DataUnit.NameUnit',
            );

        // Apply search filter
        $searchText = (string) $request->query('searchText', ''); // Explicitly cast to string
        if ($searchText) {
            $query->where(function ($q) use ($searchText) {
                $q->where('DetailedDeviceLocation.NameDetailLocation', 'like', '%' . $searchText . '%')
                    ->orWhere('DetailedDeviceLocation.MainDetailLocation', 'like', '%' . $searchText . '%')
                    ->orWhere('DetailedDeviceLocation.SubOfMainDetailLocation', 'like', '%' . $searchText . '%')
                    ->orWhere('DeviceLocation.NameDeviceLocation', 'like', '%' . $searchText . '%')
                    ->orWhere('DataUnit.NameUnit', 'like', '%' . $searchText . '%');
            });
        }

        // Apply sorting
        $sortField = $request->input('sortField');
        $sortDirection = $request->input('sortOrder', 'asc');
        if ($sortField) {
            $query->orderBy($sortField, $sortDirection);
        } else {
            $query->orderBy('DetailedDeviceLocation.created_at', 'desc');
        }

        // Log the SQL query for debugging
        Log::info('SQL Query:', ['sql' => $query->toSql(), 'bindings' => $query->getBindings()]);

        // Count total rows after applying filters and sorting
        $totalRows = $query->count();

        // Calculate total pages
        $totalPages = ceil($totalRows / $pageSize);

        // Fetch the paginated results
        $detailedDeviceLocations = $query->offset($offset)
            ->limit($pageSize)
            ->get();

        // Return the paginated response
        return new PaginatedListResponse(
            $detailedDeviceLocations->toArray(),
            $page,
            $totalPages,
            $totalRows,
            $page > 1, // Has previous page
            $page < $totalPages // Has next page
        );
    }
}