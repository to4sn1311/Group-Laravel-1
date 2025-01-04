<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'email_verified_at' => now(),
            'password' => bcrypt('Kingkun1122*'),
            'is_admin' => true,
        ]);

        $categories = ['Ultrabook', 'Gaming Laptop', 'Business Laptop', 'MacBook'];

        foreach ($categories as $categoryName) {
            $category = Category::create([
                'name' => $categoryName,
            ]);

            Product::factory(10)->create([
                'category_id' => $category->id,
            ]);
        }
    }
}
