<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FoodController extends Controller
{
    /**
     * Exibe a lista de alimentos.
     */
    public function index()
    {
        $user = Auth::user();
        $foods = Food::all(); // Busca todos os alimentos

        return Inertia::render('Foods', [
            'user' => $user,
            'foods' => $foods, // Passa os alimentos para a view
        ]);
    }

    /**
     * Exibe um alimento específico.
     */
    public function show(Request $request)
    {
        $name = $request->query('name'); // Verifica se um nome foi passado como parâmetro
        $query = Food::select('id', 'name', 'calories', 'carbs', 'fat', 'protein');

        if ($name) {
            $query->where('name', $name);
        }

        $foods = $query->get();

        return response()->json($foods);
    }

    /**
     * Armazena um novo alimento no banco de dados.
     */
    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'calories' => 'required|numeric', // Corrigido para numeric
        'carbs' => 'required|numeric',    // Corrigido para numeric
        'fat' => 'required|numeric',      // Corrigido para numeric
        'protein' => 'required|numeric',  // Corrigido para numeric
    ]);

    $food = Food::create([
        'name' => $request->input('name'),
        'calories' => $request->input('calories'),
        'carbs' => $request->input('carbs'),
        'fat' => $request->input('fat'),
        'protein' => $request->input('protein'),
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Alimento criado com sucesso!',
        'food' => $food,
    ], 201);
}

public function update(Request $request, string $id)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'calories' => 'required|numeric', // Corrigido para numeric
        'carbs' => 'required|numeric',    // Corrigido para numeric
        'fat' => 'required|numeric',      // Corrigido para numeric
        'protein' => 'required|numeric',  // Corrigido para numeric
    ]);

    $food = Food::findOrFail($id);
    $food->update([
        'name' => $request->input('name'),
        'calories' => $request->input('calories'),
        'carbs' => $request->input('carbs'),
        'fat' => $request->input('fat'),
        'protein' => $request->input('protein'),
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Alimento atualizado com sucesso!',
        'food' => $food,
    ], 200);
}

    /**
     * Remove um alimento específico.
     */
    public function destroy(string $id)
    {
        $food = Food::findOrFail($id); // Busca o alimento pelo ID
        $food->delete();

        return response()->json([
            'success' => true,
            'message' => 'Alimento excluído com sucesso!',
        ], 200); // Retorna uma resposta JSON
    }
}