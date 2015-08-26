---
title: Qué es NodeJS?, breve introducción
author: Pablo Novas
layout: post
permalink: /2011/11/que-es-nodejs-breve-introduccion/
dsq_thread_id:
  - 500347993
categories:
  - Server Side
tags:
  - nodejs
---
Antes de empezar, entendamos que NodeJS está en desarrollo, si bien lo encuentro extremadamente divertido, hay muchas cosas que todavía se están puliendo.

Mi poca experiencia con NodeJS fue descargarme el source y compilarlo desde Ubuntu, hoy por hoy (v0.6) tenemos un ejecutable (node.exe) para usarlo directo desde windows, en un próximo post les muestro como usarlo y vamos a probar un poco de NodeIIS tambien.

NodeJS es un framework para aplicaciones de red por arriba de la maquina virtual de javascript Google V8 (utilizada en el Google Chrome).

NodeJS **no está asociado al Browser**, es decir, no hay DOM, es javascript puro del lado del servidor sin jQuery, ni Dojo, etc. Es por esto que el famoso objeto global *window* no existe pero tenemos otro que es *process*.

{% highlight js %}
process.pid; // ID del proceso actual
process.info; // Información del proceso
 {% endhighlight %}

Arranquemos con un ejemplo de NodeJS  
<!--more-->

{% highlight js %}
setTimeout(function(){

   console.log("mundo");

}, 2000);

console.log("hola");
 {% endhighlight %}

El setTimeout en javascript recibe una función como callback y un tiempo de espera para ejecutar ese callback en milisegundos. Es decir, vamos a ver que imprime un *hola* y luego de 2 segundos un *mundo*.  
Pero hay una diferencia a como lo haríamos en otro lenguaje, por ejemplo en PHP quedaría algo así:

{% highlight php %}
echo("hola");
sleep(2);
echo("mundo");
 {% endhighlight %}

La diferencia es que en el ejemplo de PHP imprimimos *hola*, detenemos el proceso 2 segundos e imprimimos *mundo*, **detenemos la ejecución 2 segundos**. En NodeJS no estamos deteniendo el proceso, simplemente lo estamos poniendo en Iddle disparando asincrónicamente otra función dentro de 2 segundos, **en NodeJS NO detenemos la ejecución**.

### Construyendo un Servidor Web

NodeJS viene con un módulo para manejar peticiones y respuestas HTTP como un Servidor web:

{% highlight js %}
//Obtenemos el modulo http
var http = require('http');

//creamos nuestro servidor
var servidor = http.createServer(function(req, res){

	// escribimos un header a la respuesta con estado 200 - OK
	res.writeHead(200, {'content-type': 'text/plain'});

	// finalizamos la respuesta con un end 
	res.end('hola mundo\n'); //nuestro body
});

//ponemos un puerto en escucha para el servidor 
servidor.listen(8000);

//mostramos en la consola el estado
console.log('Servidor Iniciado, escuchando puerto 8000');
 {% endhighlight %}

La función que enviamos por parámetro en *createServer* es un callback y va a ser llamado cada vez que nuestro servidor reciba una petición.  
Si ahora guardamos ese código en un archivo, digamos servidor.js y en el terminal ejecutamos 

{% highlight bash %}
node servidor.js
 {% endhighlight %}

Vamos a ver nuestro mensaje: *Servidor Iniciado, escuchando puerto 8000*, lo único que nos quedaría es hacer una petición para ver el resultado, así que abrimos el browser y llamamos a http://localhost:8000

### HTTP Header de respuesta

Si inspeccionamos el header de nuestra respuesta HTTP veremos:

{% highlight http %}
HTTP/1.1 200 OK
content-type: text/plain
Connection: keep-alive
Transfer-Encoding: chunked
 {% endhighlight %}

Node nos está escribiendo el header con algunas cosas más de las que seteamos:

  1. HTTP/1.1 significa que tenemos la última versión de HTTP, la cual se banca quedar conectados con el cliente.
  2. *Connection: keep-alive* es que una vez conectado, mantenga viva la conexión con el cliente, que no responda y se olvide que existe nuestro cliente.
  3. *Transfer-encoding: chunked* significa que voy a estar enviando información del http body asincrónicamente hasta que lo finalice.

Veamos como funciona esto:

{% highlight js %}
var http = require('http');

var servidor = http.createServer(function(req, res){

   res.writeHead(200, {'content-type': 'text/plain'});

   res.write('hola\n'); //escribo en el body

   //dentro de 2 segundos dispara el callback 
   setTimeout(function(){

      res.end('mundo\n'); //finalizo la respuesta

   }, 2000);

});

servidor.listen(8000);

console.log('Servidor Iniciado, escuchando puerto 8000');
 {% endhighlight %}

Ahora por cada petición estoy escribiendo &#8220;hola&#8221;, a los 2 segundos escribo &#8220;mundo&#8221; y cierro el body, es por eso que necesito el *Connection: keep-alive* y *Transfer-encoding: chunked*, ya que sigo escribiendo el body más tarde.  
El punto es que no sabemos que va a contener el body, cuan grande va a ser y tampoco queremos crearnos un buffer guardando toooda nuestra respuesta, mandar todo junto y ocupar memoria en el servidor.  
Como sabe el browser que termino nuestra respuesta?, bueno antes de HTTP 1.1 el fin de respuesta era marcado con un fin de conexión con el servidor, con HTTP 1.1 podemos tener la conexión viva y responder de a pedacitos, es por eso que necesitamos ambas propiedades en el header ***Connection: keep-alive*** y ***Transfer-Encoding: chunked***.

### Entonces?

En ese tiempo entre que escribimos &#8220;hola&#8221; y &#8220;mundo&#8221; el servidor no se detuvo, no hicimos un &#8220;sleep&#8221;, simplemente el servidor pasó a Iddle y pudo haber recibido 1000 pedidos más y no por eso iba a tardar más, o multiplicar esos 2 segundos como si fuera un sleep. Es por eso que NodeJS maneja la concurrencia de usuarios de una forma mucho mas performante. 

Ahora que entendemos como funciona NodeJS, la idea no es ponerse a escribir un web-server cada vez que armemos una web, para eso existen los frameworks, los cuales también hay en NodeJS, por ejemplo <a href="http://www.expressjs.com/" title="ExpressJS" target="_blank">ExpressJS</a>.

Les recomiendo el increíble video que está en <a href="http://nodejs.org" title="NodeJS.org" target="_blank">NodeJS.org</a> (Inglés) por Ryan Dahl.