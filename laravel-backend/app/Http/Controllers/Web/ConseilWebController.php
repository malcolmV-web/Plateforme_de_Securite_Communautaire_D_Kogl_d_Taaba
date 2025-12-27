<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ConseilWebController extends Controller
{
    public function index()
    {
        return view('conseils.index');
    }

    public function create()
    {
        return view('conseils.create');
    }

    public function store(Request $request)
    {
        return redirect()->route('conseils.index')->with('success', 'Conseil créé.');
    }

    public function show($id)
    {
        return view('conseils.show', compact('id'));
    }

    public function edit($id)
    {
        return view('conseils.edit', compact('id'));
    }

    public function update(Request $request, $id)
    {
        return redirect()->route('conseils.index')->with('success', 'Conseil mis à jour.');
    }

    public function destroy($id)
    {
        return redirect()->route('conseils.index')->with('success', 'Conseil supprimé.');
    }
}
