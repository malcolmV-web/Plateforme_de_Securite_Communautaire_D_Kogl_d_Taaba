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
        Schema::create('signalements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('type');
            $table->string('titre'); // ajout depuis JSON
            $table->text('description');
            $table->string('lieu'); // correspond à localisation dans JSON
            $table->enum('statut', ['en attente', 'en cours', 'traité'])->default('en attente');
            $table->timestamps();
            });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('signalements');
    }
};
