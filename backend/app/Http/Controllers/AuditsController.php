<?php

namespace App\Http\Controllers;

use App\Queries\Audits\GetAuditsQuery;
use App\Http\Requests\Audits\GetAuditsRequest;
use OpenApi\Annotations as OA;

class AuditsController extends Controller
{
    protected $getAuditsQuery;

    public function __construct(GetAuditsQuery $getAuditsQuery)
    {
        $this->getAuditsQuery = $getAuditsQuery;
    }

    /**
     * @OA\Get(
     *     path="/api/v1/audits",
     *     summary="Get Audits",
     *     description="Returns a paginated list of audits with filters",
     *     tags={"Audits"},
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
     *         description="Returns a paginated list of audits",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="items",
     *                 type="array",
     *                 @OA\Items(type="object", ref="#/components/schemas/Audit")
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
    public function getAudits(GetAuditsRequest $request)
    {
        // Call the query service to fetch audits
        $paginatedAudits = $this->getAuditsQuery->getAudits($request);

        // Ensure the response is converted to an array for JSON serialization
        return response()->json($paginatedAudits->toArray());
    }

}
