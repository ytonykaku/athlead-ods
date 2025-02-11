<?php

use Inertia\Inertia;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DietController;
use App\Http\Controllers\FoodController;
use App\Http\Controllers\WorkoutSheetController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CalendarController;
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

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
   
    Route::resource('workout-sheets', WorkoutSheetController::class);
    Route::resource('diet', DietController::class);
    Route::resource('calendar', CalendarController::class);
    Route::resource('exercises', ExerciseController::class);
    Route::resource('foods', FoodController::class);

    Route::post('/calendar/getEntries', [CalendarController::class, 'getEntries'])->name('calendar.getEntries');
    Route::post('/calendar/store', [CalendarController::class, 'store'])->name('calendar.store');
    
    Route::get('/foods/showID/{id}', [FoodController::class, 'showID'])->name('foods.showID');
    Route::get('/exercises/showID/{id}', [ExerciseController::class, 'showID'])->name('exercises.showID');
    Route::get('/admin', [AdminController::class, 'index'])->middleware('is-admin')->name('admin');
    
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