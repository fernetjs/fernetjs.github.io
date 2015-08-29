---
title: Pateando Google Analytics desde NodeJS
author: pjnovas
layout: post
permalink: /2012/07/pateando-google-analytics-desde-nodejs/
dsq_thread_id:
  - 762021597
categories:
  - Server Side
  - Utilidades
tags:
  - google analytics
  - nodejs
---
Laburando en mi [API de feriados][1] para divertirme un poco y de paso dejar una API Rest pública que no devuelva un 404 como sucede con la *actual*, me topé con algunas cosas, como por ejemplo *patear* a GoogleAnalytics cuando alguien utiliza mi Servicio REST.

> El punto es que el servicio REST devuelve un JSON, o xml, etc. pero al no devolver una vista donde pueda injectar un script, no puedo realizar la llamada GA para hacer el *tracking* de la url. 

Para este tema tenemos [scripts armados de google][2] en varios lenguajes, pero no en NodeJS (o mejor dicho en javascript para server-side). Mientras me disponía a realizar la *traducción* a Javascript desde PHP o alguno de esos usando la [documentacion del famoso .gif][3] me crucé con un paquete npm que lo hace: [node-ga][4].

La implementación es bastante simple:

{% highlight bash %}
$ npm install ga
 {% endhighlight %}

{% highlight js %}
var GoogleAnalytics = require('ga');
var ga = new GoogleAnalytics('UA-XXXXXXX-X', 'dominio.com');

//suponemos que creamos nuestro server Express

app.get('/api/v1/:algo', function(req, res){
  ga.trackPage(req.url);
  //devolvemos en la respuesta la magía que haga nuestra API
});

//... otros métodos HTTP
 {% endhighlight %}

El problema que aparece ahi es la IP, estamos llamando al GA desde el servidor, por lo que la IP va a ser siempre la del servidor, no la del cliente que utiliza nuestra API.

Bueno, por lo pronto no parece posible llamar a la url del GA con otra IP, ya que no es enviada en el header o body del request, sino que a un nivel mas bajo. Lo que si podemos hacer es logearla, para después comprobar de todas esas *visitas* que tenemos en el GA poder ver cuales fueron realmente únicas.

Para el logeo podemos usar [Winston][5], por ahí con [Loggly][6], pero lo dejamos para otro post :).

 [1]: http://nolaborables.info/
 [2]: https://developers.google.com/analytics/devguides/collection/other/mobileWebsites
 [3]: https://developers.google.com/analytics/resources/concepts/gaConceptsTrackingOverview
 [4]: https://github.com/jgallen23/node-ga
 [5]: https://github.com/flatiron/winston/
 [6]: http://loggly.com/