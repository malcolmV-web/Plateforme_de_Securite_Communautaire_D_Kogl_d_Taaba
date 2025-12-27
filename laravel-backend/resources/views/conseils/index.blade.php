@extends('layouts.app')

@section('title', 'Conseils de sécurité')

@section('content')
<div class="container py-4">
    <h2 class="text-2xl text-blue-900 mb-4">Conseils de sécurité</h2>

    <a href="{{ route('conseils.create') }}" class="btn btn-primary mb-3">Ajouter un conseil</a>

    <div class="list-group">
        <!-- Exemple de conseil -->
        <a href="{{ route('conseils.show', 1) }}" class="list-group-item list-group-item-action">
            <h5 class="mb-1 text-blue-900">Sécurisez vos accès</h5>
            <p class="mb-1">Utilisez des mots de passe forts et uniques pour chaque service.</p>
        </a>
    </div>
</div>
@endsection
