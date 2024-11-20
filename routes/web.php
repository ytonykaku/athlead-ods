<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ExerciseController;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/calendar', function () {
    return Inertia::render('Calendar');
})->middleware(['auth', 'verified'])->name('calendar');

Route::get('/exercises', function () {
    return Inertia::render('Exercises');
})->middleware(['auth', 'verified'])->name('exercises');

Route::get('/diet', function () {
    return Inertia::render('Diet');
})->middleware(['auth', 'verified'])->name('diet');

Route::get('/communities', function () {
    return Inertia::render('Communities');
})->middleware(['auth', 'verified'])->name('communities');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //Route::get('/exercises', [ExerciseController::class, 'index'])->name('exercises.index');
    //Route::get('/exercises/{id}', [ExerciseController::class, 'show'])->name('exercises.show');
    //Route::put('/exercises/{id}', [ExerciseController::class, 'update'])->name('exercises.update');
    //Route::post('/exercises', [ExerciseController::class, 'store'])->name('exercises.store');
    //Route::delete('/exercises/{id}', [ExerciseController::class, 'destroy'])->name('exercises.destroy');
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

require __DIR__.'/auth.php';
