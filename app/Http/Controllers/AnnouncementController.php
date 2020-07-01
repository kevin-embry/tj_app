<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
            return response(json_encode($query), 200);
        } catch(\Illuminate\Database\QueryException $exception) {
            return response(json_encode($exception->getMessage()), 500);
        }

       
    }

    public function getAnnouncements(Request $request)
    {
       
        try {
            $query = DB::table('announcements')
                ->orderBy('expiredate', 'asc')  
                ->get();
            return response(json_encode($query), 200);
        } catch(\Illuminate\Database\QueryException $exception) {
            return response(json_encode($exception->getMessage()), 500);
        }
    }

    
}
