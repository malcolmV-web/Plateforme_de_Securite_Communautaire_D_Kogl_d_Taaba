<form method="POST" action="{{ route('register.submit') }}">
    @csrf
    <input type="text" name="nom" placeholder="Nom" required>
    <input type="email" name="email" placeholder="Email" required>
    <input type="password" name="mot_de_passe" placeholder="Mot de passe" required>
    <input type="password" name="mot_de_passe_confirmation" placeholder="Confirmer le mot de passe" required>
    <input type="text" name="ville" placeholder="Ville" required>
    <select name="role" required>
        <option value="citoyen">Citoyen</option>
        <option value="agent">Agent</option>
        <option value="admin">Admin</option>
    </select>
    <button type="submit">S'inscrire</button>
</form>
