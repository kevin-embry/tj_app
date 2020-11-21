<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use HomeController;
use App\Home;

class AnnouncementController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        date_default_timezone_set("America/New_York");
        $this->lastUpdate = new Home(); 
    }

    public function storeAnnouncement(Request $request)
    {
        $data = $request->all();
        $now = date("Y-m-d H:i");

        try {
            $query = DB::table('announcements')->insert(
                [
                    'postdate' => $now,
                    'expiredate' => $data['expireDate'],
                    'message' => $data['message']
                ]
            );
            $this->lastUpdate->setLastUpdate();
            return response(json_encode($query), 200);
        } catch(\Illuminate\Database\QueryException $exception) {
            return response(json_encode($exception->getMessage()), 500);
        }
       
    }
    
    public function getAnnouncements(Request $request)
    {
        $now = date("Y-m-d H:i");
        try {
            $query = DB::table('announcements')
                ->orderBy('expiredate', 'asc')  
                ->get();
            return response(json_encode($query), 200);
        } catch(\Illuminate\Database\QueryException $exception) {
            return response(json_encode($exception->getMessage()), 500);
        }
    }

    public function updateAnnouncement(Request $request)
    {
        $lastUpdate = new Home();
        $data = $request->all();
        $now = date("Y-m-d H:i");
        try {
            $query = DB::table('announcements')
            ->where('id', $data['id'])
            ->update([
                'expiredate' => $data['expireDate'],
                'message' => $data['message'],
                'updated_on' => $now
            ]); 
            $this->lastUpdate->setLastUpdate();
            return response(json_encode($query), 200);
        } catch (\Illuminate\Database\QueryException $exception) {            
            return response(json_encode($exception->getMessage()), 500);
        }      
            
    }

    public function deleteAnnouncement(Request $request)
    {
        $data = $request->all();
        try{
            $query = DB::table('announcements')
                ->where('id', $data['id'])
                ->delete();
            return response(json_encode($query), 200);         
        } catch (\Illuminate\Database\QueryException $exception) {
            return response(json_encode($exception->getMessage()), 500);
        }

    }
    
}
