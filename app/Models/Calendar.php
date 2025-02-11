<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'calendar_id',
        'workout_sheet_id', 
        'diet_id',
        'user_id' 
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function workoutSheet()
    {
        return $this->belongsTo(WorkoutSheet::class, 'workout_sheet_id');
    }

    public function diet()
    {
        return $this->belongsTo(Diet::class, 'diet_id');
    }
}
