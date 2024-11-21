<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model{

    use HasFactory;

    protected $fillable = [
        'name',
    ];

    /** Gato calórico por hora peso/horafica na acadima */

}
