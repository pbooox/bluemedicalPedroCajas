<?php

namespace App\Http\Controllers;

use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TypeController extends Controller
{
    public function store(Request $request) {
        // error_log($request);
        Type::create([
            'name' => $request->name,
            'payment' => $request->payment,
        ]);

        return response()->json([
            'code' => 200,
            'message'=> 'Tipo registrado exitosamente.'
        ], 200);
    }

    public function get(Request $request) {
        $types = DB::table('types')->get();

        return response()->json([
            'types'=> $types
        ], 200);
    }
}
