<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Rules\ValidUser;
use App\ForgotPassword;

class ForgotPasswordController extends Controller
{
   
    public function recoverPassword(Request $request)
    {
        request()->validate([
            'email' => ['required','email:rfc,dns', new ValidUser()]            
        ]);
        $email = request()->email;
        $resetToken = \Str::random(10);
        $sendEmail = new ForgotPassword();
        try {
            $result = $sendEmail->sendResetEmail($email, $resetToken);
            return response(json_encode($result), 200);
        } catch(\Exception $e) {
            return response(json_encode($e), 500);
        }
        // error.response.data.errors.email
    }

    public function checkResetToken(Request $request)
    {
        request()->validate([
            'resetToken' => 'required',
            'email' => 'required'         
        ]);
       
        $sendEmail = new ForgotPassword();
       
        $result = $sendEmail->checkToken(request()->resetToken, request()->email);  

        if ($result === true) {
            return response(json_encode(true), 200);
        } else {
            return response("Token does not exist in the database", 500);
        }

    }

    public function updatePassword(Request $request) 
    {
        request()->validate([
            'email' => 'required|email:rfc,dns',
            'password' => 'required|min:6|same:password2',
            'password2' => 'required|min:6'
        ]);

        $instance = new ForgotPassword();
        try{
            $result = $instance->updatePassword(request()->email, request()->password2);
            return response(json_encode(true), 200);
        }catch(\Exception $e){
            return response(\json_encode(false), 500);
        }
    }
}
