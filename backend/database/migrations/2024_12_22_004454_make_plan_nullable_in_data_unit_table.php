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
        Schema::table('DataUnit', function (Blueprint $table) {
            $table->string('Plan')->nullable()->change(); // Make Plan nullable
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('DataUnit', function (Blueprint $table) {
            $table->string('Plan')->nullable(false)->change(); // Revert Plan to not nullable
            Schema::dropIfExists('data_units');
        });
    }
};
