@extends('layouts.app')

@section('title', 'Nouveau Message')

@section('content')
<div class="container py-4">
    <h2 class="text-blue-900 mb-4">Envoyer un Message</h2>

    <form action="{{ route('messages.store') }}" method="POST" class="bg-white p-4 shadow rounded">
        @csrf

        <div class="form-group mb-3">
            <label for="destinataire" class="form-label">Destinataire (email)</label>
            <input type="email" name="destinataire" id="destinataire" class="form-control" placeholder="ex: agent@example.com" required>
        </div>

        <div class="form-group mb-3">
            <label for="sujet" class="form-label">Sujet</label>
            <input type="text" name="sujet" id="sujet" class="form-control" required>
        </div>

        <div class="form-group mb-3">
            <label for="contenu" class="form-label">Message</label>
            <textarea name="contenu" id="contenu" rows="5" class="form-control" required></textarea>
        </div>

        <button type="submit" class="btn btn-primary">Envoyer</button>
    </form>
</div>
@endsection
