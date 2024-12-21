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
        Schema::create('DataUnit', function (Blueprint $table) {
            $table->uuid('id')->primary(); // Use UUID for the primary key
            $table->string('NameUnit'); // Add NameUnit column
            $table->string('Plan'); // Add Plan column
            $table->timestamps();
            $table->softDeletes(); // Add soft deletes column
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_units');
    }
};
