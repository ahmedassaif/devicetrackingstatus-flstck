<?php

use App\Http\Controllers\AuditsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Use apiResource for RESTful API routes
// Route::apiResource('/audits', AuditsController::class);
Route::prefix('v1')->group(function () {
    Route::get('audits', [AuditsController::class, 'getAudits']);
});

// Route::middleware('auth:sanctum')->apiResource('/audits', AuditsController::class);

