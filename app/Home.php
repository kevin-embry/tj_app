<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
// use Illuminate\Database\Connection;
// use Illuminate\Support\Facades\Hash;


class Home extends Model
{
    public function setLastUpdate()
    {
        $today = date('Y-m-d');
        $query = DB::table('lastupdate')
            ->where('id', 1)
            ->update([
                'lastupdate' => $today
            ]);
    }
}
