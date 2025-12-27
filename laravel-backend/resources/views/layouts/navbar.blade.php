<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
        <a class="navbar-brand" href="{{ route('accueil') }}">Sécurité Communautaire</a>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav ms-auto">
                @guest
                    <li class="nav-item"><a class="nav-link" href="{{ route('login.form') }}">Connexion</a></li>
                    <li class="nav-item"><a class="nav-link" href="{{ route('register.form') }}">Inscription</a></li>
                @else
                    <li class="nav-item"><a class="nav-link" href="{{ route('dashboard') }}">Dashboard</a></li>
                    <li class="nav-item">
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <button type="submit" class="btn btn-link nav-link">Déconnexion</button>
                        </form>
                    </li>
                @endguest
            </ul>
        </div>
    </div>
</nav>
