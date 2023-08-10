<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;

Route::group(["middleware"=>"auth:api"],function(){
    //$user = Auth::user();

    Route::post('getUsers',[UserController::class,'getUsers']);
    Route::post('followUsers',[UserController::class,'followUsers']);
    Route::post('post',[UserController::class,'post']);
    Route::post('getPosts',[UserController::class,'getPosts']);
    Route::get('/images/{filename}', [UserController::class, 'getPics']);
    
});

Route::get("unauthorized", [AuthController::class, "unauthorized"])->name("unauthorized");
Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);
Route::post('logout',[AuthController::class,'logout']);