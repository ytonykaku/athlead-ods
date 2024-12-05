<?php

namespace App\Http\Controllers;

use App\Models\Diet;
use App\Models\DietMeal;
use Illuminate\Http\Request;

class DietController extends Controller
{
    /**
     * Exibe todas as dietas do usuário autenticado.
     */
    public function index()
    {
        $diets = Diet::with('meals.food')->where('user_id', auth()->id())->get();

        return Inertia::render('Diet/Index', [
            'diets' => $diets,
        ]);
    }

    /**
     * Exibe o formulário de criação de uma nova dieta.
     */
    public function create()
    {
        return Inertia::render('Diet/Create');
    }

    /**
     * Armazena uma nova dieta no banco de dados.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'meals' => 'required|array',
            'meals.*.food_id' => 'required|exists:foods,id',
            'meals.*.amount' => 'required|numeric|min:1',
            'meals.*.shift' => 'required|date_format:H:i',
        ]);

        // Cria a dieta
        $diet = Diet::create([
            'user_id' => auth()->id(),
            'name' => $request->name,
        ]);

        // Cria as refeições associadas à dieta
        foreach ($request->meals as $meal) {
            DietMeal::create([
                'diet_id' => $diet->id,
                'food_id' => $meal['food_id'],
                'amount' => $meal['amount'],
                'shift' => $meal['shift'],
            ]);
        }

        return redirect()->route('diets.index')->with('success', 'Dieta criada com sucesso!');
    }

    /**
     * Exibe uma dieta específica.
     */
    public function show(Diet $diet)
    {
        $this->authorize('view', $diet);

        return Inertia::render('Diet/Show', [
            'diet' => $diet->load('meals.food'),
        ]);
    }

    /**
     * Exibe o formulário de edição de uma dieta.
     */
    public function edit(Diet $diet)
    {
        $this->authorize('update', $diet);

        return Inertia::render('Diet/Edit', [
            'diet' => $diet->load('meals.food'),
        ]);
    }

    /**
     * Atualiza uma dieta existente.
     */
    public function update(Request $request, Diet $diet)
    {
        $this->authorize('update', $diet);

        $request->validate([
            'name' => 'required|string|max:255',
            'meals' => 'required|array',
            'meals.*.food_id' => 'required|exists:foods,id',
            'meals.*.amount' => 'required|numeric|min:1',
            'meals.*.shift' => 'required|date_format:H:i',
        ]);

        // Atualiza a dieta
        $diet->update([
            'name' => $request->name,
        ]);

        // Remove refeições antigas e recria
        $diet->meals()->delete();
        foreach ($request->meals as $meal) {
            DietMeal::create([
                'diet_id' => $diet->id,
                'food_id' => $meal['food_id'],
                'amount' => $meal['amount'],
                'shift' => $meal['shift'],
            ]);
        }

        return redirect()->route('diets.index')->with('success', 'Dieta atualizada com sucesso!');
    }

    /**
     * Remove uma dieta específica.
     */
    public function destroy(Diet $diet)
    {
        $this->authorize('delete', $diet);

        $diet->delete();

        return redirect()->route('diets.index')->with('success', 'Dieta removida com sucesso!');
    }
}
