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
        Schema::table('audits', function (Blueprint $table) {
            // Update the auditable columns to use UUIDs
            $table->dropColumn(['auditable_id', 'auditable_type']);
            $table->string('auditable_type');
            $table->uuid('auditable_id');
            $table->index(['auditable_type', 'auditable_id']);
            
            // Update the user columns to use UUIDs if necessary
            $table->dropColumn(['user_id', 'user_type']);
            $table->string('user_type')->nullable();
            $table->uuid('user_id')->nullable();
            $table->index(['user_type', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('audits', function (Blueprint $table) {
            // Revert the changes
            $table->dropIndex(['auditable_type', 'auditable_id']);
            $table->dropIndex(['user_type', 'user_id']);
            
            $table->dropColumn(['auditable_id', 'auditable_type']);
            $table->morphs('auditable');
            
            $table->dropColumn(['user_id', 'user_type']);
            $table->nullableMorphs('user');
        });
    }
};
