<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->float('payment', 4, 2);
            $table->timestamps();
        });
        DB::table('types')->insert([
            [
                'name' => 'Oficial',
                'payment' => 0
            ],
            [
                'name' => 'Residente',
                'payment' => 0.05
            ],
            [
                'name' => 'No residente',
                'payment' => 0.5
            ],
        ]);

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('types');
    }
};
