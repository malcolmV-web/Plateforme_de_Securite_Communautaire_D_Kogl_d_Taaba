<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AlerteWebController extends Controller
{
    public function index()
    {
        return view('alertes.index');
    }

    public function create()
    {
        return view('alertes.create');
    }

    public function store(Request $request)
    {
        // Enregistrement
        return redirect()->route('alertes.index')->with('success', 'Alerte créée.');
    }

    public function show($id)
    {
        return view('alertes.show', compact('id'));
    }

    public function edit($id)
    {
        return view('alertes.edit', compact('id'));
    }

    public function update(Request $request, $id)
    {
        // Mise à jour
        return redirect()->route('alertes.index')->with('success', 'Alerte mise à jour.');
    }

    public function destroy($id)
    {
        // Suppression
        return redirect()->route('alertes.index')->with('success', 'Alerte supprimée.');
    }
}
