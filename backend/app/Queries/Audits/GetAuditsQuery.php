<?php
namespace App\Queries\Audits;

use App\Http\Requests\Audits\AuditOptions;
use App\Http\Requests\Audits\GetAuditsRequest;
use App\Models\Audit;
use App\Http\Responses\PaginatedListResponse;

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

        $page = (int) $request->query('page', 0);
        $pageSize = (int) $request->query('pageSize', 10);
        $offset = $pageSize * $page;

        $query = Audit::query()
            ->whereBetween('created_at', [$from, $to]);

        if ($request->searchText) {
            $query->where(function($q) use ($request) {
                $q->where('from_ip_address', 'like', '%'.$request->searchText.'%')
                  ->orWhere('action_type', 'like', '%'.$request->searchText.'%')
                  ->orWhere('action_type', 'like', '%'.$request->searchText.'%')
                  ->orWhere('entity_id', 'like', '%'.$request->searchText.'%')
                  ->orWhere('table_name', 'like', '%'.$request->searchText.'%')
                  ->orWhere('created_by', 'like', '%'.$request->searchText.'%');
            });
        }

        if ($request->sortField) {
            $query->orderBy($request->sortField, $request->sortOrder ?? 'asc');
        }

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
