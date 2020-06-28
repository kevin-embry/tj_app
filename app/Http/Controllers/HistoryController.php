<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HistoryController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        date_default_timezone_set("America/New_York");
    }

    public function storeTimelineEvent(Request $request)
    {
        $data = $request->all();
        $now = date("Y-m-d H:i");
        // $date = date_create($data['date']);
        // $formattedDate = date_format($date, "m-d-Y");
        try {
            $query = DB::table('timeline')->insert(
                [
                    'eventdate' => $data['date'],
                    'activity' => $data['eventName'],
                    'notes' => $data['eventNotes'],
                    'added_on' => $now
                ]
            );
            return response(json_encode($query), 200);
        } catch(\Illuminate\Database\QueryException $exception) {
            return response(json_encode($exception->getMessage()), 500);
        }
        
    }

    public function getTimelineEvents(Request $request)
    {
        try {
            $query = DB::table('timeline')
                ->orderBy('eventdate', 'asc')  
                ->get();
         
            return response(json_encode($query), 200);
        } catch(\Illuminate\Database\QueryException $exception) {
            return response(json_encode($exception->getMessage()), 500);
        }
        
    }
        

  
    
}
