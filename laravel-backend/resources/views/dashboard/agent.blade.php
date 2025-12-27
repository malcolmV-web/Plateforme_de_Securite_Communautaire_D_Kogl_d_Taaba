@extends('layouts.app')

@section('title', 'Agent Dashboard')

@section('content')
<h2>Tableau de bord Agent</h2>
<ul>
    <li><a href="/signalements">Voir les signalements</a></li>
    <li><a href="/messages">Messages</a></li>
</ul>
@endsection
