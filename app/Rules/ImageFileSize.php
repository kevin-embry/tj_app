<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class ImageFileSize implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->fileSize = null;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $size = $value->getSize();
        if ($size <= 5000) {
            return true; 
        } else {
            $this->fileSize = $size;
            return false;
        }
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Images must be less than 5,000KB. This image is ' . $this->fileSize . 'KB.';
    }
}
