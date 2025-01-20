<?php

namespace App\Http\Controllers;

use App\Models\Diet;
use App\Models\DietMeal;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DietController extends Controller
{
    /**
     * Exibe todas as dietas do usuário autenticado.
     */
    public function index(){
        
        $user = Auth::user();
        $diets = $user->diet()->get();

        return Inertia::render('Diet', [
            'user' => $user,
            'diets' => $diets,
        ]);
    }

    /**
     * Exibe o formulário de criação de uma nova dieta.
     */
    public function create()
    {
        return inertia ('Diet/Create');
    }

    /**
     * Armazena uma nova dieta no banco de dados.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'meals' => 'required|array',
            'meals.*.food' => 'required|string',
            'meals.*.amount' => 'required|numeric|min:1',
            'meals.*.shift' => 'required|date_format:H:i',
        ]);

        // Cria a dieta
        $mealSheet = Diet::create([
            'user_id' => auth()->id(),
            'name' => $request->input('name'),
        ]);

        // Cria as refeições associadas à dieta
        foreach ($request->meals as $meal) {
            $mealSheet->meals()->create([
                'food_id' => $meal['food'],
                'amount' => $meal['amount'],
                'shift' => $meal['shift'],
            ]);
        }

        return response()->json($mealSheet, 201);
    }
    /**
     * Exibe uma dieta específica.
     */
    public function show($id)
    {
        $diet = Diet::with('meals')->where('user_id', Auth::id())->findOrFail($id);

        return response()->json($diet); // Adicionado retorno JSON
    }

    /**
     * Exibe o formulário de edição de uma dieta.
     */
    public function edit($id)
    {
        $meal = Diet::where('user_id', Auth::id())->findOrFail($id);

        return Inertia('Diet/Edit', [
            'diet' => $meal,
        ]);
    }

    /**
     * Atualiza uma dieta existente.
     */
    public function update(Request $request, $id)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'meals' => 'required|array',
        'meals.*.food' => 'required|string',
        'meals.*.amount' => 'required|numeric|min:1',
        'meals.*.shift' => 'required|date_format:H:i',
    ]);
    
    $diet = Diet::where('user_id', Auth::id())->findOrFail($id);
    $diet->update(['name' => $request->name]);

    // Atualizar refeições associadas
    $diet->meals()->delete();
    foreach ($request->input('meals') as $meal) {
        $diet->meals()->create([
            'food_id' => $meal['food'],
            'amount' => $meal['amount'],
            'shift' => $meal['shift'],
        ]);
    }

        return response()->json(['message' => 'Dieta atualizada com sucesso!']);
    }

    /**
     * Remove uma dieta específica.
     */
    public function destroy($id)
    {
        $diet = Diet::where('user_id',Auth::id())->findOrFail($id);
        $diet->delete();

        return redirect()->route('diets.index')->with('success', 'Dieta removida com sucesso!');
    }
}