<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

use App\Models\Exercise;
use App\Models\Food;

class AdminController extends Controller
{
    public function index(){

        $user = Auth::user();
        $foods = Food::all();
        $exercises = Exercise::all();

        return Inertia::render('Admin', [
            'user' => $user,
            'foods' => $foods,
            'exercises' => $exercises,
        ]);
    }
}
