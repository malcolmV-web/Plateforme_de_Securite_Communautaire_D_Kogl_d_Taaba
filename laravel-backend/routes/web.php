<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\AuthWebController;
use App\Http\Controllers\Web\DashboardController;
use App\Http\Controllers\Web\SignalementWebController;
use App\Http\Controllers\Web\AlerteWebController;
use App\Http\Controllers\Web\MessageWebController;
use App\Http\Controllers\Web\ConseilWebController;
use App\Http\Controllers\Web\PointAccueilWebController;

// Page d'accueil (publique)
Route::get('/', function () {
    return view('accueil.welcome');
})->name('accueil');

// Authentification
Route::get('/login', [AuthWebController::class, 'showLoginForm'])->name('login.form');
Route::post('/login', [AuthWebController::class, 'login'])->name('login.submit');
Route::get('/register', [AuthWebController::class, 'showRegisterForm'])->name('register.form');
Route::post('/register', [AuthWebController::class, 'register'])->name('register.submit');
Route::post('/logout', [AuthWebController::class, 'logout'])->middleware('auth')->name('logout');

// Dashboard (redirige selon rôle)
Route::get('/dashboard', [DashboardController::class, 'index'])->middleware('auth')->name('dashboard');

// Zones protégées (CRUD classiques)
Route::middleware(['auth'])->group(function () {

    // Signalements
    Route::resource('signalements', SignalementWebController::class)->except(['edit', 'update', 'destroy']);

    // Alertes (lecture uniquement pour le citoyen)
    Route::resource('alertes', AlerteWebController::class)->only(['index', 'show']);

    // Messages (lecture uniquement)
    Route::resource('messages', MessageWebController::class)->only(['index', 'show']);

    // Conseils (lecture uniquement)
    Route::resource('conseils', ConseilWebController::class)->only(['index']);

    // Points d’accueil (lecture uniquement)
    Route::resource('points_accueil', PointAccueilWebController::class)->only(['index']);
});
