---
title: Usando la API de Twitter de forma simple
author: pjnovas
layout: post
permalink: /2012/10/usando-la-api-de-twitter-de-forma-simple/
dsq_thread_id:
  - 905770790
categories:
  - Bibliotecas
  - Server Side
  - Utilidades
tags:
  - nodejs
  - twitter api
---
Puede sonar complejo para algunos, pero engancharse de Twitter es bastante simple y si encima usamos una biblioteca para NodeJS se vuelve extremadamente simple, por eso hago este post, para los que pensaban que era un despelote puedan ver lo simple y divertido que es.

#### Objetivo

Supongamos que queremos ver lo que sucede en Twitter y bajo un texto en un Tweet responderle alguna locura, cualquier Tweet, alguien nos dice algo exacto que esperamos y le respondemos &#8230;

Primero deberíamos conectarnos por Streaming, de esta manera estamos en &#8220;escucha&#8221; continua de lo que sucede y vamos leyendo lo que nos &#8220;dicen&#8221;, una vez que nos tuitean lo que esperamos, respondemos haciendo un tuit en modo &#8220;Respuesta&#8221;.

### Creando una aplicación en Twitter Dev

Antes de meterme en tema, para *engancharnos* a Twitter necesitamos crear una aplicación en Twitter para que el último nos de unas claves secretas con el acceso.

Así que, entremos a [dev.twitter.com][1] y creemos una app yendo a SignIn, nos logeamos, vamos al mismo botón y hacemos click en Mis Aplicaciones.  
Le damos al Create an Aplication, y llenamos toda la info (callback URL lo dejamos en blanco) y click a Crear.  
Después sólo queda ingresar a la nueva app y generar las claves.

Listo!, tenemos la app creada y sus claves, ahora nos creamos un app.js en nuestro local y vamos a la parte divertida:

### Escuchando la User Stream API

Para simplificar la comunicación con Twitter desde NodeJS vamos a usar la biblioteca [Tuiter creada por Dan Zajdband][2] (ahí van a encontrar más info de como usarla), pero vamos a arrancar con nuestro objetivo. 

Bajamos Tuiter desde NPM en nuestro proyecto:

{% highlight bash %}
npm install tuiter
 {% endhighlight %}

Y abrimos el app.js para hacer la lectura del Streaming <img src="http://fernetjs.com/wp-includes/images/smilies/simple-smile.png" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" />

{% highlight js %}
//Acá reemplazamos las claves que generamos para nuestra app en dev.twitter.com
var keys = {
    "consumer_key" : "blablabla"
  , "consumer_secret" : "blablabla" 
  , "access_token_key" : "blablabla"
  , "access_token_secret" : "blablabla"
};

//referenciamos al módulo Tuiter
var tu = require('tuiter')(keys);

//Nos ponemos en escucha de nuestra frase
tu.filter({track: 'hola twitter stream'}, function(stream){
  
  //cuando aparezca un tweet para nosotros, se dispara el callback
  stream.on('tweet', function(data){

    //Alguien nos Tuiteó "hola twitter stream"!
    console.log(data);
    
    //acá vamos a responder el tweet
    responder(data);
  });
});
 {% endhighlight %}

> Tengamos en cuenta que estamos utilizando la User Stream API por lo que solo tenemos una cuenta (y una conexión a la vez) para hacer los seguimientos, la cuenta con la que creamos las claves. Si quisiéramos utilizar varias cuentas deberíamos usar la Site Stream API, pero no está abierta al público por lo que hay que pedir acceso a Twitter. 

### Respondiendo un Tweet

Ahora nos queda responder ese Tweet para completar nuestro objetivo, pero para poder responder necesitamos saber que usuario nos habló y que Id tiene el Tweet. Hasta ahora sabemos que en *data* tenemos el Tweet, este último es un JSON con la información detallada del [Tweet][3]:

Si vemos el detalle, en la propiedad *id_str* y *user.screen_name* vamos a tener el id del Tweet y el usuario que envió el Tweet respectivamente, asi que vamos a responderle implementando la función *responder()*

{% highlight js %}
function responder(tweet){
  var usuario = tweet.user.screen_name,
    id = tweet.id_str;

  tu.update({
    status: '@' + usuario + ' hola de vuelta!',
    in_reply_to_status_id_str: id
  });
}
 {% endhighlight %}

De donde saqué el &#8220;update&#8221; y los parametros?, bueno Tuiter implementa todos los metodos de la API, solo nos fijamos que &#8220;post&#8221; o &#8220;get&#8221; es el de twitter y que parametros recibe, por ejemplo: [documentación del update][4]

> Para poder enviar Tweets tenes que cambiar los permisos de tu app en dev.twitter.com de ***Read-only*** a ***Read and Write***, sino te va a tirar un error de &#8220;Prohibido&#8221; 

Objetivo cumplido!, escuchamos una frase y respondemos con un tweet, y no fue nada complicado.

Dejo el [Showcase][5] de apps que están utilizando la biblioteca Tuiter, donde van a encontrar también [TuiterFighter!][6] (una pelea entre palabras que arme hace unas semanas utilizando Tuiter) <img src="http://fernetjs.com/wp-includes/images/smilies/simple-smile.png" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" />

**Links útiles**

  * [Desarrolladores en Twitter][7]
  * [Biblioteca Tuiter][2]
  * [Docs de Streaming API][8]
  * [Docs de JSON de respuesta de Twitter][9]
  * [Docs para Twittear][10]

#### He aquí app.js completo

{% highlight js %}
var keys = {
    "consumer_key" : "blablabla"
  , "consumer_secret" : "blablabla" 
  , "access_token_key" : "blablabla"
  , "access_token_secret" : "blablabla"
};

var tu = require('tuiter')(keys);

tu.filter({track: 'hola twitter stream'}, function(stream){

  stream.on('tweet', function(data){
    responder(data);
  });

});

function responder(tweet){
  var usuario = tweet.user.screen_name,
    id = tweet.id_str;

  tu.update({
    status: '@' + usuario + ' hola de vuelta!',
    in_reply_to_status_id_str: id
  });
}
 {% endhighlight %}

 [1]: http://dev.twitter.com
 [2]: https://github.com/danzajdband/Tuiter
 [3]: https://dev.twitter.com/docs/platform-objects/tweets
 [4]: https://dev.twitter.com/docs/api/1/post/statuses/update
 [5]: http://zajdband.com.ar/tuiter-showcase.html
 [6]: http://tuiterfighter.com/?language=es
 [7]: https://dev.twitter.com
 [8]: https://dev.twitter.com/docs/streaming-apis
 [9]: https://dev.twitter.com/docs/platform-objects
 [10]: https://dev.twitter.com/docs/api/1.1/post/statuses/update