<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExerciseController extends Controller{
    
    public function index()
    {
        // Fetch the authenticated user
        $user = Auth::user();

        /*\Log::info('User data:', ['user' -> $user]);*/
        
        // Return a view with the user data
        
        return Inertia::render('Exercises', [
            'user' => $user,
        ]);
    }

    public function show(Request $request){

        $name = $request->query('name'); // Verifica se um nome foi passado como parâmetro
        $query = Exercise::select('id', 'name');

        if ($name) {
            $query->where('name', $name);
        }

        $exercises = $query->get();

        return response()->json($exercises);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request){
        
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Exercise::create([
            'name' => $request->input('name'),
        ]);

        return redirect()-> route('exercises.index')
                         -> with('success', 'Exercício criado com sucesso!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id){
        
        $exercises = Exercise::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        
        $exercises->update([
            'name' => $request->input('name'),
        ]);

        return redirect()-> route('exercises.index')
                         -> with('success', 'Exercício atualizado com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id){

        $exercises = Exercise::findOrFail($id);
        $exercises->delete();

        return redirect()-> route('exercises.index')
                         -> with('success', 'Exercício excluido com sucesso!');
    }

    // public function getExerciseIdByName(Request $request)
    // {
    //     // Get the name from the query parameter
    //     $name = $request->query('name');
        
    //     // Try to find the exercise by its name
    //     $exercise = Exercise::where('name', $name)->first();

    //     // If exercise is found, return its ID
    //     if ($exercise) {
    //         return response()->json(['exercise_id' => $exercise->id]);
    //     } else {
    //         return response()->json(['error' => 'Exercise not found'], 404);
    //     }
    // }
}
