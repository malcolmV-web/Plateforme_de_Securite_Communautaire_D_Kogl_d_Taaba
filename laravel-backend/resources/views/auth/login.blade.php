@extends('layouts.app')

@section('title', 'Connexion')

@section('content')
<h2>Connexion</h2>
<form method="POST" action="{{ route('login.submit') }}">
    @csrf
    <input type="email" name="email" placeholder="Email" required>
    <input type="password" name="password" placeholder="Mot de passe" required>
    <button type="submit">Se connecter</button>
</form>
@endsection
