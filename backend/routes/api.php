<?php

use App\Http\Controllers\AuditsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Define the routes for the audits API
Route::prefix('v1')->group(function () {
    Route::get('audits', [AuditsController::class, 'getAudits']);
    Route::get('audit/{id}', [AuditsController::class, 'getAudit']);
    Route::get('exportAuditsToExcel', [AuditsController::class, 'exportAuditsToExcel']);
});

// Route::middleware('auth:sanctum')->apiResource('/audits', AuditsController::class);

