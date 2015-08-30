---
title: WebSockets y SocketIO
author: pjnovas
layout: post
permalink: /2012/11/websockets-y-socketio/
dsq_thread_id:
  - 940507029
categories:
  - Bibliotecas
  - Server Side
tags:
  - nodejs
  - npm
  - websocket
migration_issue: highlightline
---
Si todavía no arrancaste a ver la magia del protocolo WS (web socket) este post intenta meterte en tema.

### Qué es WebSocket?

[<img src="http://fernetjs.com/wp-content/uploads/2012/11/ws_logo-150x150.png" alt="" title="ws_logo" width="150" height="150" class="alignleft size-thumbnail wp-image-3024" />][1]  
WebSocket es un protocolo nuevo para la web bajo TCP, por el cual, a diferencia de la conexión que venimos usando bajo HTTP, este es bi-direccional, que significa esto?, hoy por hoy venís usando una conexión en una sola dirección, pedís al servidor y esperas la respuesta (o viceversa con ServerEvents). Pero con web sockets el servidor te habla también, te puede llamar y mandar un mensaje en cualquier momento.

Esto es genial, ya que las posibilidades de magia en un sito web aumentan considerablemente, pero hay que tener en cuenta algunas cosas, ya que son **Web** Sockets:  
[<img src="http://fernetjs.com/wp-content/uploads/2012/11/cables21-300x223.jpg" alt="" title="cables21" width="300" height="223" class="alignleft size-medium wp-image-3042" style="margin-right: 30px; margin-top: 10px;" />][2]

  * Se inicia con un *handshake* HTTP, por lo que si no hay HTTP no hay WebSockets
  * Tanto servidor como cliente tienen que soportarlo (para eso tenemos a HTML 5 en cliente y SocketIO en el servicor 😛 )
  * Sólo podemos transmitir texto/ JSON (a diferencia del TCP convencional en el que podemos transmitir streams de bytes)
  * La conexión TCP va por el puerto 80 (lo cual está bueno en algunos casos donde tenemos firewalls)
  * Así como tenemos HTTPS (seguros), podemos tener WSS jeje, pero no todos los navegadores que soportan WS, también soportan WSS



### Cómo funciona?

[<img src="http://fernetjs.com/wp-content/uploads/2012/11/websocket-lifecycle-300x245.png" alt="" title="websocket-lifecycle" width="300" height="245" class="alignright size-medium wp-image-3022" />][3]

Para iniciar una conexión con el protocolo WS primero el cliente le pide al servidor que quiere iniciar esta conexión (handshake: se pasan unos secretitos para validarse), el servidor responde un &#8220;dale para adelante&#8221; y a partir de ahí dejan de utilizar HTTP y pasan a WS.  
Aparte de darnos está posibilidad de una conexión bi-direccional, nos ahorramos el &#8220;payload&#8221;, es decir, en estas transmiciones que hacemos por el protocolo ws ya no tenemos el HTTP header y toda la data de &#8220;info&#8221; para que el servidor sepa que le enviamos y nosotros que recibimos, qué tipo de conexión usamos, etc.  
Tengamos en cuenta que transmitimos texto y nos quedamos enganchados al servidor hasta que nosotros como clientes decidamos que no queremos estar mas comunicados.

Ahora que ya sabemos de que se trata, vamos a utilizarlo.

* * *

[<img src="http://fernetjs.com/wp-content/uploads/2012/11/socketio_logo.png" alt="" title="socketio_logo" style="width: 300px; height: 100px;" class="aligncenter size-thumbnail wp-image-3025" />][4]</p> 

SocketIO es una biblioteca que nos facilita increíblemente el uso de web sockets en NodeJS.  
Así que arranquemos a configurar:

Instalamos el paquete NPM de SocketIO y ya que estamos instalamos el de ExpressJS para nuestro servidor Web:

{% highlight bash %}
npm install socket.io
npm install express
 {% endhighlight %}

Creamos un server.js donde vamos a levantar nuestro servidor Express con soporte para WebSocket

<!--highlight:[6,18,27,31,35]-->
{% highlight js %}
//referenciamos a expressJS
var app = require('express')()
  // creamos un web server
  , server = require('http').createServer(app)
  // y le agregamos le agregamos socketIO
  , io = require('socket.io').listen(server);

// ponemos en escucha nuestro server Express con WebSocket
server.listen(80);

// agregamos una ruta inicial para retornar un index.html
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// nos suscribimos al evento de socketIO cuando 
// un cliente se conecta por WebSockets
io.sockets.on('connection', function (socket) {

  // este callback va a ser llamado cuando tenemos
  // un nuevo cliente y en el argumento 'socket'
  // vamos a tener nuestro 'enganche' a ese cliente  

  // apenas se conecta, le mandamos un mensaje
  // de bienvenida haciendo un 'emit' con un nombre
  // para el mensaje y un json con los datos
  socket.emit('bienvenida', { digo: 'Hola cliente WS!' });

  // nos suscribimos a un mensaje que nos puede 
  // enviar el cliente.
  socket.on('quiero un random', function (cada_cuanto) {

    setInterval(function(){
      var rnd = Math.floor((Math.random()*1000)+1);
      socket.emit('toma un random', { numero: rnd })
    }, cada_cuanto);

  });
});
 {% endhighlight %}

Ahora creamos un index.html que es el que retorna el servidor con la conexión a WebSocket

<!--highlight:[6,10,14,20,25]-->
{% highlight js %}
<!DOCTYPE html>
<html>
  <head>
    <!-- Este script no existe!, y está bien que así sea, ya que lo genera 
         SocketIO automáticamente al recibir el pedido del archivo -->
    <script src="/socket.io/socket.io.js" type="text/javascript"></script>

    <script type="text/javascript">
      // Nos conectamos al WebSocket
      var socket = io.connect('http://localhost');

      // Nos suscribimos al mensaje de bienvenida 
      // que creamos en el servidor
      socket.on('bienvenida', function (bienvenida) {
        document.write(bienvenida.digo);
        
        // Una vez que nos saluda el servidor
        // Le enviamos un mensaje pidiendo un random 
        // cada 5 segundos (5000 milisegundos)
        socket.emit('quiero un random', 5000);
      });

      // Por otro lado nos suscribimos al mensaje del
      // del servidor para el número random que nos va a enviar
      socket.on('toma un random', function (data) {
        console.log(data.numero);
      }); 
    </script>
  </head>
  <body>
    <!-- acá toda la magia en HTML -->
  <body/>
</html>
 {% endhighlight %}

Lo que nos queda es correr el servidor web

{% highlight bash %}
node server.js
 {% endhighlight %}

Abrimos un navegador y llamamos a http://localhost y listo! (abrí la consola para ver las llamadas del servidor con los randoms <img src="http://fernetjs.com/wp-includes/images/smilies/simple-smile.png" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" /> ).

> Al principio expliqué que tanto el cliente como el servidor deben soportar web sockets, tenemos que tener en cuenta que es necesario HTML5 con web sockets, te dejo este [LINK][5] con el detalle de los navegadores que lo soportan. Fuera de eso tené en cuenta que SocketIO se encarga de que la conexión funcione sin importar el navegador, esto lo hace intentando con otros mecanismos de transporte (XHR Pooling, Flash Sockets, etc.). No va a ser con web sockets pero va a funcionar como si lo fuera <img src="http://fernetjs.com/wp-includes/images/smilies/simple-smile.png" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" /> 

**Te dejo el código del ejemplo &#8211; [ejemplo.zip][6]**

Toma este código como un ejemplo muy simple y básico de SocketIO, se pueden hacer muchísimas cosas más, como armar rooms o agrupar clientes por ruta de URI, emitir mensajes a todos o sólo al que le *habló* al servidor, etc.  
Te recomiendo que veas mas ejemplos en el sitio de [socket.io: how to use][7]

#### Links Útiles

  * [NodeJS][8]
  * [SocketIO][9]
  * [ExpressJS][10]

 [1]: http://fernetjs.com/wp-content/uploads/2012/11/ws_logo.png
 [2]: http://fernetjs.com/wp-content/uploads/2012/11/cables21.jpg
 [3]: http://fernetjs.com/wp-content/uploads/2012/11/websocket-lifecycle.png
 [4]: http://fernetjs.com/wp-content/uploads/2012/11/socketio_logo.png
 [5]: http://caniuse.com/#feat=websockets
 [6]: http://fernetjs.com/wp-content/uploads/2012/11/ejemplo.zip
 [7]: http://socket.io/#how-to-use
 [8]: http://nodejs.org/ "NodeJS"
 [9]: http://socket.io/ "SocketIO"
 [10]: http://expressjs.com/ "ExpressJS"