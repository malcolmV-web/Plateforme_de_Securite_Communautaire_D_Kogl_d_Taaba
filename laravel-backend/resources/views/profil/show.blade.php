@extends('layouts.app')

@section('title', 'Mon Profil')

@section('content')
<div class="container py-4">
    <h2 class="text-blue-900 mb-4">Mon Profil</h2>

    <div class="bg-white shadow p-4 rounded">
        <p><strong>Nom :</strong> {{ Auth::user()->name }}</p>
        <p><strong>Email :</strong> {{ Auth::user()->email }}</p>
        <p><strong>Ville :</strong> {{ Auth::user()->ville }}</p>
        <p><strong>Rôle :</strong> {{ Auth::user()->role }}</p>

        <a href="{{ route('profil.edit') }}" class="btn btn-success mt-3">Modifier mes informations</a>
        <a href="{{ route('profil.password') }}" class="btn btn-warning mt-3">Modifier le mot de passe</a>
    </div>
</div>
@endsection
