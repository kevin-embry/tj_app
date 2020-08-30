<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
use Illuminate\Support\Facades\Hash;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        try{
            $db = DB::connection()->getPdo(); 
         
            try {
                $data = DB::table('lastupdate')->get();
            } catch(\Exception $e) {
                var_dump($e);
            }

       } catch (\Exception $e) {
            die("Could not connect to the database. Please check your configuration. error:" . $e );
       } 
        return view('index');
    }

    public function getWelcomeMessage()
    {       
        $data = DB::table('welcome')->get();
        return $data;     
    }

    public function updateWelcomeMessage(Request $request)
    {
        $data = $request->all();
        $message = $data['message'];
        $date = date('Y-m-d');
        

        try {
            $query1 = DB::table('welcome')
            ->where('id', 1)
            ->update([
                'editdate' => $date,
                'message' => $message
            ]); 
            $query2 = DB::table('lastupdate')
            ->where('id', 1)
            ->update([
                'lastupdate' => $date
            ]);
            
            if ($query1 == 1) {
                return response(json_encode([
                    "success" => $query1, 
                    "date" => $date]), 200);
            } else {
                return response(json_encode("Update failure." . $query1), 500);
            }  
        } catch (\Illuminate\Database\QueryException $e) {
            return response(json_encode($e), 500);
        }
        
    }

    public function getLastUpdate()
    {       
        try {
            $data = DB::table('lastupdate')->get();
        } catch(\Exception $e) {
            var_dump($e);
        }
        return $data;     
    }
}
