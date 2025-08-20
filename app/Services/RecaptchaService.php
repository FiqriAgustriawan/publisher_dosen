<?php
// filepath: d:\jurnal-fikri\jurnalnih\app\Services\RecaptchaService.php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class RecaptchaService
{
    private string $secretKey;
    private string $verifyUrl;

    public function __construct()
    {
        $this->secretKey = config('services.recaptcha.secret_key');
        $this->verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    }

    public function verify(string $response, string $remoteIp = null): bool
    {
        if (empty($response)) {
            return false;
        }

        try {
            $response = Http::asForm()->post($this->verifyUrl, [
                'secret' => $this->secretKey,
                'response' => $response,
                'remoteip' => $remoteIp ?? request()->ip(),
            ]);

            $body = $response->json();

            if (isset($body['success']) && $body['success'] === true) {
                return true;
            }

            // Log error untuk debugging
            if (isset($body['error-codes'])) {
                Log::warning('ReCAPTCHA verification failed', [
                    'error-codes' => $body['error-codes'],
                    'ip' => $remoteIp ?? request()->ip()
                ]);
            }

            return false;
        } catch (\Exception $e) {
            Log::error('ReCAPTCHA service error: ' . $e->getMessage());
            return false;
        }
    }
}