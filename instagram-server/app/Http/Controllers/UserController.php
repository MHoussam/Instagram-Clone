<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Following;

class UserController extends Controller
{
    public function getUsers() {
        $users = User::all();

        return response()->json($users);
    }

    public function followUsers(Request $request) {

        $follows = Following::where('following_user_id', $request->following_id)
            ->where('followed_user_id', $request->followed_id)
            ->first();

        if($follows == null) {
            $following = new Following;
            $following->following_user_id = $request->following_id;
            $following->followed_user_id = $request->followed_id;
            $following->save();

            return response()->json($following);
        } else {
            $follows->delete();

            return response()->json(['message' => 'Unfollowed.']);
        }
    }
}
