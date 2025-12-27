@extends('layouts.app')

@section('title', 'Modifier le mot de passe')

@section('content')
<div class="container py-4">
    <h2 class="text-blue-900 mb-4">Modifier mon mot de passe</h2>

    <form method="POST" action="{{ route('profil.password.update') }}" class="bg-white shadow p-4 rounded">
        @csrf
        @method('PUT')

        <div class="form-group mb-3">
            <label for="current_password">Mot de passe actuel</label>
            <input type="password" name="current_password" class="form-control" required>
        </div>

        <div class="form-group mb-3">
            <label for="new_password">Nouveau mot de passe</label>
            <input type="password" name="new_password" class="form-control" required>
        </div>

        <div class="form-group mb-3">
            <label for="new_password_confirmation">Confirmer le nouveau mot de passe</label>
            <input type="password" name="new_password_confirmation" class="form-control" required>
        </div>

        <button type="submit" class="btn btn-primary">Changer le mot de passe</button>
    </form>
</div>
@endsection
