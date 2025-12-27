<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SignalementController;
use App\Http\Controllers\AlerteController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ConseilController;
use App\Http\Controllers\PointAccueilController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| ROUTES PUBLIQUES
|--------------------------------------------------------------------------
*/

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Conseils accessibles sans authentification
Route::get('/conseils', [ConseilController::class, 'index']);
Route::get('/conseils/{conseil}', [ConseilController::class, 'show']);

// Points d’accueil accessibles sans authentification
Route::get('/points-accueil', [PointAccueilController::class, 'index']);
Route::get('/points-accueil/{pointAccueil}', [PointAccueilController::class, 'show']);

/*
|--------------------------------------------------------------------------
| ROUTES PROTEGÉES
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum'])->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Utilisateurs (admin uniquement)
    Route::apiResource('users', UserController::class)->middleware('role:admin');

    // Signalements (citoyen et agent)
    Route::apiResource('signalements', SignalementController::class)->middleware('role:citoyen,agent');

    // Alertes (admin uniquement)
    Route::apiResource('alertes', AlerteController::class)->middleware('role:admin');

    // Messages (citoyen et agent)
    Route::apiResource('messages', MessageController::class)->middleware('role:citoyen,agent');

    // Conseils (admin uniquement)
    Route::middleware('role:admin')->group(function () {
        Route::post('/conseils', [ConseilController::class, 'store']);
        Route::put('/conseils/{conseil}', [ConseilController::class, 'update']);
        Route::delete('/conseils/{conseil}', [ConseilController::class, 'destroy']);
    });

    // Points d’accueil (admin uniquement)
    Route::middleware('role:admin')->group(function () {
        Route::post('/points-accueil', [PointAccueilController::class, 'store']);
        Route::put('/points-accueil/{pointAccueil}', [PointAccueilController::class, 'update']);
        Route::delete('/points-accueil/{pointAccueil}', [PointAccueilController::class, 'destroy']);
    });
});
