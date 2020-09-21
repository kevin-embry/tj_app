<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Crew;

class CrewController extends Controller
{
    public function getCrew()
    {
        return Crew::orderby('lastname', 'asc')->get();
    }

    public function updateCrew()
    {
        request()->validate([
            'id' => 'required',
            'firstName' => 'required',
            'lastName' => 'required',
            'division' => 'required',
            'job' => 'required',
            'crew' => 'required',
            'dateFrom' => 'required',
            'dateTo' => 'required|gte:dateFrom'
        ]);

        try {
            $user = Crew::find(request()->id);
            $user->firstname = request()->firstName;
            $user->lastname = request()->lastName;
            $user->crew = request()->crew;
            $user->division = request()->division;
            $user->job = request()->job;
            $user->datefrom = request()->dateFrom;
            $user->dateto = request()->dateTo;
            $user->save();
            return response(json_encode(true), 200);
        } catch(\Exception $e) {
            return response(json_encode($e), 501);
        }
    }

    public function deleteCrew()
    {
        request()->validate([
            'id' => 'required'
        ]);

        try{
            $user = Crew::find(request()->id);
            $user->delete();
            return response(json_encode(true), 200);
        } catch(\Exception $e) {
            return response(json_encode($e), 501);
        }
    }

    public function storeCrew()
    {
        request()->validate([
            'firstName' => 'required',
            'lastName' => 'required',            
            'division' => 'required',
            'job' => 'required',
            'crew' => 'required',
            'dateFrom' => 'required',
            'dateTo' => 'required'
        ]);

        try{
            $crewMember = new Crew();
            $crewMember->firstname = request()->firstName;
            $crewMember->lastname = request()->lastName;
            $crewMember->crew = request()->crew;
            $crewMember->division = request()->division;
            $crewMember->job = request()->job;
            $crewMember->datefrom = request()->dateFrom;
            $crewMember->dateto = request()->dateTo;
            $crewMember->save();
            return response(json_encode(true), 201);
        } catch (\Exception $e) {
            return response(json_encode($e), 501);
        }
    }
    
}
