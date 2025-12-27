@extends('layouts.app')

@section('title', 'Citoyen Dashboard')

@section('content')
<h2>Tableau de bord Citoyen</h2>
<ul>
    <li><a href="/signalements/create">Faire un signalement</a></li>
    <li><a href="/messages">Messages</a></li>
    <li><a href="/conseils">Lire les conseils</a></li>
</ul>
@endsection
