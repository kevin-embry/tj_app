<?php

namespace App\Http\Controllers;

use App\Images;
use Illuminate\Http\Request;
use App\Rules\NoSpecialChars;
use App\Rules\ImageFileSize;
use Illuminate\Support\Facades\Storage;

class ImagesController extends Controller
{
    /**
     * Display the specified images
     *
     * @param  \App\Images  $images
     * @return \Illuminate\Http\Response
     */
    public function getPhotos(Request $request)
    {
        // dd(request()->gallery);
      
        return Images::where('galleryname', request()->gallery)->get();
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
        
              //STORE PDF TO PUBLIC
        $path = $request->file->store('galleries/'.Request()->galleryname, 'public');
        list($width, $height) = getimagesize(Request()->file);

        //SAVE TO DATABASE
        if($path) {
            $image = new Images();
            $image->postdate = $now;
            $image->galleryname = Request()->galleryname;
            $image->url = $path;
            $image->height = $height;
            $image->width = $width;
                    
            $image->save();
            
            return redirect('/photos/images');
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
        $imageToDelete = request()->image;
        $image = new Images();

        try {
            $image::where('id', $imageToDelete['id'])
                ->where('galleryname', $imageToDelete['galleryname'])
                ->delete();

            Storage::disk('public')->delete($imageToDelete['url']); 
            return response(json_encode(['status' => 'success']), 200);    
        } catch(\Exception $e) {
            return response(json_encode(['status' => 'fail']), 500);
        }
                  
    }

    public function getGalleryNames() 
    {
        $images = new Images();
        // dd($images->getDistinctGalleryNames());
        return response(json_encode($images->getDistinctGalleryNames()));
    }

}