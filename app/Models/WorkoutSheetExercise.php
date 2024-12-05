<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkoutSheetExercise extends Model
{
    use HasFactory;

    /**
     * Os campos que podem ser preenchidos em massa (mass assignment).
     */
    protected $fillable = [
        'workout_sheet_id',
        'exercise_id',
        'sets', 
        'repetitions',
        'workload'
    ];

    /**
     * Relacionamento: Uma ficha pertence a um usuário.
     */
    public function workoutSheet()
    {
        return $this->belongsTo(workoutSheet::class);
    }

    /**
     * Relacionamento: Uma ficha de treino pode ter muitos exercícios.
     */
    public function exercise()
    {
        return $this->belogsTo(Exercise::class);
    }
}
