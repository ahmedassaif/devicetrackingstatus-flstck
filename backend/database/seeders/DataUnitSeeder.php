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
        DB::table('DataUnit')->insert([
            [
                'id' => 'bb8faa9e-074e-4819-91e8-c93b55def2b4',
                'NameUnit' => 'Head Office',
                'Plan' => 'HOF',
                'created_at' => now(),
                'updated_at' => now(),
                'deleted_at' => null,
            ],
            [
                'id' => '214933ca-e161-4392-966a-7859a33b82b3',
                'NameUnit' => 'Refinery Unit II Dumai',
                'Plan' => 'K201',
                'created_at' => now(),
                'updated_at' => now(),
                'deleted_at' => null,
            ],
            [
                'id' => '3dde7386-d6dc-42e3-9ff4-17a74f6b2e05',
                'NameUnit' => 'Refinery Unit II Sei Pakning',
                'Plan' => 'K202',
                'created_at' => now(),
                'updated_at' => now(),
                'deleted_at' => null,
            ],
            [
                'id' => '8c4b6179-0f19-4d1d-9bdb-c4cff4c9bcfe',
                'NameUnit' => 'Refinery Unit III Plaju',
                'Plan' => 'K203',
                'created_at' => now(),
                'updated_at' => now(),
                'deleted_at' => null,
            ],
            [
                'id' => 'e49766e8-d969-4170-87b3-e1625a0022c4',
                'NameUnit' => 'Refinery Unit IV Cilacap',
                'Plan' => 'K204',
                'created_at' => now(),
                'updated_at' => now(),
                'deleted_at' => null,
            ],
            [
                'id' => '911f8b46-ece5-45a0-a8bc-b0460833810a',
                'NameUnit' => 'Refinery Unit V Balikpapan',
                'Plan' => 'K205',
                'created_at' => now(),
                'updated_at' => now(),
                'deleted_at' => null,
            ],
            [
                'id' => 'ad911d0d-65f5-4e5c-83a9-8766d342764c',
                'NameUnit' => 'Refinery Unit VI Balongan',
                'Plan' => 'K206',
                'created_at' => now(),
                'updated_at' => now(),
                'deleted_at' => null,
            ],
            [
                'id' => '42e277bf-2fde-4829-8e66-ad0ab7dc84f2',
                'NameUnit' => 'Refinery Unit VII Kasim',
                'Plan' => 'K207',
                'created_at' => now(),
                'updated_at' => now(),
                'deleted_at' => null,
            ],
        ]);
    }
}
