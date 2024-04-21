#!/bin/bash

docker-compose exec app composer install &&
docker-compose exec app npm install &&
docker-compose exec app npm run prod &&
docker-compose exec -d app php artisan websockets:serve &&
docker-compose exec -d app php artisan schedule:work
