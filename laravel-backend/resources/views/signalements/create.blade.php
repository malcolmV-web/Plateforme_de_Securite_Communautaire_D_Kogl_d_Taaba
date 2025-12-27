@extends('layouts.app')

@section('title', 'Nouveau Signalement')

@section('content')
<div class="container py-4">
    <h2 class="mb-4 text-2xl font-semibold text-blue-900">Faire un Signalement</h2>

    <form action="{{ route('signalements.store') }}" method="POST" class="bg-white p-4 shadow rounded">
        @csrf

        <div class="form-group mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea name="description" id="description" rows="4" class="form-control" placeholder="Décrivez le problème..."></textarea>
        </div>

        <div class="form-group mb-3">
            <label for="lieu" class="form-label">Lieu</label>
            <input type="text" name="lieu" id="lieu" class="form-control" placeholder="Ex: Quartier Nord, secteur 4">
        </div>

        <button type="submit" class="btn btn-primary">Envoyer</button>
    </form>
</div>
@endsection
