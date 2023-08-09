<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function getUsers() {
        $users = User::all();

        return response()->json($users);
    }

    public function followUsers() {
        $users = User::all();

        return response()->json($users);
    }
}
