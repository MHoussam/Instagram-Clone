<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Following;
use App\Models\Post;
//use App\Http\Controllers\DB;
use Illuminate\Support\Facades\DB;



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

    function post(Request $request) {
        $posts = new Post;

        $request->validate([
            'photo' => 'image|mimes:jpg,png,jpeg|max:5048'
        ]);
    
        if ($request->hasFile('photo')) {
            $filename = time() . '.' . $request->file('photo')->getClientOriginalExtension();
            $request->file('photo')->move(public_path('images'), $filename);
            $posts->photo = 'images/' . $filename;
        }
    
        $posts->user_id = $request->user_id;
        $posts->caption = $request->caption;
        $posts->uploaded_at = now();
        $posts->save();
    
        return json_encode($posts);
    }

    function getPosts(Request $request) {

        $follows = DB::table('followings')
            ->where('following_user_id', '=', $request->following_id)
            ->select('followed_user_id')
            ->get()
            ->pluck('followed_user_id')
            ->toArray();

        $posts = Post::whereIn('user_id', $follows)->get();
        
        return json_encode($posts);
    }
}
