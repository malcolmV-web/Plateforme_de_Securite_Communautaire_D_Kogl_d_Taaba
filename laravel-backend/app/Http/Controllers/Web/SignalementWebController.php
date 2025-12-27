<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SignalementWebController extends Controller
{
    public function index()
    {
        return view('signalements.index');
    }

    public function create()
    {
        return view('signalements.create');
    }

    public function store(Request $request)
    {
        // Validation et logique d'enregistrement ici
        return redirect()->route('signalements.index')->with('success', 'Signalement créé.');
    }

    public function show($id)
    {
        return view('signalements.show', compact('id'));
    }

    public function edit($id)
    {
        return view('signalements.edit', compact('id'));
    }

    public function update(Request $request, $id)
    {
        // Validation et mise à jour ici
        return redirect()->route('signalements.index')->with('success', 'Signalement mis à jour.');
    }

    public function destroy($id)
    {
        // Suppression ici
        return redirect()->route('signalements.index')->with('success', 'Signalement supprimé.');
    }
}
