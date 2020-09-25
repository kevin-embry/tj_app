<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Decklogs;

class DecklogsController extends Controller
{

    public function __construct() {
    }

    //render the list of pdfs
    //Am I using this????????????????????????
    public function index()
    {
        return Decklogs::all();
    }

    //show a single pdf
    public function show(Request $request)
    {
        $decklogs = new Decklogs();
        request()->validate([
            'filterYear' => 'required',
            'filterMonth' => 'required',
            'filterDay' => 'nullable'
        ]);
             
        $logs = $decklogs->getLogs(request()->filterYear, request()->filterMonth, request()->filterDay);
       
        return response(json_encode($logs));
    }

    public function store(Request $request)
    {
        request()->validate([
            'logdate' => 'required|date_format:"Y-m-d"',
            'postdate' => 'nullable|date_format:"Y-m-d"',
            'patrolnumber' => 'nullable',
            'patrolnotes' => 'nullable',
            'file' => 'required|mimes:pdf'
        ]);
     
        //STORE PDF TO s3
        $filePath = env('APPLICATION_ENV').'/decklogs/dl'.time().request()->file->getClientOriginalName();
        $file = request()->file; 
        $result = Storage::disk('s3')->put($filePath, file_get_contents($file), 'public');

        //SAVE TO DATABASE
        if($result) {
            $decklog = new Decklogs();
            $decklog->logdate = request('logdate');
            $decklog->postdate = request('postdate');
            $decklog->patrolnumber = request('patrolnumber');
            $decklog->patrolnotes = request('patrolnotes');
            $decklog->file = $filePath;
            $decklog->save();
        }
        return redirect('/decklogs');
    }

    public function getFilterData(Request $request)
    {
        $decklogs = new Decklogs();
        $action = request()->action;

        if ($action == "getYears") {
           $data = $decklogs->getYears();
           return response(json_encode($data));
        } else if($action == "getMonths") {
            $data = $decklogs->getMonths(request()->year);
            return response(json_encode($data));
        } else if($action == "getDays") {
            $data = $decklogs->getDays(request()->year, request()->month);
            return response(json_encode($data));
        }
    }
}
