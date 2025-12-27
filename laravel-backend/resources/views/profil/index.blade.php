@extends('layouts.app')

@section('title', 'Liste des Alertes')

@section('content')
<div class="container py-4">
    <h2 class="mb-4 text-2xl font-semibold text-blue-900">Alertes Communautaires</h2>

    @auth
        @if(Auth::user()->role === 'admin')
            <a href="{{ route('alertes.create') }}" class="btn btn-primary mb-3">Nouvelle Alerte</a>
        @endif
    @endauth

    <table class="table table-bordered bg-white shadow-sm">
        <thead class="bg-orange-500 text-white">
            <tr>
                <th>Titre</th>
                <th>Niveau</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <!-- Exemple statique -->
            <tr>
                <td>Risque d'inondation</td>
                <td><span class="badge bg-danger">Urgente</span></td>
                <td>2025-06-18</td>
                <td>
                    <a href="{{ route('alertes.show', 1) }}" class="btn btn-sm btn-info text-white">Voir</a>
                    @if(Auth::user()->role === 'admin')
                        <a href="{{ route('alertes.edit', 1) }}" class="btn btn-sm btn-warning text-white">Modifier</a>
                    @endif
                </td>
            </tr>
        </tbody>
    </table>
</div>
@endsection
