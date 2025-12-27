<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return match ($user->role) {
            'admin' => view('dashboard.admin'),
            'agent' => view('dashboard.agent'),
            'citoyen' => view('dashboard.citoyen'),
            default => abort(403, 'Accès refusé'),
        };
    }
}
