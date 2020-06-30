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

    // *********TIMELINE EVENTS********
    public function storeTimelineEvent(Request $request)
    {
        $data = $request->all();
        $now = date("Y-m-d H:i");
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

    public function updateTimelineEvent(Request $request)
    {
        $data = $request->all();
        $now = date("Y-m-d H:i");
        try {
            $query = DB::table('timeline')
            ->where('id', $data['id'])
            ->update([
                'eventdate' => $data['editedDate'],
                'activity' => $data['editedEvent'],
                'notes' => $data['editedNote'],
                'updated_on' => $now
            ]); 
            return response(json_encode($query), 200);
        } catch (\Illuminate\Database\QueryException $exception) {            
            return response(json_encode($exception->getMessage()), 500);
        }      
    }

    public function deleteTimelineEvent(Request $request)
    {
        $data = $request->all();
        try{
            $query = DB::table('timeline')
                ->where('id', $data['id'])
                ->delete();
            return response(json_encode($query), 200);    
        } catch (\Illuminate\Database\QueryException $exception) {
            return response(json_encode($exception->getMessage()), 500);
        }
    }

    // *********AWARDS EVENTS********
    public function storeAwardEvent(Request $request)
    {
        $data = $request->all();
        $now = date("Y-m-d H:i");
        try {
            $query = DB::table('awards')->insert(
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

    public function getAwardEvents(Request $request)
    {
        try {
            $query = DB::table('awards')
                ->orderBy('eventdate', 'asc')  
                ->get();
            return response(json_encode($query), 200);
        } catch(\Illuminate\Database\QueryException $exception) {
            return response(json_encode($exception->getMessage()), 500);
        }
    }

    public function updateAwardEvent(Request $request)
    {
        $data = $request->all();
        $now = date("Y-m-d H:i");
        try {
            $query = DB::table('awards')
            ->where('id', $data['id'])
            ->update([
                'eventdate' => $data['editedDate'],
                'activity' => $data['editedEvent'],
                'notes' => $data['editedNote'],
                'updated_on' => $now
            ]); 
            return response(json_encode($query), 200);
        } catch (\Illuminate\Database\QueryException $exception) {            
            return response(json_encode($exception->getMessage()), 500);
        }      
    }

    public function deleteAwardEvent(Request $request)
    {
        $data = $request->all();
        try{
            $query = DB::table('awards')
                ->where('id', $data['id'])
                ->delete();
            return response(json_encode($query), 200);    
        } catch (\Illuminate\Database\QueryException $exception) {
            return response(json_encode($exception->getMessage()), 500);
        }
    }

     // *********MISSLE LAUNCH EVENTS********
     public function storeMissleLaunchEvent(Request $request)
     {
         $data = $request->all();
         $now = date("Y-m-d H:i");
         try {
             $query = DB::table('misslelaunches')->insert(
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
 
     public function getMissleLaunchEvents(Request $request)
     {
         try {
             $query = DB::table('misslelaunches')
                 ->orderBy('eventdate', 'asc')  
                 ->get();
             return response(json_encode($query), 200);
         } catch(\Illuminate\Database\QueryException $exception) {
             return response(json_encode($exception->getMessage()), 500);
         }
     }

     public function updateMissleLaunchEvent(Request $request)
    {
        $data = $request->all();
        $now = date("Y-m-d H:i");
        try {
            $query = DB::table('misslelaunches')
            ->where('id', $data['id'])
            ->update([
                'eventdate' => $data['editedDate'],
                'activity' => $data['editedEvent'],
                'notes' => $data['editedNote'],
                'updated_on' => $now
            ]); 
            return response(json_encode($query), 200);
        } catch (\Illuminate\Database\QueryException $exception) {            
            return response(json_encode($exception->getMessage()), 500);
        }      
    }

    public function deleteMissleLaunchEvent(Request $request)
    {
        $data = $request->all();
        try{
            $query = DB::table('misslelaunches')
                ->where('id', $data['id'])
                ->delete();
            return response(json_encode($query), 200);    
        } catch (\Illuminate\Database\QueryException $exception) {
            return response(json_encode($exception->getMessage()), 500);
        }
    }
    
}
