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
            $sendEmail->sendResetEmail($email, $resetToken);
            return response(json_encode(true), 200);
        } catch(\Exception $e) {
            return response(json_encode(false), 500);
        }
    }

    public function checkResetToken(Request $request)
    {
        request()->validate([
            'resetToken' => 'required',
            'email' => 'required'         
        ]);
        // $token = request()->resetToken;
        $sendEmail = new ForgotPassword();
        // $sendEmail->checkToken($token);
        dd($sendEmail->checkToken(request()->resetToken, request()->email));
        
    }
}
