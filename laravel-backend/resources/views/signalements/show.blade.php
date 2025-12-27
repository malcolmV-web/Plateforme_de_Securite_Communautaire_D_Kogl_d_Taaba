@extends('layouts.app')

@section('title', 'Détails du Signalement')

@section('content')
<div class="container py-4">
    <h2 class="text-blue-900 mb-4">Détails du Signalement</h2>

    <div class="bg-white p-4 shadow rounded">
        <p><strong>Description :</strong> Incident signalé dans le quartier Nord</p>
        <p><strong>Lieu :</strong> Quartier Nord, secteur 4</p>
        <p><strong>Date :</strong> 17 juin 2025</p>

        <a href="{{ route('signalements.index') }}" class="btn btn-secondary mt-3">Retour</a>
    </div>
</div>
@endsection
