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
        Schema::create('DetailedDeviceLocation', function (Blueprint $table) {
            $table->uuid('id')->primary(); // Use UUID for the primary key
            $table->string('NameDetailLocation');
            $table->string('MainDetailLocation')->nullable();
            $table->string('SubOfMainDetailLocation')->nullable(); 
            $table->uuid('DeviceLocationId');
            $table->timestamps();
            $table->softDeletes(); // Add soft deletes column

            $table->foreign('DeviceLocationId')->references('id')->on('DeviceLocation')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('DetailedDeviceLocation');
    }
};
