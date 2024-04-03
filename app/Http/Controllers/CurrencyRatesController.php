<?php

namespace App\Http\Controllers;

use App\Services\CurrencyRateService;
use \Illuminate\Http\JsonResponse;

class CurrencyRatesController extends Controller
{
    public function index(): JsonResponse
    {
         $rates = CurrencyRateService::getRates();
         return response()->json($rates);
    }
}
