<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeBelongDepartmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('belong_departments', function ($table) {
            $table->boolean('is_enable')->default(1)->comment('有効　1:有効  0:無効');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('belong_departments', function (Blueprint $table) {
            $table->dropColumn('is_enable');
            $table->dropSoftDeletes();
        });
    }
}
