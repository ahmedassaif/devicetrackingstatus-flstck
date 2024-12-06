<?php
namespace App\Queries;

use App\Models\Audit;

class GetAuditsQuery
{
    public function handle(array $params)
    {
        $perPage = $params['per_page'] ?? 10;
        $searchKeyword = $params['search'] ?? '';
        $from = $params['from'] ?? null;
        $to = $params['to'] ?? null;

        $query = Audit::query();

        // Search keyword filter
        if (!empty($searchKeyword)) {
            $query->where('auditable_type', 'LIKE', "%{$searchKeyword}%")
                  ->orWhere('event', 'LIKE', "%{$searchKeyword}%")
                  ->orWhere('ip_address', 'LIKE', "%{$searchKeyword}%");
        }

        // Date range filter
        if ($from && $to) {
            $query->whereBetween('created_at', [$from, $to]);
        }

        // Paginate results
        return $query->paginate($perPage);
    }
}
