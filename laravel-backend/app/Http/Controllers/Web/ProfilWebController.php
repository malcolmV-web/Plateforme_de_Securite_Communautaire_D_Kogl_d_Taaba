<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfilWebController extends Controller
{
    // Affiche le profil utilisateur
    public function show()
    {
        return view('profil.show');
    }

    // Affiche le formulaire de modification
    public function edit()
    {
        return view('profil.edit');
    }

    // Met à jour les infos de profil
    public function update(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'ville' => 'required|string|max:255',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'ville' => $request->ville,
        ]);

        return redirect()->route('profil.show')->with('success', 'Profil mis à jour avec succès.');
    }

    // Formulaire changement mot de passe
    public function password()
    {
        return view('profil.password');
    }

    // Mise à jour mot de passe
    public function updatePassword(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|string|min:6|confirmed',
        ]);

        if (!Hash::check($request->current_password, $user->password)) {
            return back()->withErrors(['current_password' => 'Mot de passe actuel incorrect.']);
        }

        $user->update([
            'password' => Hash::make($request->new_password),
        ]);

        return redirect()->route('profil.show')->with('success', 'Mot de passe mis à jour.');
    }
}
