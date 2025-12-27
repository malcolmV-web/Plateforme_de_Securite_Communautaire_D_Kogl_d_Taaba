@extends('layouts.app')

@section('title', 'Message')

@section('content')
<div class="container py-4">
    <h2 class="text-blue-900 mb-4">Message reçu</h2>

    <div class="bg-white p-4 shadow rounded">
        <p><strong>Expéditeur :</strong> agent@example.com</p>
        <p><strong>Sujet :</strong> Signalement traité</p>
        <p><strong>Date :</strong> 18 juin 2025</p>
        <hr>
        <p><strong>Contenu :</strong></p>
        <p>Votre signalement a été pris en compte et est en cours de traitement. Merci pour votre vigilance.</p>

        <a href="{{ route('messages.index') }}" class="btn btn-secondary mt-3">Retour</a>
    </div>
</div>
@endsection
