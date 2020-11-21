<?php

namespace App\Http\Controllers;

use App\Images;
use Illuminate\Http\Request;
use App\Rules\NoSpecialChars;
use App\Rules\ImageFileSize;
use App\Home;
use Illuminate\Support\Facades\Storage;

class ImagesController extends Controller
{

    private $s3path;

    public function __construct() {
        $this->s3path = "https://".env('AWS_BUCKET').".s3.".env('AWS_DEFAULT_REGION').".amazonaws.com/";
        $this->lastUpdate = new Home();
    }

    /**
     * Display the specified images
     *
     * @param  \App\Images  $images
     * @return \Illuminate\Http\Response
     */
    public function getPhotos(Request $request)
    {
        $returnedImages = [];
        foreach (Images::where('galleryname', request()->gallery)->get() as $image) {
            $image['url'] = $this->s3path.$image['url'];
            array_push($returnedImages, $image);
        }
        return $returnedImages;
    }

    /**
     * Store newly uploaded images in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function uploadPhotos(Request $request)
    {
       
        $now = date("Y-m-d H:i");
        request()->validate([
            'file' => ['mimes:jpg,jpeg,png', 'required', new ImageFileSize],
            'galleryname' => ['required' ,'min:4', 'max:25', new NoSpecialChars]
        ]);
        
        //STORE PDF TO S3
        $file = $request->file; 
        $filePath = env('APPLICATION_ENV').'/galleries/'.Request()->galleryname.'/image'.time().request()->file->getClientOriginalName(); 
        $result = Storage::disk('s3')->put($filePath, file_get_contents($file), 'public');
        

        //SAVE TO DATABASE
        list($width, $height) = getimagesize(Request()->file);
        if($result) {
            $image = new Images();
            $image->postdate = $now;
            $image->galleryname = Request()->galleryname;
            $image->url = $filePath;
            $image->height = $height;
            $image->width = $width;
            $image->save();
            
            $this->lastUpdate->setLastUpdate();
            
            return redirect('/photos/images');
        } else {
            return new \Exception("Save Failed");
        }
       
    }

     /**
     * Remove the specified images from storage.
     *
     * @param  \App\Images  $images
     * @return \Illuminate\Http\Response
     */
    public function deletePhoto(Request $request)
    {  
        $image = Images::find(request()->image['id']);

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

    public function getGalleryNames() 
    {
        $images = new Images();
        return response(json_encode($images->getDistinctGalleryNames()));
    }

}