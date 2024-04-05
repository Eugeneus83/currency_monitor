## Installation

When the project is downloaded run the following commands:
1) sudo docker-compose build app
2) sudo docker-compose up -d
3) sudo docker-compose exec -it currencymonitor-app && composer update && npm install && npm run dev && php artisan schedule:work

After that you can see the running project by url: http://127.0.0.1:8000

While schedule worker is running every 5 minutes currency rates will be sent back to user via websocket is some data has changed
