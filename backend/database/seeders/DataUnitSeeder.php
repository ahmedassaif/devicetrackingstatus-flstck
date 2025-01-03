<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DataUnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::factory('DataUnit')->insert([
            [
                'NameUnit' => 'Head Office',
                'Plan' => 'HOF',
                'created_at' => now(),
                'updated_at' => now(),
                'deleted_at' => null,
            ],
            [
                'NameUnit' => 'Refinery Unit II Dumai',
                'Plan' => 'K201',
                'created_at' => now(),
                'updated_at' => now(),
                'deleted_at' => null,
            ],
            [
                'NameUnit' => 'Refinery Unit II Sei Pakning',
                'Plan' => 'K202',
                'created_at' => now(),
                'updated_at' => now(),
                'deleted_at' => null,
            ],
            [
                'NameUnit' => 'Refinery Unit III Plaju',
                'Plan' => 'K203',
                'created_at' => now(),
                'updated_at' => now(),
                'deleted_at' => null,
            ],
            [
                'NameUnit' => 'Refinery Unit IV Cilacap',
                'Plan' => 'K204',
                'created_at' => now(),
                'updated_at' => now(),
                'deleted_at' => null,
            ],
            [
                'NameUnit' => 'Refinery Unit V Balikpapan',
                'Plan' => 'K205',
                'created_at' => now(),
                'updated_at' => now(),
                'deleted_at' => null,
            ],
            [
                'NameUnit' => 'Refinery Unit VI Balongan',
                'Plan' => 'K206',
                'created_at' => now(),
                'updated_at' => now(),
                'deleted_at' => null,
            ],
            [
                'NameUnit' => 'Refinery Unit VII Kasim',
                'Plan' => 'K207',
                'created_at' => now(),
                'updated_at' => now(),
                'deleted_at' => null,
            ],
        ]);
    }
}
