---
title: JSONP, CORS y como los soportamos desde NodeJS
author: Pablo Novas
layout: post
permalink: /2012/09/jsonp-cors-y-como-los-soportamos-desde-nodejs/
dsq_thread_id:
  - 847952321
categories:
  - Client Side
  - Server Side
tags:
  - CORS
  - json
  - JSONP
  - nodejs
migration_issue: highlightline
---
Laburando con mi [API de feriados][1] me crucé con el tema de *Same Origin Policy*, digamos que una API Rest de feriados debería tener soporte para ser llamada desde un js en el cliente mínimamente, esto me llevo a conocer cosas nuevas y quería compartir mi experiencia.

  1. [Same Origin Policy][2]
  2. [JSONP][3]
  3. [Soportando JSONP desde NodeJS][4]
  4. [CORS][5]
  5. [Soportando CORS desde NodeJS][6]
  6. [Links Útiles][7]

* * *

### <a name="1.1" style="text-decoration: none;">Same Origin Policy</a>

El principal problema que nos encontramos al querer hacer una llamada desde un dominio a otro desde un javascript en el cliente (por ejemplo, una llamada ajax) es lo que se conoce como &#8220;Same Origin Policy&#8221; (política de mismo origen), es decir, una seguridad impuesta para evitar las llamadas entre distintos orígenes desde client-side.

Ahora, como identificamos que estamos en otro origen?  
Este *Origen* está definido por:

  1. Protocolo
  2. Host (Dominio/Dirección de IP)
  3. Puerto

Esto significa que si alguno de los anteriores no es igual, es otro origen, y por esta seguridad, no podemos realizar la llamada ajax, hacer un GET de un .json, o cualquier operación desde un Explorador.

Por ejemplo: Supongamos que estamos en **http://localhost:3000** e intentamos acceder a:

  1. **https**://localhost:3000/algo &#8211; <span style="color: red">Diferente protocolo</span>
  2. http://localhost:**1100**/algo &#8211; <span style="color: red">Diferente puerto</span>
  3. http://localhost/algo &#8211; <span style="color: red">Diferente puerto (el 80)</span>
  4. http://**www.google.com**/algo &#8211; <span style="color: red">Diferente host</span>
  5. http://**sub.**localhost:3000/algo &#8211; <span style="color: red">Diferente host (debe ser exacto)</span>
  6. http://localhost:3000/algo &#8211; <span style="color: green">Correcto</span>

En todos los casos anteriores (menos el último) vamos a recibir un error, ya que no estamos cumpliendo con la seguridad.  
Bueno, ahora sabemos el por qué del error, cómo hacemos para llamar a otro Origen desde el cliente?

### <a name="1.2" style="text-decoration: none;">JSONP</a>

Para arrancar, la sigla viene de JSON + P, lo que sería Javascript Object Notation with (con) Padding. Ese Padding es un complemento para el JSON, y para que queremos ese complemento?, supongamos el siguiente escenario:

Tenemos un script de cliente en el que queremos llamar a un servicio que retorna un JSON por AJAX, supongamos que el servicio es en [NoLaborables][8]:

Por ejemplo, el Próximo feriado <http://nolaborables.com.ar/API/v1/proximo> y nos devuelve un JSON:

{% highlight js %}
{
  "dia": 24,
  "mes": 9,
  "motivo": "Bicentenario de la Batalla de Tucumán",
  "tipo": "nolaborable"
}
 {% endhighlight %}

Este servicio está en otro dominio, y ahora sabemos que tenemos la política Same Origin y no podemos hacer una llamada AJAX. 

Y si referenciamos una url bajo un tag script?, por ejemplo, esto si podemos hacerlo:

{% highlight xml %}
&lt;script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"&gt;&lt;/script&gt;
 {% endhighlight %}

Eso si funciona, ya que no hay problema en referenciar a un script que esté en otro origen, ahí no *juega* la política de Same Origin.  
Entonces referenciemos al servicio con un script:

{% highlight xml %}
&lt;script type="text/javascript" src="http://nolaborables.com.ar/API/v1/proximo"&gt;&lt;/script&gt;
 {% endhighlight %}

Error!, porque el interpretador de JS no sabe como leer un json colgado de la nada, pero si la respuesta de ese servicio nos devolviera el json como una llamada a una función?, el interpretador sabe que hacer con eso, no?

##### Respuesta normal de JSON

{% highlight js %}
{
  "dia": 24,
  "mes": 9,
  "motivo": "Bicentenario de la Batalla de Tucumán",
  "tipo": "nolaborable"
}
 {% endhighlight %}

##### Respuesta de JSON con Padding

{% highlight js %}
miFunction({
  "dia": 24,
  "mes": 9,
  "motivo": "Bicentenario de la Batalla de Tucumán",
  "tipo": "nolaborable"
});
 {% endhighlight %}

Eso es el padding, el server nos responde el JSON como una llamada a una función, para que podamos referenciarlo por un script y así *saltearnos* la política de Same Origin.

Genial, o sea que para implementarme la llamada completa tendría que hacer algo asi:

{% highlight js %}
function llamame(jsonRespuesta){
  //hago algo con el JSON del server: jsonRespuesta
}

 {% endhighlight %}

Después inyectamos el siguiente script para que haga la llamada, indicándole cual es la función a la que va a llamar (el Padding):

{% highlight xml %}
&lt;script type="text/javascript" src="http://nolaborables.com.ar/API/v1/proximo?callback=llamame"&gt;&lt;/script&gt;
 {% endhighlight %}

Ese script va a generar la llamada a la función *llamame* enviándole el JSON:

##### Retorno del servicio

{% highlight js %}
llamame({
  "dia": 24,
  "mes": 9,
  "motivo": "Bicentenario de la Batalla de Tucumán",
  "tipo": "nolaborable"
});
 {% endhighlight %}

NOTA: con jquery se puede evitar la vuelta de funciones, simplificarlo un poco.  
El ejemplo anterior con jQuery quedaría algo asi:

<!--highlight:[3]-->
{% highlight js %}
$.ajax({
  url: "http://nolaborables.com.ar/API/v1/proximo",
  dataType: 'jsonp'
}).done(function(jsonRespuesta) { 
  console.dir(jsonRespuesta);
});
 {% endhighlight %}

En este caso jQuery se encarga de armar el script, con la función de vuelta y nos entrega el resultado en el parámetro &#8220;jsonRespuesta&#8221; de forma transparente, sólo tenemos que especificar que el tipo va a ser &#8216;JSONP&#8217;.

Listo, ya nos despreocupamos de la Política de Mismo Origen, pero hay dos temas nuevos a tener en cuenta:

1. Seguridad: pensemos que con esto estamos inyectando un script en nuestra página directo desde un servidor (que en algunos casos no es nuestro), por lo que si el servidor tiene ganas de inyectar otra cosa, va a correr sin problemas en nuestro sitio, por lo que tenemos que confiar mucho en el servicio para hacer una llamada JSONP.

2. El servidor tiene que soportar esta llamada: tiene que estar preparado para que le puedas pedir JSONP y en ese caso retornarte el JSON con su Padding, sino, vamos a seguir recibiendo el JSON pelado y no nos sirve.

### <a name="1.3" style="text-decoration: none;">Soportando JSONP desde NodeJS</a>

Para soportarlo en NodeJS de forma manual, deberiamos leer el request, comprobar si en el *header* nos pide JSONP como dataType y retornar el Padding con el JSON de respuesta. Pero ya que existen web frameworks, y en muy pocos casos tendríamos un servidor web http a mano, vamos a hacerlo con Express?: 

En la configuración de express sólo especificamos que soporte callbacks JSONP:

<!--highlight:[4]-->
{% highlight js %}
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set("jsonp callback", true);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});
 {% endhighlight %}

Listo, con esa linea soportamos JSONP con Express <img src="http://fernetjs.com/wp-includes/images/smilies/simple-smile.png" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" />

> Estuve leyendo por ahí preguntas sobre hacer un POST con JSONP, ahora que entendemos como funciona, podemos entender el &#8220;porque&#8221; es imposible realizar un POST: si estamos realizando un GET desde un tag script, como que no tenemos forma de cambiar el método HTTP. 

### <a name="2.1" style="text-decoration: none;">CORS</a>

Desde que existe JSONP hay muchas críticas del tema y convengamos que es un &#8220;work-around&#8221; al Same Origin Policy, hoy por hoy tenemos otra salida a este problema: CORS (Cross-Origin Resource Sharing).  
El objetivo de CORS es que bajo una propiedad en el header de la respuesta HTTP se puedan definir los origenes que pueden acceder al servidor como Cross Domain.

La cosa ahora se pone mucho mas simple, desde el cliente no tenemos que hacer nada *especial*, el punto es que habilitamos en el servidor para que pueda ser llamado desde otro origen.  
Esto lo hacemos agregando una nueva propiedad en el header del HTTP request, es decir, en el pedido (request) al servidor especificamos que origenes están permitidos. 

Veamos un ejemplo:

Cuando disparamos una llamada Ajax a un servidor, el explorador se encarga de agregar a nuestro header http la propiedad Origin con el valor de nuestro origen, por ejemplo:

<!--highlight:[2,6]-->
{% highlight bash %}
GET /API/v1/proximo HTTP/1.1 &lt;- metodo HTTP con el path al que llamanos
Host: nolaborables.com.ar &lt;- host al que estamos llamando
User-Agent: Mozilla, Chrome, etc..
Accept: text/html,application/json
Connection: keep-alive
Origin: http://midominio.com  &lt;- aca estamos nosotros
 {% endhighlight %}

El servidor va a comprobar la propiedad Origen y decide si permite el acceso, una respuesta satisfactoria seria:

<!--highlight:[2]-->
{% highlight bash %}
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *  &lt;- aca tenemos la propiedad que dice si se puede o no
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Transfer-Encoding: chunked
Content-Type: application/json
 {% endhighlight %}

Como vemos en la respuesta (response) del servidor, nos devuelve la propiedad *Access-Control-Allow-Origin* donde nos especifica que origen puede acceder, en el caso anterior es un ***** asi qué cualquier origen pasa tranquilo.

> En esa propiedad también podemos especificar sólo algunos origines, también se puede filtrar por métodos HTTP, por ejemplo, solo darle acceso mediante GET. 

### <a name="2.2" style="text-decoration: none;">Soportando CORS desde NodeJS</a>

Como vimos, es una propiedad en el header, asi que de nuevo, si estamos creando un web server a mano, es agregar esa propiedad. Te dejo una forma de hacerlo con Express creando un middleware (sería como un método que se llama para toda request que ocurra):

<!--highlight:[1,2,3,4,5,6,7,8,17]-->
{% highlight js %}
function perimitirCrossDomain(req, res, next) {
  //en vez de * se puede definir SÓLO los orígenes que permitimos
  res.header('Access-Control-Allow-Origin', '*'); 
  //metodos http permitidos para CORS
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

//Siguiendo con la configuración de Express, agregamos el middleware
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(perimitirCrossDomain);
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});
 {% endhighlight %}

### <a name="3.1" style="text-decoration: none;">Links útiles</a>

#### Same Origin Policy

  * [Wikipedia][9]
  * [Google Chrome &#8211; Browser Security][10]
  * [Same origin policy for JavaScript (Mozilla)][11]

#### Cross-Origin Resource Sharing

  * [Wikipedia][12]
  * [CORS &#8211; Mozilla][13]
  * [CORS &#8211; Chrome][14]

 [1]: http://nolaborables.com.ar
 [2]: #1.1
 [3]: #1.2
 [4]: #1.3
 [5]: #2.1
 [6]: #2.2
 [7]: #3.1
 [8]: http://nolaborables.com.ar/
 [9]: http://en.wikipedia.org/wiki/Same_origin_policy
 [10]: http://code.google.com/p/browsersec/wiki/Part2#Same-origin_policy
 [11]: http://developer.mozilla.org/en-US/docs/Same_origin_policy_for_JavaScript
 [12]: http://en.wikipedia.org/wiki/Cross-origin_resource_sharing
 [13]: http://developer.mozilla.org/en-US/docs/HTTP_access_control
 [14]: http://developers.google.com/storage/docs/cross-origin