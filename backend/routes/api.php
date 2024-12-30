<?php

use App\Http\Controllers\AuditsController;
use App\Http\Controllers\DataUnitsController;
use App\Http\Controllers\DeviceLocationsController;
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

// Define the routes for the DataUnits API
Route::prefix('v1')->group(function () {
    Route::get('dataUnits', [DataUnitsController::class, 'getDataUnits']);
    Route::get('dataUnit/{id}', [DataUnitsController::class, 'getDataUnit']);
    Route::get('exportDataUnitsToExcel', [DataUnitsController::class, 'exportDataUnitsToExcel']);
    Route::post('dataUnit', [DataUnitsController::class, 'insertDataUnit']);
    Route::put('dataUnit/{id}', [DataUnitsController::class, 'updateDataUnit']);
    Route::delete('dataUnit/{id}', [DataUnitsController::class, 'deleteDataUnit']);
    Route::get('getLookupAllDataUnits', [DataUnitsController::class, 'getLookupAllDataUnits']);
});

// Define the routes for the DeviceLocations API
Route::prefix('v1')->group(function () {
    Route::get('deviceLocations', [DeviceLocationsController::class, 'getDeviceLocations']);
    Route::get('deviceLocation/{id}', [DeviceLocationsController::class, 'getDeviceLocation']);
    Route::get('exportDeviceLocationsToExcel', [DeviceLocationsController::class, 'exportDeviceLocationsToExcel']);
    Route::post('deviceLocation', [DeviceLocationsController::class, 'insertDeviceLocation']);
    Route::put('deviceLocation/{id}', [DeviceLocationsController::class, 'updateDeviceLocation']);
    Route::delete('deviceLocation/{id}', [DeviceLocationsController::class, 'deleteDeviceLocation']);
    Route::get('getLookupAllDeviceLocations', [DeviceLocationsController::class, 'getLookupAllDeviceLocations']);
});

// Route::middleware('auth:sanctum')->apiResource('/audits', AuditsController::class);
