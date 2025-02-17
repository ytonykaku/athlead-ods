<?php

namespace App\Http\Controllers;

use App\Models\Calendar;
use App\Models\WorkoutSheet;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use Inertia\Inertia;
class CalendarController extends Controller{

    public function index(){

        $user = Auth::user();
        $workoutSheets = $user->workoutSheets()->get();
        $diets = $user->diet()->get();

        Log::info('WorkoutSheets:', ['workoutSheets' => $workoutSheets]);
        
        return Inertia::render('Calendar',[
            'user' => $user,
            'workoutSheets' => $workoutSheets,
            'diets' => $diets,
        ]);
    }

    
    public function store(Request $request){
        
        $request->validate([
            'date' => 'required|date',
            'workout_sheet_id' => 'nullable|exists:workout_sheets,id',
            'diet_id' => 'nullable|exists:diets,id',
        ]);

        $user = Auth::user();

        $calendar = Calendar::create([
            'user_id' => $user->id,
            'date' => $request->date,
            'workout_sheet_id' => $request->workout_sheet_id,
            'diet_id' => $request->diet_id
        ]);

        return response()->json(['success' => true, 'calendar' => $calendar]);
    }

    public function getEntries(Request $request){
        $user = Auth::user();
        $entries = Calendar::where('user_id', $user->id)
            ->whereMonth('date', $request->month)
            ->whereYear('date', $request->year)
            ->get();

        return response()->json(['entries' => $entries]);
    }

    public function show(Request $request){ 
        $query = Calendar::where('user_id', Auth::user()->id)->with(['workoutSheet', 'diet']);
        
        Log::info('Query:', ['query' => $query]);

        if ($request->query('date')) {
            $query->where('date', $request->query('date'));
        }
    
        $entries = $query->get();
    
        return response()->json($entries);
    }   

    public function destroy($id) {
        $user = Auth::user();
        
        // Encontrar o registro do calendário
        $calendarEntry = Calendar::where('id', $id)->where('user_id', $user->id)->first();
    
        if (!$calendarEntry) {
            return response()->json(['error' => 'Registro não encontrado'], 404);
        }
    
        // Deletar o registro
        $calendarEntry->delete();
    
        return response()->json(['success' => true, 'message' => 'Registro deletado com sucesso']);
    }
    
      
}
