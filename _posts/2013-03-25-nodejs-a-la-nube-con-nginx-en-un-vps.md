---
title: NodeJS a la nube con NGINX en un VPS
author: pjnovas
layout: post
permalink: /2013/03/nodejs-a-la-nube-con-nginx-en-un-vps/
dsq_thread_id:
  - 1163757113
categories:
  - Server Side
  - Utilidades
tags:
  - nginx
  - nodejs
  - vps
migration_issue: highlightline
---
Anteriormente expliqué como poner productiva una app en NodeJS utilizando PaaS en [NodeJS con Nodejitsu y Nodester][1], pero hace poco me puse a investigar para ir mas allá, así que me compré un VPS (Servidor Virtual Privado) e incursioné en el desafío.

Comprar un VPS, instalar una distribución de linux y configurar Node es bastante sencillo, luego bajar nuestro proyecto y ponerlo en funcionamiento tampoco tiene muchas vueltas, es lo mismo que en local en nuestras maquinas (todo por terminal/ consola). Pero la idea de un VPS es que no vamos a tener un solo proceso node, tenemos un servidor para nosotros, vamos a meter muchos procesos, varias bases de datos, la idea es que vamos más allá de una app en nodejs.

### El puerto 80

Nos levantamos un servidor node en el puerto 80, y ahora?, no podemos usar el mismo puerto para otro servidor, pero queremos que la IP de nuestro VPS sirva ambos servidores.  
Por ejemplo tener ejemplo.com y ejemplo2.com en el mismo servidor pero en 2 procesos distintos, es decir, cada proceso con un puerto diferente, pero para el usuario es el 80.

### Virtual Hosts

Básicamente un virtual host nos va a permitir realizar un [reverse proxy][2], es decir, cada request que nos ingresa al servidor por el puerto 80, manejamos que proceso de node sirve fijándonos el dominio por le que ingresó.

Bueno, hay algunas opciones para hacer esto en forma visual (que dependen de la distribución linux que hayamos elegido).  
Para mi caso voy a ir con CentOS 6, para complicarla bien, ni siquiera podemos usar [Kloxo][3] (en la ver. 6 de CentOS), también tenemos otras opciones como puede ser [WebMin][4], pero investigando un poco más me encontré con un punto interesante: si tenemos un VPS, donde lo importante (y limitante al bolsillo) es la transferencia mensual (entre otras cosas), no nos conviene utilizar estas herramientas web que simplemente al configurar vamos a estar consumiendo los recursos. No digo que es un limitante, pero es un punto importante aunque también es mas divertido meter mano lo máximo que se pueda. Así que descartemos estas herramientas.

### Apache vs NGINX

Los que hayan usado Apache (por ejemplo para PHP) conocerán que es bastante simple configurar Virtual Hosts, pero yo tenia NodeJS, no PHP, y casualmente con Apache no vamos a estar utilizando el potencial de NodeJS así que seguí investigando y me encontré con NGINX, el cual es orientado a eventos, por lo que sería ideal para nuestro caso donde tenemos varios procesos NodeJS.

### Instalando NGINX

La instalación va a depender de la Distribución de Linux / el SO que elijamos, para el caso de CentOS va por yum

{% highlight bash %}
wget http://nginx.org/packages/centos/6/noarch/RPMS/nginx-release-centos-6-0.el6.ngx.noarch.rpm
rpm -ivh nginx-release-centos-6-0.el6.ngx.noarch.rpm
yum install nginx
 {% endhighlight %}

### Configurando NGINX

> Como conté al inicio del post, es la primera vez que me meto en todo esto, así que la configuración que les voy a mostrar es lo básico para poner en funcionamiento nuestros servidores NodeJS, no mas que eso. 

[nginx][5] (se pronuncia enyinex, como Engine X en inglés :P), a diferencia de Apache, actual como un ReverseProxy antes que un HTTP Server. Y su configuración es parecida a un JSON con una suerte de herencia jerárquica, es decir, las configuraciones de abajo reemplazan a las de arriba ([dependiendo el caso][6])

Sin meterme mucho en la configuración, ya que desconozco ampliamente (pueden ver mas [acá][7]), tenemos 3 componentes importantes:

http > server > location : donde *server* serían el equivalente al VirtualHost en Apache y *location* las rutas a los recursos (URIs).

Entonces, para nuestro caso particular donde queremos 2 procesos nodejs utilizando dominios distintos y que ambos sean accesibles desde la misma IP (de nuestro VPS) bajo el puerto 80, deberíamos crear un http, con 2 *server* y sus respectivas *location* (URI raíz) apuntando a nuestros procesos.

Así que primero, configuramos nuestros procesos de Node para que corran, por ejemplo, uno en el puerto 3000 y el otro en el 3050 y después armemos el config:

Abrimos el archivo de configuración para Linux:

{% highlight bash %}
vim /etc/nginx/nginx.conf
 {% endhighlight %}

<!--highlight:[4,5,12,18,19,26]-->
{% highlight bash %}
# acá otras configuraciones
http {
  server {
    listen   80;
    server_name ejemplo1.com www.ejemplo1.com *.ejemplo1.com;

    location / {
         proxy_set_header X-Real-IP $remote_addr;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
         proxy_set_header Host $http_host;
         proxy_set_header X-NginX-Proxy true;
         proxy_pass http://127.0.0.1:3000/;
         proxy_redirect off;
    }
  }

  server {
    listen   80;
    server_name ejemplo2.com www.ejemplo2.com *.ejemplo2.com;

    location / {
         proxy_set_header X-Real-IP $remote_addr;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
         proxy_set_header Host $http_host;
         proxy_set_header X-NginX-Proxy true;
         proxy_pass http://127.0.0.1:3050/;
         proxy_redirect off;
    }
  }
}
 {% endhighlight %}

Guardamos el config y arrancamos nginx

{% highlight bash %}
sudo service nginx start
 {% endhighlight %}

Pueden ver un ejemplo de una configuración [acá][8]

Y listo!, ahora entramos a http://ejemplo1.com y nos levanta el servidor que tenemos en el puerto 3000 y si entramos a http://ejemplo2.com el del puerto 3050.

### Mas info.

#### NGINX (Inglés)

  * [Wiki][5]
  * [Intro][7]
  * [Entendiendo el Modelo de Herencia][6]
  * [Diferencias con Apache][9]
  * [Por qué deberías usarlo?][10]

 [1]: http://fernetjs.com/2012/07/nodejs-en-la-nube-con-nodejitsu-y-nodester/ "NodeJS en la nube con Nodejitsu y Nodester"
 [2]: http://es.wikipedia.org/wiki/Proxy#Reverse_Proxy_.2F_Proxy_inverso
 [3]: http://lxcenter.org/software/kloxo
 [4]: http://www.webmin.com/
 [5]: http://wiki.nginx.org/Main
 [6]: http://blog.martinfjordvald.com/2012/08/understanding-the-nginx-configuration-inheritance-model/
 [7]: http://blog.martinfjordvald.com/2010/07/nginx-primer/
 [8]: http://wiki.nginx.org/NginxFullExample
 [9]: http://blog.martinfjordvald.com/2011/02/nginx-primer-2-from-apache-to-nginx/
 [10]: http://wiki.nginx.org/WhyUseIt