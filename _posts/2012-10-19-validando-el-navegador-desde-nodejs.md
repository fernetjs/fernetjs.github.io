---
title: Validando el Navegador desde NodeJS
author: Pablo Novas
layout: post
permalink: /2012/10/validando-el-navegador-desde-nodejs/
dsq_thread_id:
  - 891882913
categories:
  - Server Side
  - Utilidades
tags:
  - navegadores
  - nodejs
  - user-agent
---
Supongamos que tenemos un sitio web extremadamente coqueto con lo último en tecnología HTML5, CSS3 y toda la locura. Pero entra un usuario con Internet Explorer 6 y le explota en la cara, se rompe todo, la mayoría de la magia que nos llevo mucho trabajo hacer ni siquiera la visualiza. 

Bueno, si, IE6?, podría decir IE8 o hasta Mozilla 4, etc. El punto es, si usamos lo nuevo no estamos soportando los navegadores anteriores, y que hacemos?, tenemos varias opciones: 

  * degradamos el sitio para que funcione de la mejor forma posible con navegadores viejitos
  * le mostramos un mensaje: &#8220;Actualizate esa cosa con la que navegas&#8221;
  * le avisamos que no va a funcionar bien
  * todas las anteriores
  * etc&#8230;

En todos los casos, primero tenemos que enterarnos de que está navegando con algo que no soportamos del todo.

Una forma es inspeccionar en el Encabezado (header) HTTP, la propiedad *User-Agent*. En esa propiedad de la petición enviada por el navegador vamos a ver todo el detalle de *quién es*.

Por ejemplo, un posible encabezado para Internet Explorer 9:

<pre class="brush: bash; highlight: [4]; title: ; notranslate" title="">GET / HTTP/1.1
Accept: text/html
Accept-Language: es-AR
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)
Accept-Encoding: gzip, deflate
Proxy-Connection: Keep-Alive
Host: example.com
</pre>

> Mozilla/5.0 ?, si, por [razones históricas][1] Internet Explorer se identifica como un navegador Mozilla, que loco no? 

Bueno, ahí tenemos mucha data, hasta el Sistema Operativo y tiene un patrón, una forma exacta de parseo, que es cada cosa, etc. pero no vamos a reinventar la rueda &#8230;

### Leyendo el UserAgent con NodeJS

Tenemos varios paquetes NPM para leer el UserAgent, en este caso les voy a mostrar [useragent de 3rd-Eden][2], elegí este porque me pareció el mas simple de usar.

Supongamos que tenemos un servidor en NodeJS con Express y bajo un pedido de una página queremos validar el navegador:

<pre class="brush: jscript; title: ; notranslate" title="">// hacemos referencia al paquete
var useragent = require('useragent');

//le avisamos que vamos usar algunas características más
require('useragent/features');

//configuraciones de Express para crear el servidor 

//Nuestra ruta inicial del sitio
app.get('/', function(req, res) {
  //agarramos el valor de la propiedad desde el header del request
  var uAgent = req.headers['user-agent'];

  //dejamos que la biblioteca parsee por nosotros
  var agent = useragent.parse(uAgent);

  //despues simplemente hacemos las validaciones
  var ua = useragent.is(uAgent);

  if (ua.ie && agent.satisfies('&lt;9')) {
     res.send("tu navegador es Internet Explorer con versión menor a 9");
  }

  if (ua.firefox && agent.satisfies('&lt;12')) {
     res.send("tu navegador es Firefox con versión menor a 12");
  }

  if (ua.chrome && agent.satisfies('&lt;20')) {
     res.send("tu navegador es Google Chrome con versión menor a 20");
  }

  // y así sucesivamente
});
</pre>

Se pueden hacer muchas cosas mas con esa biblioteca, pueden ver más sobre la api en [useragent de 3rd-Eden][2].

 [1]: http://fernetjs.com/la-historia-de-javascript/ "La Historia de Javascript"
 [2]: https://github.com/3rd-Eden/useragent