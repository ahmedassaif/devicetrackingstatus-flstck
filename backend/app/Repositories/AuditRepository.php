<?php

namespace App\Repositories;

use App\Interfaces\AuditRepositoryInterface;
use OwenIt\Auditing\Models\Audit;

class AuditRepository implements AuditRepositoryInterface
{
    /**
     * Create a new class instance.
     */
    
     /**
     * Get filtered and paginated audits.
     *
     * @param int $fromYear The starting year for filtering
     * @param int $toYear The ending year for filtering
     * @param int $page The current page
     * @param int $pageSize The number of records per page
     * @return array
     */
    public function index($fromYear, $toYear, $page, $pageSize)
    {
        $query = Audit::query()
            ->whereYear('created_at', '>=', $fromYear)
            ->whereYear('created_at', '<=', $toYear);

        // Handle pagination
        $total = $query->count();  // Get the total count of records that match the filter
        $audits = $query->paginate($pageSize, ['*'], 'page', $page);

        return [
            'data' => $audits->items(),  // The paginated items
            'total' => $total,            // Total count of matching records
            'current_page' => $audits->currentPage(),
            'last_page' => $audits->lastPage(),
        ];
    }

    public function getById($id){
        return Audit::findOrFail($id);
    }
}
