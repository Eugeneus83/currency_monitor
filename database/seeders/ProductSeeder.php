<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $productsToCreate = 20 - Product::count();
        for ($i = 1; $i <= $productsToCreate; $i ++) {
            Product::create([
                'name' => "Test product $i",
                'description' => "Test product $i description",
                'price' => round(rand(30, 50) / 10,  2)
            ]);
        }
    }
}
