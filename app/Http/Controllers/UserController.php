<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
// use Illuminate\Support\Carbon;
// use Illuminate\Database\Connection;
// use Illuminate\Support\Facades\Hash;

class UserController extends Controller
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

    public function login(Request $request)
    {
        $data = $request->all();
        $user = DB::table('user')
                    ->where('email', $data['email'])                   
                    ->first();


        if ( ($user !== null) && ($data['password'] === decrypt($user->password)) ){
            return response(json_encode(array(
                        "id" => $user->id,
                        "email" => $user->email,
                        "firstName" => $user->firstname,
                        "lastName" => $user->lastname,
                        "role" => $user->role
                    )), 200);
        } else {
            return response(json_encode($user), 401);
        }
    }

    public function store(Request $request)
    {
        
        $data = $request->all();
        $now = date("Y-m-d H:i");
        try {
            $query = DB::table('user')->insert(
                [
                    'firstname' => $data['firstName'],
                    'lastname' => $data['lastName'],
                    'email' => $data['email'],
                    'password' => encrypt($data['password']),
                    'role' => 'user',
                    'approved' => 'false',
                    'created_at' => $now
                ]
            );
    
            if ($data['servedOnBoard'] === 'yes') {

                $query2 = DB::table('crew')->insert(
                    [
                        'firstname' => $data['firstName'],
                        'lastname' => $data['lastName'],
                        'email' => $data['email'],
                        'crew' => $data['crew'],
                        'servedonboard' => $data['servedOnBoard'],
                        'division' => $data['division'],
                        'job' => $data['job']
                    ]
                );
            }
            return response(json_encode($data), 200);
        } catch(\Illuminate\Database\QueryException $e) {
            dd($e);
            return response(json_encode($e), 500);
        }

    }
    
}
