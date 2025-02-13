<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ExercisesTableSeeder extends Seeder
{
    public function run()
    {
        $exercises = [
            "Supino Reto", "Agachamento Livre", "Levantamento Terra", "Rosca Direta",
            "Flexão de Braço", "Corrida na Esteira", "Cadeira Extensora",
            "Remada Baixa", "Prancha Abdominal", "Polichinelo"
        ];

        foreach ($exercises as $exercise) {
            DB::table('exercises')->insert([
                'name' => $exercise,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);
        }
    }
}