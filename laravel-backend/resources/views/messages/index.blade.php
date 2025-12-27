@extends('layouts.app')

@section('title', 'Boîte de réception')

@section('content')
<div class="container py-4">
    <h2 class="mb-4 text-2xl font-semibold text-blue-900">Mes Messages</h2>

    <a href="{{ route('messages.create') }}" class="btn btn-primary mb-3">Nouveau message</a>

    <table class="table table-striped bg-white shadow-sm">
        <thead class="bg-blue-900 text-white">
            <tr>
                <th>Expéditeur</th>
                <th>Sujet</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <!-- Exemple de ligne -->
            <tr>
                <td>agent@example.com</td>
                <td>Signalement traité</td>
                <td>2025-06-18</td>
                <td>
                    <a href="{{ route('messages.show', 1) }}" class="btn btn-sm btn-info text-white">Lire</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>
@endsection
