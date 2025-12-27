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
        Schema::create('points_accueil', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('type'); // commissariat, gendarmerie, pompier, etc.
            $table->string('ville');
            $table->text('adresse')->nullable(); // au cas où pas toujours disponible
            $table->string('contact');
             $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('point_accueils');
    }
};
