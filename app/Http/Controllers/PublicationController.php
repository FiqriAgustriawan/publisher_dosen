<?php

namespace App\Http\Controllers;

use App\Models\Publication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PublicationController extends Controller
{
  public function store(Request $request)
  {
    $validated = $request->validate([
      'title' => 'required|string|max:255',
      'image' => 'nullable|image|max:2048',
      'link_route' => 'nullable|string|max:255',
      'description' => 'required|string',
    ]);

    if ($request->hasFile('image')) {
      $path = $request->file('image')->store('publications', 'public');
      $validated['image'] = $path;
    }

    $validated['user_id'] = Auth::id();


    if (!$validated['user_id']) {
      return redirect()->back()
        ->withErrors(['auth' => 'User authentication required'])
        ->withInput();
    }

    Publication::create($validated);

    return redirect()->back()->with('success', 'Publikasi berhasil ditambahkan');
  }
}
