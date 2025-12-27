@extends('layouts.app')

@section('title', 'Modifier le Signalement')

@section('content')
<div class="container py-4">
    <h2 class="mb-4 text-blue-900">Modifier le Signalement</h2>

    <form action="{{ route('signalements.update', 1) }}" method="POST" class="bg-white p-4 shadow rounded">
        @csrf
        @method('PUT')

        <div class="form-group mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea name="description" id="description" rows="4" class="form-control">Texte existant...</textarea>
        </div>

        <div class="form-group mb-3">
            <label for="lieu" class="form-label">Lieu</label>
            <input type="text" name="lieu" id="lieu" class="form-control" value="Quartier Nord, secteur 4">
        </div>

        <button type="submit" class="btn btn-success">Mettre à jour</button>
    </form>
</div>
@endsection
