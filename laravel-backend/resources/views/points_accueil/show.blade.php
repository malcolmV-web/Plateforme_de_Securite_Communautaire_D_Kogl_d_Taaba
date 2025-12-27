@extends('layouts.app')

@section('title', 'Détail du point d’accueil')

@section('content')
<div class="container py-4">
    <h2 class="text-blue-900 mb-3">Détail du point d’accueil</h2>

    <div class="bg-white p-4 shadow rounded">
        <h4 class="text-blue-900">Mairie de l'Arrondissement 3</h4>
        <p><strong>Adresse :</strong> Ouagadougou, secteur 12</p>
        <p><strong>Contact :</strong> 70 00 00 00</p>

        <div class="mt-3">
            <a href="{{ route('points_accueil.index') }}" class="btn btn-secondary">Retour</a>
            <a href="{{ route('points_accueil.edit', 1) }}" class="btn btn-success">Modifier</a>
        </div>
    </div>
</div>
@endsection
