<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>@yield('title') | Sécurité Communautaire</title>

    <!-- Typo et Bootstrap -->
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            background-color: #f9fafb;
        }
        .sidebar {
            min-height: 100vh;
            background-color: #1E3A8A;
            color: white;
        }
        .sidebar a {
            color: white;
            text-decoration: none;
            padding: 10px 15px;
            display: block;
        }
        .sidebar a:hover {
            background-color: #2c5282;
        }
    </style>
</head>
<body>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <a class="navbar-brand" href="{{ route('accueil') }}">Sécurité Communautaire</a>
        <div class="ms-auto">
            @auth
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button class="btn btn-light">Déconnexion</button>
                </form>
            @else
                <a href="{{ route('login.form') }}" class="btn btn-outline-light me-2">Connexion</a>
                <a href="{{ route('register.form') }}" class="btn btn-light">Inscription</a>
            @endauth
        </div>
    </nav>

    <div class="container-fluid">
        <div class="row">
            @auth
            <!-- Sidebar -->
            <div class="col-md-2 sidebar">
                <h5 class="mt-3 text-center">Menu</h5>
                <a href="{{ route('dashboard') }}">Dashboard</a>
                <a href="{{ route('signalements.index') }}">Signalements</a>
                <a href="{{ route('alertes.index') }}">Alertes</a>
                <a href="{{ route('messages.index') }}">Messages</a>
                <a href="{{ route('conseils.index') }}">Conseils</a>
                <a href="{{ route('points_accueil.index') }}">Points d’accueil</a>
                <a href="{{ route('dashboard') }}">Profil</a>
            </div>
            @endauth

            <!-- Contenu principal -->
            <main class="@auth col-md-10 @else col-12 @endauth p-4">
                @yield('content')
            </main>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-light text-center py-3 mt-5 border-top">
        &copy; {{ date('Y') }} Sécurité Communautaire. Tous droits réservés.
    </footer>

</body>
</html>
