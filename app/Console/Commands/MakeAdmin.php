<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class MakeAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:makeadmin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generates an admin account for TJ App';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->email = "superadmin@tj618history.org";
        $this->password = "";
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info("THIS SCRIPT CREATES THE FIRST ADMIN USER FOR TJHISTORY WEBSITE.");
        $this->info("");
        if ($this->checkIfExists() !== null) {
            $this->info("SUPERADMIN USER ALREADY EXISTS! SCRIPT WILL NOW EXIT.");
            exit();
        }

        $this->info("Admin email(username) is: {$this->email}");
        $this->info("");
        $this->collectNewPassword();
      
        $now = date("Y-m-d H:i");
       
        try{
            $query = DB::table('user')->insert(
                [
                    'firstname' => 'superadmin',
                    'lastname' => 'superadmin',
                    'email' => $this->email,
                    'password' => encrypt($this->password),
                    'role' => 'admin',
                    'approved' => 'true',
                    'created_at' => $now
                ]
            );
            $this->info("User Created");
            $this->info("");
            $this->info("Please note these credentials:");
            $this->info("Email: {$this->email}");
            $this->info("Password: {$this->password}");
        } catch(\Exception $e) {
            $this->info("ADMIN USER CREATION FAILED");
            $this->info($e);
        }  
    }
    
    private function collectNewPassword()
    {
        $this->info("ENTER PASSWORD. PASSWORD SHOULD BE 6 CHARACTERS OR GREATER WITH LETTERS AND NUMBERS");
        $password1 = $this->secret("Enter the password for {$this->email}");
        $password2 = $this->secret("Re-Enter the password for {$this->email}");
        if ($password1 === $password2) {
            $this->checkPassword($password2);
            $this->password = $password2;
        } else {
            $this->info("Passwords do not match! Script will now exit! Please restart.");
            exit();
        }
    }

    private function checkPassword($password) 
    {
        if (strlen($password) <= 5 ) {
            $this->info("Passwords need to be 6 characters or greater! Script will now exit! Please restart.");
            exit();
        }
        if (!preg_match('~[0-9]+~', $password)) {
            $this->info("Passwords need to contain letters and numbers at minimum! Script will now exit! Please restart.");
            exit();
        }
        if (!preg_match('~[A-Za-z]+~', $password)) {
            $this->info("Passwords need to contain letters and numbers at minimum! Script will now exit! Please restart.");
            exit();
        }
    }

    private function checkIfExists() {
        $user = DB::table('user')
                    ->where('email', $this->email)                   
                    ->first();
        return $user;            
    }
}
