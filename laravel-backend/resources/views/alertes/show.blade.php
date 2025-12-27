@extends('layouts.app')

@section('title', 'Détails Alerte')

@section('content')
<div class="container py-4">
    <h2 class="text-blue-900 mb-4">Détails de l’Alerte</h2>

    <div class="bg-white p-4 shadow rounded">
        <p><strong>Titre :</strong> Risque d’inondation</p>
        <p><strong>Niveau :</strong> <span class="badge bg-danger">Urgente</span></p>
        <p><strong>Description :</strong> De fortes pluies attendues ce soir.</p>
        <p><strong>Date :</strong> 18 juin 2025</p>

        <a href="{{ route('alertes.index') }}" class="btn btn-secondary mt-3">Retour</a>
    </div>
</div>
@endsection
