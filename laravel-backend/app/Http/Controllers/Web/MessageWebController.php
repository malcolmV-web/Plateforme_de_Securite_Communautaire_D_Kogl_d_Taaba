<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MessageWebController extends Controller
{
    public function index()
    {
        return view('messages.index');
    }

    public function create()
    {
        return view('messages.create');
    }

    public function store(Request $request)
    {
        return redirect()->route('messages.index')->with('success', 'Message envoyé.');
    }

    public function show($id)
    {
        return view('messages.show', compact('id'));
    }

    public function edit($id)
    {
        return view('messages.edit', compact('id'));
    }

    public function update(Request $request, $id)
    {
        return redirect()->route('messages.index')->with('success', 'Message mis à jour.');
    }

    public function destroy($id)
    {
        return redirect()->route('messages.index')->with('success', 'Message supprimé.');
    }
}
