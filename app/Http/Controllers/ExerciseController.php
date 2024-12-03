<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExerciseController extends Controller{
    
    /**
     * Display a listing of the resource.
     */
    public function index(){

        $exercises = Exercise::all();

        return Inertia::render('Exercise/Index', [
            'exercises' => $exercises
        ]);
    }

    public function show($id){

        $exercises = Exercise::findOrFail($id);

        return Inertia::render('Exercise/Show', [
            'exercises' => $exercises
        ]);
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
}
