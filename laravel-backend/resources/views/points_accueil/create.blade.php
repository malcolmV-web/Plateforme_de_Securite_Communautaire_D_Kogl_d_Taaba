@extends('layouts.app')

@section('title', 'Nouveau point d’accueil')

@section('content')
<div class="container py-4">
    <h2 class="text-blue-900 mb-4">Ajouter un point d’accueil</h2>

    <form action="{{ route('points_accueil.store') }}" method="POST" class="bg-white p-4 shadow rounded">
        @csrf

        <div class="form-group mb-3">
            <label for="nom" class="form-label">Nom</label>
            <input type="text" name="nom" id="nom" class="form-control" required>
        </div>

        <div class="form-group mb-3">
            <label for="adresse" class="form-label">Adresse</label>
            <input type="text" name="adresse" id="adresse" class="form-control" required>
        </div>

        <div class="form-group mb-3">
            <label for="contact" class="form-label">Contact</label>
            <input type="text" name="contact" id="contact" class="form-control">
        </div>

        <button type="submit" class="btn btn-primary">Enregistrer</button>
    </form>
</div>
@endsection
