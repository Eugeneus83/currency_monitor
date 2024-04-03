<?php

namespace App\Services;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class CurrencyRateService
{
    public static function getRates(): ?array
    {
        $rates = Cache::remember('currency_rates', config('currency.cache_expires_in'), function () {
            $feedUrl = config('currency.feed_url');
            if ($feedUrl) {
                $response = Http::get($feedUrl);
                return $response->json();
            }
            return null;
        });

        return $rates;
    }
}
