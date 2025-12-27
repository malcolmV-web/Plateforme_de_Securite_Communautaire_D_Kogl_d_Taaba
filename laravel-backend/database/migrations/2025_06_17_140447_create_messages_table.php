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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->string('auteur')->nullable();
            $table->unsignedBigInteger('citoyen_id')->nullable();
            $table->text('contenu');
            $table->unsignedBigInteger('emetteur_id')->nullable(); 
            $table->unsignedBigInteger('recepteur_id')->nullable(); 
            $table->timestamps();

            
            $table->foreign('emetteur_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('recepteur_id')->references('id')->on('users')->onDelete('set null');
        });

}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
