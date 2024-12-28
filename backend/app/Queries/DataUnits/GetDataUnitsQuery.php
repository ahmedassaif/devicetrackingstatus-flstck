<?php
namespace App\Queries\DataUnits;

use App\Http\Requests\DataUnits\GetDataUnitsRequest;
use Illuminate\Support\Facades\DB;
use App\Http\Responses\PaginatedListResponse;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\DataUnits\DataUnitOptions;

class GetDataUnitsQuery
{
    protected $dataUnitOptions;

    public function __construct(DataUnitOptions $dataUnitOptions)
    {
        $this->dataUnitOptions = $dataUnitOptions;
    }

    public function getDataUnits(GetDataUnitsRequest $request)
    {
        $from = optional($request)->from ?? $this->dataUnitOptions->getFilterMinimumCreated();
        $to = optional($request)->to ?? $this->dataUnitOptions->getFilterMaximumCreated();

        $page = (int) $request->query('page', 1);
        $pageSize = (int) $request->query('pageSize', 10);
        $offset = ($page - 1) * $pageSize; // Adjust for one-based index
        
        $query = DB::table('DataUnit')
            ->whereBetween('created_at', [$from, $to])
            ->whereNull('deleted_at'); // Ensure only non-deleted records are retrieved
        
        $searchText = (string) $request->query('searchText', ''); // Explicitly cast to string

        if ($searchText) {
            $query->where(function ($q) use ($searchText) {
                $q->where('NameUnit', 'like', '%' . $searchText . '%')
                  ->orWhere('Plan', 'like', '%' . $searchText . '%');
            });
        }

        $sortField = $request->input('sortField');
        $sortDirection = $request->input('sortOrder');
        if ($sortField) {
            $query->orderBy($sortField, $sortDirection ?? 'asc');
        }
        else
        {
            $query->orderBy('updated_at', 'desc');
        }

        // Log the SQL query 
        // Log::info('SQL Query:', ['sql' => $query->toSql(), 'bindings' => $query->getBindings()]);

        // Count total rows after applying filters and sorting
        $totalRows = $query->count();

        // Calculate total pages
        $totalPages = ceil($totalRows / $pageSize);

        // Fetch the paginated results
        $dataUnits = $query->offset($offset)
                           ->limit($pageSize)
                           ->get();

        return new PaginatedListResponse(
            $dataUnits->toArray(),
            $page,
            $totalPages,
            $totalRows,
            $page > 0,
            $page < $totalPages - 1
        );
    }
}
