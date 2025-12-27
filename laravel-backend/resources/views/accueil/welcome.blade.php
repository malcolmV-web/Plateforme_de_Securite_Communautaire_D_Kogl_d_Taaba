@extends('layouts.app')

@section('title', 'Accueil')

@section('content')
    <div class="text-center">
        <h1 class="mb-4">Bienvenue sur la Plateforme de Sécurité Communautaire</h1>
        <p>Signalez des incidents, recevez des alertes, et collaborez pour votre sécurité.</p>
        <a href="{{ route('login.form') }}" class="btn btn-primary mt-3">Connexion</a>
        <a href="{{ route('register.form') }}" class="btn btn-outline-secondary mt-3">Créer un compte</a>
    </div>
@endsection
