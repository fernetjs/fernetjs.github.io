---
title: Estructura de un sitio web MVC en NodeJS
author: Pablo Novas
layout: post
permalink: /2012/02/estructura-de-un-sitio-web-mvc-en-nodejs/
dsq_thread_id:
  - 592847770
categories:
  - Server Side
tags:
  - mvc
  - nodejs
---
Las estructuras de sitios web MVC (Model View Controller) no varian mucho, ya que MVC es justamente un patrón de diseño que no especifica como ordenar nuestra vista y desacoplarla de nuestro modelo. Pueden leer mas de MVC [aca][1].

Para el caso de NodeJS, hace tiempo que vengo armando y buscando en internet cual sería la mejor forma de organizar la estructura de nuestro sitio web para tener algo escalable &#8230; y en serio.

Llegué a una conclusión (y escucho con toda atención y felicidad propuestas de mejora):

{% highlight cpp %}
/app-root
  /models

  /controllers

  /views

  /public
    /images
    /styles
    /scripts

  /tests

  /utils

  app.js
  package.json
 {% endhighlight %}

Con algunas variaciones a lo que puede ser una apliación en .NET, Java, PHP, o cualquier otra &#8230; está es la estructura que, por el momento, me cierra mas.

Repasando un poco la estructura inicial de nuestro sitio web MVC en NodeJS en nuestro *app.js* vamos a tener el servidor &#8230; el famoso *require(&#8216;http&#8217;).createServer();*, o en su defecto, un web framework.

También tenemos en el root el package.json donde vamos a especificar la info de nuestro paquete (o app) con sus dependencias ([Package.json][2]). Despues es básicamente lo de siempre, la carpeta public con las imagenes, .css y .js (client-side); el modelo, los controladores y las vistas (html, o bien utilizando algún ViewEngine como puede ser Ejs o Jade, entre otros). Y por último dejamos una carpetita utils para los modulos externos a nuestro web server, como puede ser socketIO.

En el próximo post vamos a ver como integrar en esta estructura un web framework, especificamente ExpressJS.

 [1]: http://es.wikipedia.org/wiki/Modelo_Vista_Controlador
 [2]: http://fernetjs.com/2011/12/la-era-del-package-json/ "La era del package.json"