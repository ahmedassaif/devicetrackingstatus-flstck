<?php

namespace Database\Seeders;

use App\Models\DataUnit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DataUnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DataUnit::factory()->create(
            [
                'NameUnit' => 'Head Office',
                'Plan' => 'HOF',
            ],
            [
                'NameUnit' => 'Refinery Unit II Dumai',
                'Plan' => 'K201',
            ],
            [
                'NameUnit' => 'Refinery Unit II Sei Pakning',
                'Plan' => 'K202',
            ],
            [
                'NameUnit' => 'Refinery Unit III Plaju',
                'Plan' => 'K203',
            ],
            [
                'NameUnit' => 'Refinery Unit IV Cilacap',
                'Plan' => 'K204',
            ],
            [
                'NameUnit' => 'Refinery Unit V Balikpapan',
                'Plan' => 'K205',
            ],
            [
                'NameUnit' => 'Refinery Unit VI Balongan',
                'Plan' => 'K206',
            ],
            [
                'NameUnit' => 'Refinery Unit VII Kasim',
                'Plan' => 'K207',
            ],
        );
    }
}
