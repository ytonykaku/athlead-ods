<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DietMeal extends Model
{
    use HasFactory;

    protected $fillable = [
        'diet_id', // Relaciona com a dieta
        'food_id', // Relaciona com o alimento
        'amount',  // Quantidade
        'shift',   // Horário
    ];

    public function diet()
    {
        return $this->belongsTo(Diet::class);
    }

    public function food()
    {
        return $this->belongsTo(Food::class);
    }
}
