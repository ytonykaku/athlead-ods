<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExerciseController extends Controller
{
    /**
     * Exibe a lista de exercícios.
     */
    public function index()
    {
        $user = Auth::user();
        $exercises = Exercise::all(); // Busca todos os exercícios

        return Inertia::render('Exercises', [
            'user' => $user,
            'exercises' => $exercises, // Passa os exercícios para a view
        ]);
    }

    /**
     * Exibe um exercício específico.
     */
    public function show(Request $request)
    {
        $name = $request->query('name'); // Verifica se um nome foi passado como parâmetro
        $query = Exercise::select('id', 'name');

        if ($name) {
            $query->where('name', $name);
        }

        $exercises = $query->get();

        return response()->json($exercises);
    }

    /**
     * Armazena um novo exercício no banco de dados.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $exercise = Exercise::create([
            'name' => $request->input('name'),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Exercício criado com sucesso!',
            'exercise' => $exercise,
        ], 201); // Retorna uma resposta JSON
    }

    /**
     * Atualiza um exercício existente.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $exercise = Exercise::findOrFail($id); // Busca o exercício pelo ID
        $exercise->update([
            'name' => $request->input('name'),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Exercício atualizado com sucesso!',
            'exercise' => $exercise,
        ], 200); // Retorna uma resposta JSON
    }

    public function showID($id){ 
        $exercise = Exercise::findOrFail($id); // Busca o exercício pelo ID
        
        return response()->json($exercise);
    }
    /**
     * Remove um exercício específico.
     */
    public function destroy(string $id)
    {
        $exercise = Exercise::findOrFail($id); // Busca o exercício pelo ID
        $exercise->delete();

        return response()->json([
            'success' => true,
            'message' => 'Exercício excluído com sucesso!',
        ], 200); // Retorna uma resposta JSON
    }
}