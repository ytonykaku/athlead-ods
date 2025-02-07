<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    use HasFactory;

    protected $fillable = [
        'calendar_id',
        'workoutSheet_id', 
        'diet_id',
        'user_id' 
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function workoutSheets()
    {
        return $this->hasMany(WorkoutSheet::class, 'user_id', 'id');
    }

    public function diet()
    {
        return $this->hasMany(Diet::class, 'user_id', 'id');
    }
}
