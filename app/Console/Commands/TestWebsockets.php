<?php

namespace App\Console\Commands;

use App\Events\CurrencyRatesUpdated;
use App\Services\CurrencyRateService;
use Illuminate\Console\Command;

class TestWebsockets extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'websockets:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $rates = CurrencyRateService::getRates();
        $newMessage = new CurrencyRatesUpdated($rates);
        broadcast($newMessage)->toOthers();
        return 1;
    }
}
