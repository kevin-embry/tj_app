<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Crew;

class CrewController extends Controller
{
    public function getCrew()
    {
        return Crew::all();
    }
}
