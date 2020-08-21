<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Rules\ValidUser;
// use Illuminate\Foundation\Auth\SendsPasswordResetEmails;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    // use SendsPasswordResetEmails;

    public function recoverPassword(Request $request)
    {
        request()->validate([
            'email' => ['required','email:rfc,dns', new ValidUser()]            
        ]);
        $user = DB::table('user')
                    ->where('email', request()->email)                   
                    ->first();

        $resetToken = \Str::random(16);
        $to = request()->email;
        $subject = "Password Reset Request from TJ History Website";
        $message = "
            <html>
                <body>
                    <h2>This email is from the Thomas Jefferson History Website</h2>
                    <p>Please <b>DO NOT</b> reply to this email.</p>
                    <p>A password reset request has been issued.</p>
                    <p>If you did not request a password reset, please ignore this message.</p>
                    <hr/>
                    <p>Please use the following token in the Thomas Jefferson app to reset your password:</p>
                    <h1>{$resetToken}</h1>
                    <p>Best Regards,</p>
                    <p>Thomas Jefferson History Webmaster</p>
                </body>
            </html>
        ";
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= 'From: <doNotReply@tj618history.org>' . "\r\n";
        // $headers .= 'Cc: myboss@example.com' . "\r\n";
        try{
            mail($to,$subject,$message,$headers);
            return response(json_encode(true), 200);
        }catch(\Exception $e) {
            return response(json_encode(false), 500);
        }
    }
}
