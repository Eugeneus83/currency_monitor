## Installation

When the project is downloaded run the following commands:

On Ubuntu:
1) sudo docker-compose build
2) sudo docker-compose up -d
3) sudo ./docker-compose/entrypoint.sh

After that you can see the running project by url: http://127.0.0.1:8000

While schedule worker is running every 5 minutes currency rates will be sent back to user via websocket is some data has changed
