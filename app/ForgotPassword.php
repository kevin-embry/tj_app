<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;


class ForgotPassword extends Model
{
    public $gmailUser;
    public $gmailPassword;

    public function __construct() {
        try {
            $this->gmailUser = env('MAIL_USERNAME');
            $this->gmailPassword = env('MAIL_PASSWORD');
        } catch(\Exception $e) {
            dd($e);
        }
    }

    public function sendResetEmail($email, $resetToken)
    {
        $to = $email;
        $messageBody = "
            <html>
                <body>
                    <h2>This email is from the Thomas Jefferson History Website</h2>
                    <p>Please <b>DO NOT</b> reply to this email.</p>
                    <p>A password reset request has been issued for the user: <b>{$email}</b></p>
                    <p>If you did not request a password reset, please ignore this message.</p>
                    <hr/>
                    <p>Please use the following token in the Thomas Jefferson app to reset your password:</p>
                    <h1><b>{$resetToken}</b></h1>
                    <p>Best Regards,</p>
                    <p>Thomas Jefferson History Webmaster</p>
                </body>
            </html>
        ";

        $transport = (new \Swift_SmtpTransport('smtp.gmail.com', 465, 'ssl'))
        ->setUsername($this->gmailUser)
        ->setPassword($this->gmailPassword);

        $mailer = new \Swift_Mailer($transport);
     
        $message = (new \Swift_Message('Password Reset Request from TJ History Website'))
        ->setFrom(['DoNotReply@tj618history.org' => 'TJ618History Webmaster'])
        ->setTo($to)
        ->setBody($messageBody, 'text/html');
      
        if($mailer->send($message)) {
            $this->storeToken($email, $resetToken);
            return true;
        } else {
            throw new \Exception('Mail Delivery Failure');
        }
       
    }

    public function updatePassword($email, $password)
    {
       try{
            $query = DB::table('user')
                ->where('email', $email)
                ->update([
                    'password' => encrypt($password),
                ]);
            return $query;     
       }catch(\Exception $e){
            return $e->getMessage();
       }
    }

    public function checkToken($token, $email)
    {
        $now = date("Y-m-d H:i:s");
        try{
            $returnedToken = DB::table('password_resets')
                    ->where('token', $token)
                    ->where('email', $email)                   
                    ->first();
            if($returnedToken) {
                 // TAKE TOKEN TIME AND ADD 10 MINUTES
                // IF TOKEN TIME IS GREATER THAN NOW IT IS A VALID TOKEN        
                $token_timestamp = strtotime('+10 minutes', strtotime($returnedToken->created_at))  ; 
                return $token_timestamp >= strtotime($now) ? true : false;
            } else {
                return false;
            } 
           
        } catch(\Exception $e) {
            return $e;
        }
    }

    private function storeToken($email, $token)
    {
        $now = date('Y-m-d H:i:s');
        try{
            $query = DB::table('password_resets')->insert(
                [
                    'email' => $email,
                    'token' => $token,
                    'created_at' => $now
                ]);
        } catch(\Exception $e) {
            return $e;
        }
    }
    
}
