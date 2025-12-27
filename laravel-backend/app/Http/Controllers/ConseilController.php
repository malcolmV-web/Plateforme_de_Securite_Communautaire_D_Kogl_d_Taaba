<?php

namespace App\Http\Controllers;

use App\Models\Conseil;
use Illuminate\Http\Request;

class ConseilController extends Controller
{
    public function index()
    {
        return Conseil::all();
    }

    public function store(Request $request)
    {
        return Conseil::create($request->all());
    }

    public function show(Conseil $conseil)
    {
        return $conseil;
    }

    public function update(Request $request, Conseil $conseil)
    {
        $conseil->update($request->all());
        return $conseil;
    }

    public function destroy(Conseil $conseil)
    {
        $conseil->delete();
        return response()->noContent();
    }
}
