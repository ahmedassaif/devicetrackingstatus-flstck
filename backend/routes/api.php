<?php

use App\Http\Controllers\AuditsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('/audits',AuditsController::class);
Route::get('/audits', [AuditsController::class, 'index']);