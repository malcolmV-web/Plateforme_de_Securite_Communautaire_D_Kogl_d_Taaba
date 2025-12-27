@extends('layouts.app')

@section('title', 'Détail du conseil')

@section('content')
<div class="container py-4">
    <h2 class="text-blue-900 mb-3">Détail du conseil</h2>

    <div class="bg-white p-4 shadow rounded">
        <h4 class="text-blue-900">Sécurisez vos accès</h4>
        <p>Utilisez des mots de passe forts et uniques pour chaque service. Activez l’authentification à deux facteurs quand c’est possible.</p>

        <div class="mt-3">
            <a href="{{ route('conseils.index') }}" class="btn btn-secondary">Retour</a>
            <a href="{{ route('conseils.edit', 1) }}" class="btn btn-success">Modifier</a>
        </div>
    </div>
</div>
@endsection
