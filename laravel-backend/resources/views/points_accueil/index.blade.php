@extends('layouts.app')

@section('title', 'Points d’accueil')

@section('content')
<div class="container py-4">
    <h2 class="text-2xl text-blue-900 mb-4">Points d’accueil disponibles</h2>

    <a href="{{ route('points_accueil.create') }}" class="btn btn-primary mb-3">Ajouter un point d’accueil</a>

    <div class="list-group">
        <!-- Exemple de point d’accueil -->
        <a href="{{ route('points_accueil.show', 1) }}" class="list-group-item list-group-item-action">
            <h5 class="mb-1 text-blue-900">Mairie de l'Arrondissement 3</h5>
            <p class="mb-1">Ouagadougou, secteur 12</p>
        </a>
    </div>
</div>
@endsection
