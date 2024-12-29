<?php
namespace App\Http\Queries\Audits;

use App\Http\Requests\Audits\AuditOptions;
use App\Http\Requests\Audits\GetAuditsRequest;
use Illuminate\Support\Facades\DB;
use App\Http\Responses\PaginatedListResponse;
use Illuminate\Support\Facades\Log;



class GetAuditsQuery
{
    protected $auditOptions;

    public function __construct(AuditOptions $auditOptions)
    {
        $this->auditOptions = $auditOptions;
    }

    public function getAudits(GetAuditsRequest $request)
    {
        $from = optional($request)->from ?? $this->auditOptions->getFilterMinimumCreated();
        $to = optional($request)->to ?? $this->auditOptions->getFilterMaximumCreated();
        Log::info('Request data:', $request->all());

        $page = (int) $request->query('page', 1);
        $pageSize = (int) $request->query('pageSize', 10);
        $offset = ($page - 1) * $pageSize; // Adjust for one-based index
        
        $query = DB::table('audits')
            ->whereBetween('created_at', [$from, $to]);
        
        $searchText = (string) $request->query('searchText', '');  // Explicitly cast to string

        if ($searchText) {
            // Check if the search text is a valid IP address
            if (filter_var($searchText, FILTER_VALIDATE_IP)) {
                // Exact match for IP address
                $query->where('ip_address', [$searchText]);
            } 

            $query->where(function ($q) use ($searchText) {         
                // Other fields for partial match
                $q->Where('user_id', 'like', '%' . $searchText . '%')
                  ->orWhere('user_type', 'like', '%' . $searchText . '%')
                  ->orWhere('user_agent', 'like', '%' . $searchText . '%')
                  ->orWhere('event', 'like', '%' . $searchText . '%')
                  ->orWhere('auditable_id', 'like', '%' . $searchText . '%')
                  ->orWhere('url', 'like', '%' . $searchText . '%')
                  ->orWhere('tags', 'like', '%' . $searchText . '%')
                  ->orWhere('auditable_type', 'like', '%' . $searchText . '%');
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
        Log::info('SQL Query:', ['sql' => $query->toSql(), 'bindings' => $query->getBindings()]);

        // Count total rows after applying filters and sorting
        $totalRows = $query->count();
        
        // Calculate total pages
        $totalPages = ceil($totalRows / $pageSize);
        
        // Fetch the paginated results
        $audits = $query->offset($offset)
                         ->limit($pageSize)
                         ->get();

    return new PaginatedListResponse(
                $audits->toArray(),
                $page,
                $totalPages,
                $totalRows,
                $page > 0,
                $page < $totalPages - 1
                );                     
    }
}
