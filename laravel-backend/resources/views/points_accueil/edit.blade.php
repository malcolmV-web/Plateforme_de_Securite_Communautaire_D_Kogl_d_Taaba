@extends('layouts.app')

@section('title', 'Modifier le point d’accueil')

@section('content')
<div class="container py-4">
    <h2 class="text-blue-900 mb-4">Modifier le point d’accueil</h2>

    <form action="{{ route('points_accueil.update', 1) }}" method="POST" class="bg-white p-4 shadow rounded">
        @csrf
        @method('PUT')

        <div class="form-group mb-3">
            <label for="nom" class="form-label">Nom</label>
            <input type="text" name="nom" id="nom" class="form-control" value="Mairie de l'Arrondissement 3" required>
        </div>

        <div class="form-group mb-3">
            <label for="adresse" class="form-label">Adresse</label>
            <input type="text" name="adresse" id="adresse" class="form-control" value="Ouagadougou, secteur 12" required>
        </div>

        <div class="form-group mb-3">
            <label for="contact" class="form-label">Contact</label>
            <input type="text" name="contact" id="contact" class="form-control" value="70 00 00 00">
        </div>

        <button type="submit" class="btn btn-primary">Mettre à jour</button>
    </form>
</div>
@endsection
