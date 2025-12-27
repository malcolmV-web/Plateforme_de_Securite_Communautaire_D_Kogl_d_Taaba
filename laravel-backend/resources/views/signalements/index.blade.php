@extends('layouts.app')

@section('title', 'Liste des Signalements')

@section('content')
<div class="container py-4">
    <h2 class="mb-4 text-2xl font-semibold text-blue-900">Mes Signalements</h2>

    <a href="{{ route('signalements.create') }}" class="btn btn-primary mb-3">Nouveau signalement</a>

    <table class="table table-bordered bg-white shadow-sm">
        <thead class="bg-blue-900 text-white">
            <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <!-- Exemple statique -->
            <tr>
                <td>1</td>
                <td>Incident signalé dans le quartier Nord</td>
                <td>2025-06-17</td>
                <td>
                    <a href="{{ route('signalements.show', 1) }}" class="btn btn-sm btn-info text-white">Voir</a>
                    <a href="{{ route('signalements.edit', 1) }}" class="btn btn-sm btn-warning text-white">Modifier</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>
@endsection
