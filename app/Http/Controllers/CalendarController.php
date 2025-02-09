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

}
