<?php


namespace App;

use BeyondCode\LaravelWebSockets\QueryParameters;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;
use App\Events\NewMessage;
use Illuminate\Support\Facades\Log;

class MyCustomWebSocketHandler extends \BeyondCode\LaravelWebSockets\WebSockets\WebSocketHandler
{

    public function onMessage(ConnectionInterface $connection, $message)
    {
        parent::onMessage($connection, $message);
        if ($message->getPayload()) {
            $payload = json_decode($message->getPayload(), true);
            $eventName = Str::camel(Str::after(Arr::get($payload, 'event'), ':'));
            if ($eventName === 'subscribe') {
                $newMessage = new NewMessage(['lalala' => 'opana']);
                //NewMessage::dispatch(['lalala' => 'opana'])->delay(Carbon::now()->addSeconds(5));
                broadcast($newMessage)->toOthers();
            }
        }
    }
}
