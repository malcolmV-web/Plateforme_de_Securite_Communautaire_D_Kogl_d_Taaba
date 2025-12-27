<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;

class AlerteWebController extends Controller
{
    public function index()
    {
        return view('alertes.index');
    }
}
