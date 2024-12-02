<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OwenIt\Auditing\Models\Audit;
use App\Interfaces\AuditRepositoryInterface;
use App\Classes\ApiResponseClass;
use App\Http\Resources\AuditResource;
use Illuminate\Support\Facades\DB;


class AuditsController extends Controller
{
    private AuditRepositoryInterface $auditRepositoryInterface;
    
    public function __construct(AuditRepositoryInterface $AuditRepositoryInterface)
    {
        $this->auditRepositoryInterface = $AuditRepositoryInterface;
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
    public function index()
    {
        $data = $this->auditRepositoryInterface->index();

        return ApiResponseClass::sendResponse(AuditResource::collection($data),'',200);
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
