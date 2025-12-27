@extends('layouts.app')

@section('title', 'Modifier conseil')

@section('content')
<div class="container py-4">
    <h2 class="text-blue-900 mb-4">Modifier le conseil</h2>

    <form action="{{ route('conseils.update', 1) }}" method="POST" class="bg-white p-4 shadow rounded">
        @csrf
        @method('PUT')

        <div class="form-group mb-3">
            <label for="titre" class="form-label">Titre</label>
            <input type="text" name="titre" id="titre" class="form-control" value="Sécurisez vos accès" required>
        </div>

        <div class="form-group mb-3">
            <label for="contenu" class="form-label">Contenu</label>
            <textarea name="contenu" id="contenu" rows="5" class="form-control" required>Utilisez des mots de passe forts...</textarea>
        </div>

        <button type="submit" class="btn btn-primary">Enregistrer</button>
    </form>
</div>
@endsection
