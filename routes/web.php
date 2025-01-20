<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DietController;
use App\Http\Controllers\FoodController;
use App\Http\Controllers\WorkoutSheetController;
use App\Models\Food;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/calendar', function () {
    return Inertia::render('Calendar');
})->middleware(['auth', 'verified'])->name('calendar');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
   
    Route::resource('workout-sheets', WorkoutSheetController::class);
    Route::resource('diets', DietController::class);
    
});

Route::get('/landingpage', function(){
    return Inertia::render('LandingPage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('landingpage');

Route::get('/aboutus', function(){
    return Inertia::render('AboutUs', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('aboutus');

Route::get('/services', function(){
    return Inertia::render('Services', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('services');

Route::get('/hireus', function(){
    return Inertia::render('HireUs', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('hireus');

Route::get('/exercises', [WorkoutSheetController::class, 'index'])->name('exercises');
Route::get('/diet', [DietController::class, 'index'])->name('diet');

Route::get('/exercises/show', [ExerciseController::class, 'show'])->name('exercises.show');
Route::get('/foods/show', [FoodController::class, 'show'])->name('foods.show');


require __DIR__.'/auth.php';
