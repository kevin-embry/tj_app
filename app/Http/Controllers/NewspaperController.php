<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Newspaper;
use App\Rules\ImageFileSize;
use Illuminate\Support\Facades\Storage;

class NewspaperController extends Controller
{

    private $s3path;

    public function __construct() {
        $this->s3path = "https://".env('AWS_BUCKET').".s3.".env('AWS_DEFAULT_REGION').".amazonaws.com/";
    }

    public function storeNewspaper(Request $request)
    {
        $now = date("Y-m-d H:i");
        request()->validate([
            'file' => ['mimes:jpg,jpeg,png', 'required', new ImageFileSize]
        ]);
        
        //STORE PDF TO S3
        $file = $request->file; 
        $filePath = env('APPLICATION_ENV').'/newspapers/'.'newspaper'.time().request()->file->getClientOriginalName(); 
        $result = Storage::disk('s3')->put($filePath, file_get_contents($file), 'public');

        // SAVE TO DATABASE
        list($width, $height) = getimagesize(Request()->file);

        try {
            if($result) {
                $obj = new Newspaper();
                $obj->postdate = $now;
                $obj->url = $filePath;
                $obj->height = $height;
                $obj->width = $width;
                $obj->save();
                
                return response(json_encode(['status' => 'success']), 200);    
            } else {
                return new \Exception("Save Failed");
            }
        } catch(\Exception $e) {
            return response(json_encode(['status' => 'fail']), 500);
        }
    }

    public function getNewspapers(Request $request)
    {
        $returnedNewspapers = [];
        foreach (Newspaper::all() as $image) {
            $image['url'] = $this->s3path.$image['url'];
            array_push($returnedNewspapers, $image);
        }
        return $returnedNewspapers;
    }

    public function deleteNewspaper(Request $request)
    {
        $image = Newspaper::find(request()->image['id']);
        
        try {
            if (Storage::disk('s3')->exists($image['url'])) {
                Storage::disk('s3')->delete($image['url']);
                $image->delete();
            } else {
                throw new \Exception("DELETE FAILED");
            }

            return response(json_encode(['status' => 'success']), 200);    
        } catch(\Exception $e) {
            return response(json_encode(['status' => 'fail']), 500);
        }       
    }
}
