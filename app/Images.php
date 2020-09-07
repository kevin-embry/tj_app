<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Images extends Model
{
    public function getDistinctGalleryNames()
    {
        $galleries = [];
        $data = Images::select('galleryname')->distinct()->orderby('galleryname', 'asc')->get();

        foreach($data as $key => $value) {
            array_push($galleries, $value->galleryname);
        }

        return $galleries;
    }   

    public function deleteImageFromDisk($image)
    {
        
    }
}
