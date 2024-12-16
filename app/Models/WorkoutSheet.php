<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkoutSheet extends Model
{
    use HasFactory;

    /**
     * Os campos que podem ser preenchidos em massa (mass assignment).
     */
    protected $fillable = [
        'name',
        'user_id',
    ];

    /**
     * Relacionamento: Uma ficha pertence a um usuário.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Relacionamento: Uma ficha de treino pode ter muitos exercícios.
     */
    public function exercises()
    {
        return $this->hasMany(WorkoutSheetExercise::class);
    }
}
