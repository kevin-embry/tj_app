<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        request()->validate([
            'firstName' => 'required',
            'lastName' => 'required',
            'email' => 'required',
            'password' => 'required|min:6',
            'dateFrom' => 'required',
            'dateTo' => 'required|gte:dateFrom'
        ]);
        
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

                $query2 = DB::table('crews')->insert(
                    [
                        'firstname' => $data['firstName'],
                        'lastname' => $data['lastName'],
                        // 'email' => $data['email'],
                        'crew' => $data['crew'],
                        // 'servedonboard' => $data['servedOnBoard'],
                        'division' => $data['division'],
                        'job' => $data['job'],
                        'datefrom' => $data['dateFrom'],
                        'dateto' => $data['dateTo']
                    ]
                );
            }
            return response(json_encode($data), 200);
        } catch(\Illuminate\Database\QueryException $e) {
            return response(json_encode($e), 500);
        }
    }

    public function getNewUsers(Request $request) 
    {
        $users = DB::table('user')
                    ->select('id', 'firstname', 'lastname', 'email')
                    ->where('approved', 'false')                   
                    ->get();
        return $users;            
    }

    public function getAllUsers() 
    {
        $users = DB::table('user')
                    ->orderBy('approved', 'asc')  
                    ->orderBy('lastname', 'asc')                                  
                    ->get();
        return $users;         
    }

    public function updateUser(Request $request) 
    {
        $data = $request->all();
        $date = date('Y-m-d');
        try {
            $query = DB::table('user')
            ->where('id', $data['id'])
            ->update([
                'firstname' => $data['firstName'],
                'lastname' => $data['lastName'],
                'email' => $data['email'],
                'role' => $data['role'],
                'approved' => $data['approved'],
                'updated_at' =>  $date
            ]); 
            return response(json_encode($query), 200);
        } catch (\Illuminate\Database\QueryException $exception) {            
            return response(json_encode($exception->getMessage()), 500);
        }      
    }

    public function deleteUser(Request $request) 
    {
        $data = $request->all();
        try {
            $query = DB::table('user')
                ->where('id', $data['id'])
                ->delete(); 

            $crewMember = DB::table('crews') 
                ->where('email', $data['email'])                   
                ->first();
            if($crewMember) {
                $query = DB::table('crews')
                ->where('email', $data['email'])
                ->delete(); 
            }
            
            return response(json_encode("USER " . $data['email'] . " DELETED"), 200);
        } catch (\Illuminate\Database\QueryException $exception) {            
            return response(json_encode($exception->getMessage()), 500);
        }   
    }
    
}
