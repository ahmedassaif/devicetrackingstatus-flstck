<?php
namespace App\Http\Queries\DeviceLocations;

use App\Http\Requests\DeviceLocations\GetDeviceLocationsRequest;
use Illuminate\Support\Facades\DB;
use App\Http\Responses\PaginatedListResponse;
use App\Http\Requests\DeviceLocations\DeviceLocationOptions;
use Illuminate\Support\Facades\Log;

class GetDeviceLocationsQuery
{
    protected $deviceLocationOptions;

    public function __construct(DeviceLocationOptions $deviceLocationOptions)
    {
        $this->deviceLocationOptions = $deviceLocationOptions;
    }

    public function getDeviceLocations(GetDeviceLocationsRequest $request)
    {
        $from = $request->input('from', $this->deviceLocationOptions->getFilterMinimumCreated());
        $to = $request->input('to', $this->deviceLocationOptions->getFilterMaximumCreated());

        $page = (int) $request->query('page', 1);
        $pageSize = (int) $request->query('pageSize', 10);
        $offset = ($page - 1) * $pageSize; // Adjust for one-based index
        
        $query = DB::table('DeviceLocation')
                    ->whereBetween('DeviceLocation.created_at', [$from, $to])
                    ->whereNull('DeviceLocation.deleted_at')
                    ;

        Log::info('SQL Query:', ['sql' => $query->toSql(), 'bindings' => $query->getBindings()]);
        
        $searchText = (string) $request->query('searchText', ''); // Explicitly cast to string
        
        $query = $query->join('DataUnit', 'DeviceLocation.DataUnitId', '=', 'DataUnit.id')
        ->select(
            'DeviceLocation.id',
            'DeviceLocation.NameDeviceLocation',
            'DeviceLocation.DataUnitId',
            'DeviceLocation.created_at as device_created_at',
            'DeviceLocation.updated_at as device_updated_at',
            'DeviceLocation.deleted_at as device_deleted_at',
            'DataUnit.NameUnit',
            'DataUnit.Plan'
            );

        if ($searchText) {
            $query->where(function ($q) use ($searchText) {
                $q->where('DeviceLocation.NameDeviceLocation', 'like', '%' . $searchText . '%')
                    ->orwhere('DataUnit.NameUnit', 'like', '%' . $searchText . '%');
            });
        }

        $sortField = $request->input('sortField');
        $sortDirection = $request->input('sortOrder');
        if ($sortField) {
            $query->orderBy($sortField, $sortDirection ?? 'asc');
        }
        else
        {
            // Specify the order by clause with the table name
            $query->orderBy('DeviceLocation.updated_at', 'desc');
        }

        // Log the SQL query 
        // Log::info('SQL Query:', ['sql' => $query->toSql(), 'bindings' => $query->getBindings()]);

        // Count total rows after applying filters and sorting
        $totalRows = $query->count();

        // Calculate total pages
        $totalPages = ceil($totalRows / $pageSize);

        // Fetch the paginated results
        $deviceLocations = $query->offset($offset)
                                ->limit($pageSize)
                                ->get();

        return new PaginatedListResponse(
            $deviceLocations->toArray(),
            $page,
            $totalPages,
            $totalRows,
            $page > 0,
            $page < $totalPages - 1
        );
    }
}
