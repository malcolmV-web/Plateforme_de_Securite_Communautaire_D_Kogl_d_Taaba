@extends('layouts.app')

@section('title', 'Admin Dashboard')

@section('content')
<h2>Tableau de bord Admin</h2>
<ul>
    <li><a href="/alertes">Gérer les alertes</a></li>
    <li><a href="/conseils">Gérer les conseils</a></li>
    <li><a href="/points-accueil">Gérer les points d’accueil</a></li>
    <li><a href="/users">Gérer les utilisateurs</a></li>
</ul>
@endsection
