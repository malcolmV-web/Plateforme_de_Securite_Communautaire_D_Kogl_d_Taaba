<?php

namespace App\Http\Controllers;

use App\Models\PointAccueil;
use Illuminate\Http\Request;

class PointAccueilController extends Controller
{
    public function index()
    {
        return PointAccueil::all();
    }

    public function store(Request $request)
    {
        return PointAccueil::create($request->all());
    }

    public function show(PointAccueil $pointAccueil)
    {
        return $pointAccueil;
    }

    public function update(Request $request, PointAccueil $pointAccueil)
    {
        $pointAccueil->update($request->all());
        return $pointAccueil;
    }

    public function destroy(PointAccueil $pointAccueil)
    {
        $pointAccueil->delete();
        return response()->noContent();
    }
}
