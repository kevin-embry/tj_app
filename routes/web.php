<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// GENERAL ROUTES
Route::get('/', 'HomeController@index');
Route::get('/signup', 'HomeController@index');
Route::get('/login', 'HomeController@index');
Route::get('/decklogs', 'HomeController@index');
Route::get('/crew', 'HomeController@index');
Route::get('/comments', 'HomeController@index');
Route::get('/images', 'HomeController@index');
Route::get('/newspapers', 'HomeController@index');
Route::get('/references', 'HomeController@index');
Route::get('/about', 'HomeController@index');


// REST ROUTES
Route::get('/authenticate', 'UserController@login');
Route::post('/register', 'UserController@store');

Route::get('/getWelcome', 'HomeController@getWelcomeMessage');
Route::post('/updateWelcome', 'HomeController@updateWelcomeMessage');

Route::get('/getLastUpdate', 'HomeController@getLastUpdate');





// Auth::routes();
// Route::get('/home', 'HomeController@index')->name('home');
