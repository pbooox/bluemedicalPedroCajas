<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function store(Request $request) {
        // return $request;
        // error_log('holaaa');

        // error_log($request);
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'code' => 200,
            'message'=> 'Usuario registrado exitosamente.'
        ], 200);
    }

    public function login(Request $request) {
        $user = User::whereEmail($request->email)->first();

        if(!$user || !Hash::check($request->password, $user->password)){
            return response()->json([
                'code' => 401,
                'message'=> 'no existe un usuario con las credenciales enviadas'
            ], 401);
        }

        $input = $request->only('email','password');

        if (!$authorized= Auth::attempt($input)) {
            $code = 401;
            $output = [
                'code' => $code,
                'message' => 'Usuario no autorizado'
            ];
        } else {
            $token = $this->respondWithToken($authorized);
            // error_log
            $user->api_token = $authorized;
            $user->save();
            $code = 200;
            $output = [
                'code' => $code,
                'message' => 'Usuario logeado',
                'token' => $token,
                'name' => $user->name
            ];
        }

        return response()->json($output, $code);
        // $user->api_token = Str::random(150);
        // $user->save();

        // return response()->json([
        //     'code' => 200,
        //     'message' => 'usuario logeado',
        //     'token' => $user->api_token
        // ], 200);
    }

    public function get(Request $request) {
        $users = User::get();

        return response()->json([
            'users'=> $users
        ], 200);
    }
}
