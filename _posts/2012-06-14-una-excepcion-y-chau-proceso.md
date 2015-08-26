---
title: Una excepción y chau proceso
author: Pablo Novas
layout: post
permalink: /2012/06/una-excepcion-y-chau-proceso/
dsq_thread_id:
  - 725866480
categories:
  - Bibliotecas
  - Server Side
  - Utilidades
tags:
  - excepciones
  - nodejs
---
Bueno, no sé si te pasó antes, pero si ocurre una excepción no manejada, corta el proceso 😛  
Por ejemplo: tenemos nuestro WebServer genial corriendo en NodeJS y algo se nos pasó, algo que no esperabamos o alguna libreria explotó &#8230; chau server, se cae el proceso de NodeJS y por lo tanto nuestro WebServer muere con el <img src="http://fernetjs.com/wp-includes/images/smilies/frownie.png" alt=":(" class="wp-smiley" style="height: 1em; max-height: 1em;" />

Eso no suena nada bien &#8230;

Fuera de que el *try* y el *catch* son nuestros amigos, cometemos errores y hay situaciones en las que se nos pasa, y tampoco podemos garantizar los *catcheos* de excepciones de todas las librerias que usamos. 

Entonces, cual sería el nivel más alto para poner un try catch?: el objeto global *process* &#8230; ahí es cuando aparece un gran y maravilloso &#8220;try catch&#8221; para el *proceso* que nos puede &#8220;garantizar&#8221; (notese las comillas :P) que no se caiga al momento de explotar en mil colores:

{% highlight js %}
process.on("uncaughtException", function (err) { 
  console.log('Seee voló en mil pedazos, pero el proceso sigue arriba');
  console.log('Exception: ' + err.stack);
});
 {% endhighlight %}

Nos suscribimos al evento &#8220;uncaughtException&#8221; del process y a partir de ahi nos queda logear o hacer lo que creamos necesario al momento de una explosión no calculada.

Documentación de Node para [Process Event Uncaughtexception][1]

### Librerías interesantes

Pero eso no es todo: como dije antes nos &#8220;garantiza&#8221;, pero entre comillas. Para estar completamente seguros tenemos alguna librerias:

[Nodemon][2]
:   Para ambiente de desarrollo, Nodemon vigila los archivos y si alguno se modifica re inicia le proceso

[Forever][3]
:   Una herramienta para asegurarnos que nuestro proceso corra por siempre, si cae vuelve arriba (se pueden configurar la cantidad de intentos y tambien usarlo dentro de la app NodeJS)

[Node Supervisor][4]
:   Basicamente hace lo mismo que las dos anteriores. Por linea de comando seteamos parámetros para vigilar, re-start onError, etc.

[LearnBoost: Up][5]
:   Otra opcion piola de parte de LearnBoost

Yo no probé ninguna y estoy con ganas de arrancar, usaste alguna de esas?, otra?

 [1]: http://nodejs.org/api/process.html#process_event_uncaughtexception
 [2]: https://github.com/remy/nodemon
 [3]: https://github.com/nodejitsu/forever
 [4]: https://github.com/isaacs/node-supervisor
 [5]: https://github.com/LearnBoost/up