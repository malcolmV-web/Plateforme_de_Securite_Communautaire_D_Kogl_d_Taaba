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
       Schema::create('conseils', function (Blueprint $table) {
            $table->id();
            $table->enum('categorie', ['famille', 'numérique', 'habitation']);
            $table->string('titre');
            $table->string('theme')->nullable(); // ajouté depuis JSON
            $table->text('contenu');
            $table->timestamp('date_publication')->nullable(); // depuis JSON
            $table->timestamps();
            });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conseils');
    }
};
