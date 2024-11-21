<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Fetch the authenticated user
        $user = Auth::user();

        /*\Log::info('User data:', ['user' -> $user]);*/

        // Return a view with the user data
        return Inertia::render('Dashboard', [
            'user' => $user,
        ]);
    }
}
