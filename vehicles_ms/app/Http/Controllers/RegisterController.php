<?php

namespace App\Http\Controllers;

use App\Models\Register;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RegisterController extends Controller
{

    public function entry(Request $request) {
        error_log($request);

        $vehicle = Vehicle::where('plate', $request->plate)->with('type')->first();
        error_log($vehicle->type->id);
        // if ($vehicle->type->id == 1) {
        Register::create([
            'vehicle_id' => $vehicle->id,
            'entry_time' => Carbon::now(),
        ]);


        return response()->json([
            'code' => 200,
            'message'=> 'Vehiculo oficial ingresado exitosamente.'
        ], 200);
        // } else if ($vehicle->type->id == 2) {

        // } else if ($vehicle->type->id == 3) {

        // }
        error_log($vehicle);

        // Type::create([
        //     'name' => $request->name,
        //     'payment' => $request->payment,
        // ]);

        // return response()->json([
        //     'code' => 200,
        //     'message'=> 'Tipo registrado exitosamente.'
        // ], 200);
    }

    public function exit(Request $request) {
        error_log($request);

        $vehicle = Vehicle::where('plate', $request->plate)->with('type')->first();
        $register = Register::latest()->first();
        error_log($vehicle->type->id);
        if ($vehicle->type->id == 1) {
            $register->exit_time = Carbon::now();
            $register->save();

            return response()->json([
                'code' => 200,
                'message'=> 'Vehiculo oficial egresado exitosamente.'
            ], 200);
        } else if ($vehicle->type->id == 2) {
            $register->exit_time = Carbon::now();
            $register->save();

            $entry = Carbon::parse($register->entry_time);
            $exit = Carbon::parse($register->exit_time);
            $minutes = $exit->diffInMinutes($entry);

            $prevMin = $vehicle->minutes;
            if($prevMin == null){
                $vehicle->minutes = $minutes;
            } else {
                $vehicle->minutes = $minutes + $prevMin;
            }
            $vehicle->save();

            return response()->json([
                'code' => 200,
                'message'=> 'Vehiculo residencial egresado exitosamente.'
            ], 200);
        } else if ($vehicle->type->id == 3) {
            $register->exit_time = Carbon::now();
            $register->save();

            $entry = Carbon::parse($register->entry_time);
            $exit = Carbon::parse($register->exit_time);
            $minutes = $exit->diffInMinutes($entry);
            $payment = $minutes * $vehicle->type->payment;




            return response()->json([
                'code' => 200,
                'message'=> 'Vehiculo no residencial egresado exitosamente.',
                'payment' => $payment
            ], 200);
        }
        error_log($vehicle);

        // Type::create([
        //     'name' => $request->name,
        //     'payment' => $request->payment,
        // ]);

        // return response()->json([
        //     'code' => 200,
        //     'message'=> 'Tipo registrado exitosamente.'
        // ], 200);
    }

    public function comienza() {
        Register::join('vehicles', 'registers.vehicle_id', '=', 'vehicles.id')
        ->join('types', 'vehicles.type_id', '=', 'types.id')
        ->where('types.id', '=', 1)->delete();

        Vehicle::where('type_id', 2)->update(['minutes' => null]);

        return response()->json([
            'code' => 200,
            'message'=> 'Datos restablecidos'
        ], 200);
    }

    public function get(Request $request) {
        $registers = Register::with('vehicle')->get();
        return response()->json([
            'registers'=> $registers
        ], 200);
    }
}
