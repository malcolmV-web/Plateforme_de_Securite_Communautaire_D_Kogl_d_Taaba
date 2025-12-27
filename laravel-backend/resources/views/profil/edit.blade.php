@extends('layouts.app')

@section('title', 'Modifier Profil')

@section('content')
<div class="container py-4">
    <h2 class="text-blue-900 mb-4">Modifier mes informations</h2>

    <form method="POST" action="{{ route('profil.update') }}" class="bg-white shadow p-4 rounded">
        @csrf
        @method('PUT')

        <div class="form-group mb-3">
            <label for="name">Nom</label>
            <input type="text" name="name" class="form-control" value="{{ Auth::user()->name }}" required>
        </div>

        <div class="form-group mb-3">
            <label for="email">Email</label>
            <input type="email" name="email" class="form-control" value="{{ Auth::user()->email }}" required>
        </div>

        <div class="form-group mb-3">
            <label for="ville">Ville</label>
            <input type="text" name="ville" class="form-control" value="{{ Auth::user()->ville }}" required>
        </div>

        <button type="submit" class="btn btn-primary">Enregistrer les modifications</button>
    </form>
</div>
@endsection
