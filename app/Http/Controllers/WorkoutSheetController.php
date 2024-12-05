<?php

namespace App\Http\Controllers;

use App\Models\WorkoutSheet;
use App\Models\WorkoutSheetExercise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WorkoutSheetController extends Controller
{
    /**
     * Lista todas as fichas do usuário autenticado.
     */
    public function index()
    {
        $workoutSheets = WorkoutSheet::where('user_id', Auth::id())->get();
        return Inertia::render('Exercises', [
            'workoutSheets' => $workoutSheets,
        ]);
    }

    /**
     * Exibe o formulário de criação de ficha.
     */
    public function create()
    {
        return inertia('WorkoutSheets/Create');
    }

    /**
     * Salva uma nova ficha de treino no banco de dados.
     */
    // app/Http/Controllers/WorkoutSheetController.php

    public function store(Request $request)
    {
        // Validação dos dados
        $request->validate([
            'name' => 'required|string|max:255',
            'exercises' => 'required|array',
            'exercises.*.exercise' => 'required|string',
            'exercises.*.series' => 'required|integer',
            'exercises.*.reps' => 'required|integer',
            'exercises.*.weight' => 'required|numeric',
        ]);
    
        // Criação de uma nova ficha de treino
        $workoutSheet = WorkoutSheet::create([
            'user_id' => auth()->id(),
            'name' => $request->input('name'), // Adicionado o campo 'name'
        ]);
    
        // Salvar os exercícios associados
        foreach ($request->exercises as $exercise) {
            $workoutSheet->exercises()->create([
                'exercise_id' => $exercise['exercise'], // Assumindo que 'exercise' é o ID
                'sets' => $exercise['series'],
                'repetitions' => $exercise['reps'],
                'workload' => $exercise['weight'],
            ]);
        }
    
        return response()->json($workoutSheet, 201);
    }
    

    /**
     * Exibe o formulário de edição de uma ficha.
     */
    public function edit($id)
    {
        $workoutSheet = WorkoutSheet::where('user_id', Auth::id())->findOrFail($id);

        return inertia('WorkoutSheets/Edit', [
            'workoutSheet' => $workoutSheet,
        ]);
    }

    /**
     * Atualiza uma ficha existente.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $workoutSheet = WorkoutSheet::where('user_id', Auth::id())->findOrFail($id);
        $workoutSheet->update($validated);

        return redirect()->route('workout-sheets.index')->with('success', 'Ficha atualizada com sucesso!');
    }

    /**
     * Exclui uma ficha de treino.
     */
    public function destroy($id)
    {
        $workoutSheet = WorkoutSheet::where('user_id', Auth::id())->findOrFail($id);
        $workoutSheet->delete();

        return redirect()->route('workout-sheets.index')->with('success', 'Ficha excluída com sucesso!');
    }
}
