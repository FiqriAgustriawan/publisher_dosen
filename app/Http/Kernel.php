<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
  /**
   * The application's route middleware.
   *
   * These middleware may be assigned to groups or used individually.
   *
   * @var array
   */
  protected $routeMiddleware = [
    // ...existing code...
   
  ];

  /**
   * The application's global HTTP middleware stack.
   *
   * This stack is run during every request to your application.
   *
   * @var array
   */
  protected $middleware = [
    // ... middleware lainnya
    \App\Http\Middleware\HandleAppearance::class,
  ];
}
