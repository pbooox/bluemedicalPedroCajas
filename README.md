# Blue medical por pedro cajas
Proyecto realizado por pedro cajas

Los micro servicios los trabaje local debido a que no pude levantar el contenedor de docker.

para levantar el sistema se debe hacer:
 -npm install en la carpeta de bluemedicalfrontend
 -composer install en las carpetas de users_ms y vehicles_ms
 

luego de esto correr: 
  -npm run dev en bluemedicalfrontend
  -php artisan migrate en users_ms y vehicles_ms
  -php -S localhost:8000 -t public en users_ms
  -php -S localhost:8001 -t public en vehicles_ms

