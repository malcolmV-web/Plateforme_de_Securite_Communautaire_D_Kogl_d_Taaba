<?php

namespace App\Http\Controllers;

use App\Models\Signalement;
use Illuminate\Http\Request;

class SignalementController extends Controller
{
    public function index()
    {
        return Signalement::all();
    }

    public function store(Request $request)
    {
        return Signalement::create($request->all());
    }

    public function show(Signalement $signalement)
    {
        return $signalement;
    }

    public function update(Request $request, Signalement $signalement)
    {
        $signalement->update($request->all());
        return $signalement;
    }

    public function destroy(Signalement $signalement)
    {
        $signalement->delete();
        return response()->noContent();
    }
}
