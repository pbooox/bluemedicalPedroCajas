<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->post('/types', ['uses' => 'TypeController@store']);
$router->get('/types', ['uses' => 'TypeController@get']);

$router->post('/vehicles', ['uses' => 'VehicleController@store']);
$router->get('/vehicles', ['uses' => 'VehicleController@get']);
$router->get('/vehicles/payment', ['uses' => 'VehicleController@payment']);


$router->post('/register/entry', ['uses' => 'RegisterController@entry']);
$router->post('/register/exit', ['uses' => 'RegisterController@exit']);
$router->delete('/register', ['uses' => 'RegisterController@comienza']);
$router->get('/register', ['uses' => 'RegisterController@get']);

