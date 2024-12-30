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
        Schema::create('DeviceLocation', function (Blueprint $table) {
            $table->uuid('id')->primary(); // Use UUID for the primary key
            $table->string('NameDeviceLocation'); 
            $table->uuid('DataUnitId');
            $table->timestamps();
            $table->softDeletes(); // Add soft deletes column

            $table->foreign('DataUnitId')->references('id')->on('DataUnit')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('DeviceLocation');
    }
};
