<?php

namespace App\Http\Controllers;

use App\Interfaces\AuditRepositoryInterface;
use App\Classes\ApiResponseClass;
use App\Http\Resources\AuditResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

class AuditsController extends Controller
{
    private $auditRepositoryInterface;

    public function __construct(AuditRepositoryInterface $_auditRepositoryInterface)
    {
        $this->auditRepositoryInterface = $_auditRepositoryInterface;
    }

    /**
     * @OA\Get(
     *     path="/api/audits",
     *     tags={"Audit"},
     *     summary="Retrieve a list of audit entries",
     *     @OA\Response(
     *         response=200,
     *         description="List of audits",
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Audit")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No audits found"
     *     )
     * )
     */
    public function index(Request $request)
    {
        // Retrieve filtering and pagination parameters
        $fromYear = $request->input('from', Config::get('audits.filter_minimum_year'));
        $toYear = $request->input('to', Config::get('audits.filter_maximum_year'));
        $page = $request->input('page', 1);
        $pageSize = $request->input('page_size', 15);

        // Get filtered and paginated audit data from the repository
        $audits = $this->auditRepositoryInterface->index($fromYear, $toYear, $page, $pageSize);

        return ApiResponseClass::sendResponse(AuditResource::collection($audits['data']), '', 200, [
            'total' => $audits['total'],
            'current_page' => $audits['current_page'],
            'last_page' => $audits['last_page']
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/audits/{id}",
     *     tags={"Audit"},
     *     summary="Retrieve a single audit entry",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Audit ID",
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Audit retrieved successfully",
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(ref="#/components/schemas/Audit")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Audit not found"
     *     )
     * )
     */
    public function show($id)
    {
        $audit = $this->auditRepositoryInterface->getById($id);

        return ApiResponseClass::sendResponse(new AuditResource($audit),'',200);
    }

}
