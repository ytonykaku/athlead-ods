<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Food extends Model{
    
    use HasFactory;
    
    protected $table = 'foods';

    protected $fillable = [
        'name',
        'calories',
        'carbs',
        'fat',
        'protein',
    ];
    /**
     * Relacionamento: Um comida pode aparecer em várias dietas.
     */
    public function DietSheetMeal(){

        return $this->hasMany(DietSheetMeal::class);
    }
}
