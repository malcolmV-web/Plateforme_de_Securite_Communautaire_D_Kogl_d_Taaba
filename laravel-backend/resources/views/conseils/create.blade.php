@extends('layouts.app')

@section('title', 'Nouveau conseil')

@section('content')
<div class="container py-4">
    <h2 class="text-blue-900 mb-4">Ajouter un conseil de sécurité</h2>

    <form action="{{ route('conseils.store') }}" method="POST" class="bg-white p-4 shadow rounded">
        @csrf

        <div class="form-group mb-3">
            <label for="titre" class="form-label">Titre</label>
            <input type="text" name="titre" id="titre" class="form-control" required>
        </div>

        <div class="form-group mb-3">
            <label for="contenu" class="form-label">Contenu</label>
            <textarea name="contenu" id="contenu" rows="5" class="form-control" required></textarea>
        </div>

        <button type="submit" class="btn btn-primary">Publier</button>
    </form>
</div>
@endsection
