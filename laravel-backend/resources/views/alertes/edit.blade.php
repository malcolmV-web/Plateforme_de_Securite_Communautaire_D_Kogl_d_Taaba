@extends('layouts.app')

@section('title', 'Modifier Alerte')

@section('content')
<div class="container py-4">
    <h2 class="text-blue-900 mb-4">Modifier une Alerte</h2>

    <form action="{{ route('alertes.update', 1) }}" method="POST" class="bg-white p-4 shadow rounded">
        @csrf
        @method('PUT')

        <div class="form-group mb-3">
            <label for="titre" class="form-label">Titre</label>
            <input type="text" name="titre" id="titre" class="form-control" value="Risque d’inondation">
        </div>

        <div class="form-group mb-3">
            <label for="niveau" class="form-label">Niveau d’alerte</label>
            <select name="niveau" id="niveau" class="form-control">
                <option value="faible">Faible</option>
                <option value="moyenne" selected>Moyenne</option>
                <option value="urgente">Urgente</option>
            </select>
        </div>

        <div class="form-group mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea name="description" id="description" rows="4" class="form-control">Pluies annoncées dans la zone nord.</textarea>
        </div>

        <button type="submit" class="btn btn-success">Mettre à jour</button>
    </form>
</div>
@endsection
