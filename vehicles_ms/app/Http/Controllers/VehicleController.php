<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class VehicleController extends Controller
{
    public function store(Request $request) {
        error_log($request);
        Vehicle::create([
            'plate' => $request->plate,
            'type_id' => $request->type,
        ]);

        return response()->json([
            'code' => 200,
            'message'=> 'Vehiculo registrado exitosamente.'
        ], 200);
    }

    public function get(Request $request) {
        $vehicles = Vehicle::with('type')->get();

        return response()->json([
            'vehicles'=> $vehicles
        ], 200);
    }

    public function payment() {
        $vehicles = Vehicle::
            select('plate', 'minutes')
            ->selectRaw('(minutes * types.payment) as total')
            ->join('types', 'vehicles.type_id', '=', 'types.id')
            ->where('type_id', 2)
            ->get();

        return response()->json([
            'vehicles'=> $vehicles
        ], 200);
    }
}
