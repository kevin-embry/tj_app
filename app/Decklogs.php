<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Decklogs extends Model
{

   public function getYears()
   {
        $years = [];
        $data = Decklogs::select(DB::raw('YEAR(logdate) as year'))
            ->distinct()
            ->orderby('year', 'asc')
            ->get();
        foreach($data as $key => $value) {
            array_push($years, $value->year);
        }
        return $years;
   }

   public function getMonths($year)
   {
       $months = [];
       $data = Decklogs::select(DB::raw('MONTH(logdate) as month'))->distinct()
            ->where(DB::raw('YEAR(logdate)'), '=', $year)
            ->orderby('month', 'asc')
            ->get();
        
        foreach($data as $key => $value) {
            array_push($months, $value->month);
        }    
        return $months; 
   }

   public function getDays($year, $month)
   {
       $days = [];
       $data = Decklogs::select(DB::raw('DAY(logdate) as day'))->distinct()
            ->where(DB::raw('YEAR(logdate)'), '=', $year)
            ->where(DB::raw('MONTH(logdate)'), '=', $month)
            ->orderby('day', 'asc')
            ->get();

        foreach($data as $key => $value) {
            array_push($days, $value->day);
        }
        return $days; 
   }

   public function getLogs($year, $month, $day = null)
   {
       $s3path = "https://".env('AWS_BUCKET').".s3.".env('AWS_DEFAULT_REGION').".amazonaws.com/";
       $logs = [];

       $query = Decklogs::where(DB::raw('YEAR(logdate)'), $year)
                ->where(DB::raw('MONTH(logdate)'), $month);
                
       if($day !== null) {
            $query->where(DB::raw('DAY(logdate)'), $day);
        }         

        $data = $query->get();

        foreach($data as $key => $value) {
            $value->attributes['file'] = $s3path.$value->attributes['file'];
            array_push($logs, $value->attributes);
        }
        return $data;

   }
   
}
