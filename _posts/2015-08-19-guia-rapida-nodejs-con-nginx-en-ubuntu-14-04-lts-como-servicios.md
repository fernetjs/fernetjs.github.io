---
title: 'Guía rápida: NodeJS con NGINX en Ubuntu 14.04 LTS como servicios'
author: Pablo Novas
layout: post
permalink: /2015/08/guia-rapida-nodejs-con-nginx-en-ubuntu-14-04-lts-como-servicios/
dsq_thread_id:
  - 4047520673
categories:
  - Server Side
  - Utilidades
tags:
  - nginx
  - nodejs
  - vps
---
Hace mucho que no escribo un post y justo ayer tuve que levantar un VPS como servicio para sacar screen-shots de sitios web así que dejó una pequeña guía para tenerlo funcionando en un sistema operativo Ubuntu 14.04 LTS, y de paso actualizo el [viejo post][1].

Asumo que tenemos acceso por SSH al server como root, o al menos con privilegios para sudo.

### Instalamos [NodeJS][2]

Desde el ubuntu package manager:

<pre class="brush: bash; title: ; notranslate" title="">sudo apt-get update
sudo apt-get install nodejs npm
</pre>

Al instalar desde los paquetes de Ubuntu, `nodejs` no nos va a quedar como `node`, sino como `nodejs`, así que creamos un link simbólico (<a href="https://es.wikipedia.org/wiki/Enlace_simb%C3%B3lico" target="_blank">symlink</a>) para poder usar `node`.

<pre class="brush: bash; title: ; notranslate" title="">ln -s /usr/bin/nodejs /usr/bin/node
node --version
</pre>

Actualizamos NPM a la última versión:

<pre class="brush: bash; title: ; notranslate" title="">npm install -g npm
npm --version
</pre>

Es muy loco como se actualiza npm, si lo vemos en detalle usamos npm para instalar npm en sí mismo y en forma global, lo que termina resultando en la actualización a la última versión

### Instalamos [NGINX][3]

<pre class="brush: bash; title: ; notranslate" title="">sudo apt-get install nginx
</pre>

Y lo configuramos para que funcione como servicio de Ubuntu (lo mas probable es que ya esté configurado al instalar, pero por si las dudas).

<pre class="brush: bash; title: ; notranslate" title="">sudo update-rc.d nginx defaults
</pre>

Esto nos asegura que al reiniciar el servidor NGINX vuelva a levantar solo.  
Probamos que ya esté en funcionamiento abriendo el navegador y *pateando* la url http://[IP\_pública\_del_servidor] deberíamos ver un mensaje de bienvenida a nginx.

#### Configuramos NGINX para que sirva a nodejs

NGINX nos pone a disposición 2 directorios importantes para manejar los servidores:

  * /etc/nginx/sites-enabled/
  * /etc/nginx/sites-available/

En sites-available vamos a tener las configuraciones de los servidores y en sites-enabled links simbólicos a esas configuraciones, de esta manera podemos manejar que servidores son accesibles manteniendo su configuración.

Así que utilicemos el default que viene (donde apunta a la bienvenida que vimos al instalar) para crear un server:

<pre class="brush: bash; title: ; notranslate" title="">cp /etc/nginx/sites-available/default /etc/nginx/sites-available/fernetjs.com
</pre>

Ahora abrimos la nueva configuración de servidor y la modificamos a un servidor nodejs:

<pre class="brush: bash; title: ; notranslate" title="">vim /etc/nginx/sites-available/fernetjs.com
</pre>

Vamos a ver algo como lo siguiente:

<pre class="brush: jscript; title: ; notranslate" title="">server {
        listen 80 default_server;
        listen [::]:80 default_server ipv6only=on;

        root /usr/share/nginx/html;
        index index.html index.htm;

        # Make site accessible from http://localhost/
        server_name localhost;

        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ /index.html;
                # Uncomment to enable naxsi on this location
                # include /etc/nginx/naxsi.rules
        }
}
</pre>

Lo modificamos para que cumpla con nuestro dominio cambiando default_server y agregando el proxy a un futuro proceso node que vamos a ver mas adelante:

<pre class="brush: jscript; title: ; notranslate" title="">server {
    listen 80;
    listen [::]:80 ipv6only=on;

    server_name fernetjs.com www.fernetjs.com;

    access_log /var/log/nginx/fernetjs.com.access.log;

    location / {
        proxy_pass http://localhost:3000/;
        proxy_set_header Host $host;
    }
}
</pre>

Ahora tenemos un servidor que escucha en el puerto 80 de nginx y sólo cuando se ingresa por el dominio fernetjs.com o www.fernetjs.com va a utilizar el servidor web de node que tengamos corriendo en el puerto 3000.

Por último creamos el link simbólico a el nuevo server en sites-enabled y le avisamos a nginx que recargue las configuraciones:

<pre class="brush: bash; title: ; notranslate" title="">ln -s /etc/nginx/sites-available/fernetjs.com /etc/nginx/sites-enabled/fernetjs.com
nginx -s reload
</pre>

### Levantamos los procesos nodejs como servicios

Nos queda tener algo que mantenga a los servidores web de nodejs corriendo y en modo de servicios de sistema operativo, así que instalamos [forever][4] y [forever-service][5]

<pre class="brush: bash; title: ; notranslate" title="">npm install -g forever forever-service
</pre>

Suponiendo que tenemos un proyecto express de nodejs instalado en /usr/local/fernetjs:  
Creamos el servicio y lo corremos en el puerto 3000:

<pre class="brush: bash; title: ; notranslate" title="">cd /usr/local/fernetjs/
sudo forever-service install fernetjs --script ./bin/www -e "NODE_ENV=production PORT=3000" --start
</pre>

Para manejar los servicios de nodejs:

  * Start &#8211; &#8220;sudo start fernetjs&#8221;
  * Stop &#8211; &#8220;sudo stop fernetjs&#8221;
  * Status &#8211; &#8220;sudo status fernetjs&#8221;
  * Restart &#8211; &#8220;sudo restart fernetjs&#8221;

Si queremos ver los logs o listar lo que tenemos en forever podemos seguir utilizando:

<pre class="brush: bash; title: ; notranslate" title="">sudo forever list
sudo forever logs [indíce]
</pre>

**A partir de ahora si reiniciamos el servidor no necesitamos levantar los servidores nodejs, correr forever de nuevo, etc** 😉

 [1]: http://fernetjs.com/2013/03/nodejs-a-la-nube-con-nginx-en-un-vps/
 [2]: https://nodejs.org/
 [3]: http://nginx.org/
 [4]: https://github.com/foreverjs/forever
 [5]: https://github.com/zapty/forever-service