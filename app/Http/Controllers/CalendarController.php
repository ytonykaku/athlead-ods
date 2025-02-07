<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Calendar;

class CalendarController extends Controller
{
    public function index()
    {
        $calendars = Calendar::all();
        return view('calendar.index', compact('calendars'));
    }

    public function create()
    {
        return view('calendar.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'start' => 'required|date',
            'end' => 'required|date',
        ]);

        $calendar = new Calendar();
        $calendar->title = $request->title;
        $calendar->start = $request->start;
        $calendar->end = $request->end;
        $calendar->save();

        return redirect()->route('calendar.index');
    }

    public function edit($id)
    {
        $calendar = Calendar::find($id);
        return view('calendar.edit', compact('calendar'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'start' => 'required|date',
            'end' => 'required|date',
        ]);

        $calendar = Calendar::find($id);
        $calendar->title = $request->title;
        $calendar->start = $request->start;
        $calendar->end = $request->end;
        $calendar->save();

        return redirect()->route('calendar.index');
    }

    public function destroy($id)
    {
        $calendar = Calendar::find($id);
        $calendar->delete();

        return redirect()->route('calendar.index');
    }
}
