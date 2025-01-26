<?php

namespace App\Http\Controllers;

use App\Models\Food;

use Inertia\Inertia;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;;

class FoodController extends Controller{
    
    public function index(){
        $user = Auth::user();
        
        return Inertia::render('Foods', [
            'user' => $user
        ]);
    }
    public function show(Request $request){
        
        $name = $request->query('name');
        $query = Food::select('id','name');

        if ($name) {
            $query->where('name', $name);
        }

        $foods = $query->get();

        return response()->json($foods);
        
    }
    public function store(Request $request){
        
        $request->validate([

            'name' => 'required|string|max:255',
            'calories' => 'required|string|max:255',
            'carbs' => 'required|string|max:255',
            'fat' => 'required|string|max:255',
            'protein' => 'required|string|max:255',
        ]);

        Food::create([

            'name' => $request->input('name'),
            'calories' => $request->input('calories'),
            'carbs' => $request->input('carbs'),
            'fat' => $request->input('fat'),
            'protein' => $request->input('protein'),
        ]);

        return redirect()-> route('foods.index')
                         -> with('success', 'Alimento criado com sucesso!');
    }
    public function update(Request $request, string $id){
        
        $foods = Food::findOrFail($id); 
        $request->validate([

            'name' => 'required|string|max:255',
            'calories' => 'required|string|max:255',
            'carbs' => 'required|string|max:255',
            'fat' => 'required|string|max:255',
            'protein' => 'required|string|max:255',
        ]);
        
        $foods->update([

            'name' => $request->input('name'),
            'calories' => $request->input('calories'),
            'carbs' => $request->input('carbs'),
            'fat' => $request->input('fat'),
            'protein' => $request->input('protein'),
        ]);
        
        return redirect()-> route('foods.index')
                         -> with('success', 'Alimento atualizado com sucesso!');
    }
    public function destroy(string $id){

        $foods = Food::findOrFail($id);
        $foods->delete();

        return redirect()-> route('foods.index')
                         -> with('success', 'Alimento excluido com sucesso!');
    }
}