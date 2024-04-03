<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use App\Services\CurrencyRateService;
use App\Events\CurrencyRatesUpdated;

class RefreshRates implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(): void
    {
        $rates = CurrencyRateService::getRates();
        $hash = md5(json_encode($rates));
        $hashKey = 'currency_rates_hash';
        $oldHash = Cache::get($hashKey);
        // Update cache and broadcast only if some data has been changed
        if ($hash !== $oldHash) {
            Cache::put($hashKey, $hash, now()->addHours(24));
            $newMessage = new CurrencyRatesUpdated($rates);
            broadcast($newMessage)->toOthers();
        }
    }
}
