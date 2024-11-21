<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToUsersTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->date('birthdate')->nullable();
            $table->float('height')->nullable();
            $table->float('weight')->nullable();
            $table->boolean('isAlive')->default(true);
            /*$table->foreignId('workoutsheet_id')->constrained()->onDelete('set null');
            $table->foreignId('diet_id')->constrained()->onDelete('set null');
            $table->foreignId('calendar_id')->constrained()->onDelete('set null');*/
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['birthdate', 'height', 'weight', 'isAlive', 'workoutsheet_id', 'diet_id', 'calendar_id']);
        });
    }
};
