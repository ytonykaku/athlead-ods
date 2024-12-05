<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    /**
     * Relacionamento: Um exercício pode aparecer em várias fichas.
     */
    public function workoutSheetExercises()
    {
        return $this->hasMany(WorkoutSheetExercise::class);
    }
}
