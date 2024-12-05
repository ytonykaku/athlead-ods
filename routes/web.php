<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FoodController;

use Inertia\Inertia;

use App\Http\Middleware\IsAdmin;

use Illuminate\Foundation\Application;

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])
        ->middleware(['auth', 'verified'])
        ->name('dashboard');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/calendar', function () {
    return Inertia::render('Calendar');
})->middleware(['auth', 'verified'])->name('calendar');

Route::get('/exercises', function () {
    return Inertia::render('Exercises');
})->middleware(['auth', 'verified'])->name('exercises');

Route::get('/food', function () {
    return Inertia::render('Food');
})->middleware(['auth', 'verified'])->name('food');

Route::get('/diet', function () {
    return Inertia::render('Diet');
})->middleware(['auth', 'verified'])->name('diet');

Route::middleware('IsAdmin')->group(function () {

   Route::get('/admin', [AdminController::class, 'index'])->name('dashboard');

    Route::get('/exercises', [ExerciseController::class, 'index'])->name('exercises.index');
    Route::get('/exercises/{id}', [ExerciseController::class, 'show'])->name('exercises.show');
    Route::put('/exercises/{id}', [ExerciseController::class, 'update'])->name('exercises.update');
    Route::post('/exercises', [ExerciseController::class, 'store'])->name('exercises.store');
    Route::delete('/exercises/{id}', [ExerciseController::class, 'destroy'])->name('exercises.destroy');

    Route::get('/foods', [FoodController::class, 'index'])->name('foods.index');
    Route::get('/food/{id}', [FoodController::class, 'show'])->name('foods.show');
    Route::put('/food/{id}', [FoodController::class, 'update'])->name('foods.update');
    Route::post('/food', [FoodController::class, 'store'])->name('foods.store');
    Route::delete('/food/{id}', [FoodController::class, 'destroy'])->name('foods.destroy');

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

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
