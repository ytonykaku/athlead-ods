<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Criando o usuário administrador
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('123456789'),
            'is_admin'=> true,
        ]);

        // Executando o script SQL populate.sql
        $sqlFile = database_path('populate.sql');

        if (file_exists($sqlFile)) {
            DB::unprepared(file_get_contents($sqlFile));
            echo "\n🚀 Script populate.sql executado com sucesso!\n";
        } else {
            echo "\n⚠️ Arquivo populate.sql não encontrado!\n";
        }
    }
}
