<?php

namespace App\Http\Controllers;

use App\Queries\GetAuditsQuery;
use App\Http\Requests\PaginatedListRequest;
use App\Helpers\PaginatedList;

class AuditsController extends Controller
{
    protected $query;

    public function __construct(GetAuditsQuery $query)
    {
        $this->query = $query;
    }

    public function getAudits(PaginatedListRequest $request)
    {
        $queryParams = $request->getQueryParameters();

        $result = $this->query->handle($queryParams);

        return response()->json(PaginatedList::fromLaravelPagination($result));
    }
}
