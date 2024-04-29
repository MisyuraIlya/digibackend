#!/bin/bash

echo 'electronResponse:{"progress":10,"title":"creating database", "isDone":false}'
sleep 2
yes | php bin/console doctrine:database:create
echo 'electronResponse:{"progress":30,"title":"creating migrate schema", "isDone":false}'
sleep 2
yes | php bin/console make:migration
echo 'electronResponse:{"progress":50,"title":"run migration", "isDone":false}'
sleep 2
yes | php bin/console doctrine:migrations:migrate --no-interaction
echo 'electronResponse:{"progress":70,"title":"fetch ERP data", "isDone":false}'
sleep 2
php bin/console CronManager
echo 'electronResponse:{"progress":90,"title":"almost done", "isDone":false}'
sleep 2
echo 'electronResponse:{"progress":100,"title":"done", "isDone":true}'
php-fpm

