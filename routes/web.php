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
Route::get('/editusers', 'HomeController@index');
Route::get('/editannouncements', 'HomeController@index');
Route::get('/history/timeline', 'HomeController@index');
Route::get('/history/awards', 'HomeController@index');
Route::get('/history/launches', 'HomeController@index');
Route::get('/photos/images', 'HomeController@index');




// REST ROUTES

//USER ROUTES
Route::post('/authenticate', 'UserController@login');
Route::post('/register', 'UserController@store');
Route::get('/getNewUsers', 'UserController@getNewUsers');
Route::get('/getAllUsers', 'UserController@getAllUsers');
Route::post('/updateUser', 'UserController@updateUser');
Route::post('/deleteUser', 'UserController@deleteUser');

//WELCOME PAGE ROUTES
Route::get('/getWelcome', 'HomeController@getWelcomeMessage');
Route::post('/updateWelcome', 'HomeController@updateWelcomeMessage');

//LAST UPDATE ROUTE
Route::get('/getLastUpdate', 'HomeController@getLastUpdate');

//HISTORY
Route::post('/storeTimeline', 'HistoryController@storeTimelineEvent');
Route::get('/getTimelineEvents', 'HistoryController@getTimelineEvents');
Route::post('/deleteTimelineEvent', 'HistoryController@deleteTimelineEvent');
Route::post('/updateTimelineEvent', 'HistoryController@updateTimelineEvent');

Route::post('/storeAward', 'HistoryController@storeAwardEvent');
Route::get('/getAwardEvents', 'HistoryController@getAwardEvents');
Route::post('/deleteAwardEvent', 'HistoryController@deleteAwardEvent');
Route::post('/updateAwardEvent', 'HistoryController@updateAwardEvent');

Route::post('/storeMissleLaunch', 'HistoryController@storeMissleLaunchEvent');
Route::get('/getMissleLaunchEvents', 'HistoryController@getMissleLaunchEvents');
Route::post('/deleteMissleLaunchEvent', 'HistoryController@deleteMissleLaunchEvent');
Route::post('/updateMissleLaunchEvent', 'HistoryController@updateMissleLaunchEvent');

// Route::post('/storePanamaCanal', 'HistoryController@storeTimelineEvent');
// Route::get('/getPanamaCanalEvents', 'HistoryController@getTimelineEvents');

//ANNOUNCEMENTS
Route::post('/storeAnnouncement', 'AnnouncementController@storeAnnouncement');
Route::get('/getAnnouncements', 'AnnouncementController@getAnnouncements');
Route::post('/updateAnnouncement', 'AnnouncementController@updateAnnouncement');
Route::post('/deleteAnnouncement', 'AnnouncementController@deleteAnnouncement');

//DECKLOGS
Route::post('/storeDecklog', 'DecklogsController@store');
Route::get('/getDeckLogs', 'DecklogsController@index');
Route::post('/showDecklogs', 'DecklogsController@show');
Route::post('/filterData', 'DecklogsController@getFilterData');

//IMAGES
Route::get('/photos', 'ImagesController@getPhotos');
Route::post('/photos', 'ImagesController@uploadPhotos');
Route::delete('/photos', 'ImagesController@deletePhotos');
Route::get('/galleryNames', 'ImagesController@getGalleryNames');

