<?php
// filepath: d:\jurnal-fikri\jurnalnih\database\seeders\AdminSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    // Hapus admin yang sudah ada (jika ada)
    User::whereIn('email', ['ismailskpns@gmail.com', 'admincreator@gmail.com'])->delete();

    // Buat admin pertama
    User::create([
      'name' => 'Ismail Admin',
      'email' => 'ismailskpns@gmail.com',
      'password' => Hash::make('Hesoyam##544!'),
      'email_verified_at' => now(),
      'created_at' => now(),
      'updated_at' => now(),
    ]);

    // Buat admin kedua
    User::create([
      'name' => 'Admin Creator',
      'email' => 'admincreator@gmail.com',
      'password' => Hash::make('AezmiTag!!544'),
      'email_verified_at' => now(),
      'created_at' => now(),
      'updated_at' => now(),
    ]);

  
  }
}
