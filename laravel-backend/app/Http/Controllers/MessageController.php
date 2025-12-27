<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {
        return Message::all();
    }

    public function store(Request $request)
    {
        return Message::create($request->all());
    }

    public function show(Message $message)
    {
        return $message;
    }

    public function update(Request $request, Message $message)
    {
        $message->update($request->all());
        return $message;
    }

    public function destroy(Message $message)
    {
        $message->delete();
        return response()->noContent();
    }
}
