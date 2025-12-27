<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PointAccueilWebController extends Controller
{
    public function index()
    {
        return view('points_accueil.index');
    }

    public function create()
    {
        return view('points_accueil.create');
    }

    public function store(Request $request)
    {
        return redirect()->route('points_accueil.index')->with('success', 'Point d’accueil ajouté.');
    }

    public function show($id)
    {
        return view('points_accueil.show', compact('id'));
    }

    public function edit($id)
    {
        return view('points_accueil.edit', compact('id'));
    }

    public function update(Request $request, $id)
    {
        return redirect()->route('points_accueil.index')->with('success', 'Point d’accueil mis à jour.');
    }

    public function destroy($id)
    {
        return redirect()->route('points_accueil.index')->with('success', 'Point d’accueil supprimé.');
    }
}
