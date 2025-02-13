<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class FoodsTableSeeder extends Seeder
{
    public function run()
    {
        $foods = [
            ['name' => 'Banana', 'calories' => 89, 'carbs' => 23.0, 'fat' => 0.3, 'protein' => 1.1],
            ['name' => 'Frango Grelhado', 'calories' => 165, 'carbs' => 0.0, 'fat' => 3.6, 'protein' => 31.0],
            ['name' => 'Arroz Integral', 'calories' => 111, 'carbs' => 23.0, 'fat' => 0.9, 'protein' => 2.6],
            ['name' => 'Ovo Cozido', 'calories' => 78, 'carbs' => 0.6, 'fat' => 5.3, 'protein' => 6.3],
            ['name' => 'Maçã', 'calories' => 52, 'carbs' => 14.0, 'fat' => 0.2, 'protein' => 0.3],
            ['name' => 'Salmão', 'calories' => 208, 'carbs' => 0.0, 'fat' => 13.0, 'protein' => 20.0],
            ['name' => 'Batata Doce', 'calories' => 86, 'carbs' => 20.1, 'fat' => 0.1, 'protein' => 1.6],
            ['name' => 'Amêndoas', 'calories' => 579, 'carbs' => 21.6, 'fat' => 49.9, 'protein' => 21.2],
            ['name' => 'Iogurte Natural', 'calories' => 59, 'carbs' => 3.6, 'fat' => 3.3, 'protein' => 5.0],
            ['name' => 'Abacate', 'calories' => 160, 'carbs' => 8.5, 'fat' => 14.7, 'protein' => 2.0],
        ];

        foreach ($foods as $food) {
            DB::table('foods')->insert([
                'name' => $food['name'],
                'calories' => $food['calories'],
                'carbs' => $food['carbs'],
                'fat' => $food['fat'],
                'protein' => $food['protein'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);
        }
    }
}