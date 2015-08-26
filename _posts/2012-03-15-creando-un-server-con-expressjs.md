---
title: Creando un server con ExpressJS
author: Pablo Novas
layout: post
permalink: /2012/03/creando-un-server-con-expressjs/
dsq_thread_id:
  - 612691852
categories:
  - Bibliotecas
  - Server Side
tags:
  - expressjs
  - nodejs
  - package.json
migration_issue: highlightline
---
[ExpressJS][1] es un web framework que envuelve a ConnectJS. Con ExpressJS podemos crear un server, manejar las requests, responses y mucho mas, pero antes de meternos veamos un momento la estructura del sitio ([post relacionado][2]):

<!--highlight:[11,12]-->
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

En app.js vamos a crear nuestro servidor, pero ExpressJS es un NPM, asi que primero lo instalamos  
<!--more-->

{% highlight cpp %}
npm install express
 {% endhighlight %}

O &#8230; mejor todavia, empecemos organizadamente a armar nuestro [package.json][3]:

<!--highlight:[5]-->
{% highlight js %}
{
  "name": "SitioWebConNodeJS",
  "version": "0.0.1",
  "dependencies": {
    "express": "&gt;=2.5.8"
  }
}
 {% endhighlight %}

Ahora simplemente podemos hacer: 

{% highlight cpp %}
npm install
 {% endhighlight %}

Solito se va a encargar de bajar las dependencias de nuestro proyecto leyendo el package.json. Es importante mantener nuestro package.json actualizado, ya que sirve como &#8220;mapa&#8221; de nuestras dependencias para NPM, Hosting, nosotros mismos, etc &#8230; 

Bueno, ahora que tenemos instalado el NPM de ExpressJS podemos armar nuestro app.js:

{% highlight js %}
//creamos una variable para el módulo
  var express = require('express');

  //creamos el server
  var app = express.createServer();
  
  //nuestra ruta principal del sitio
  app.get('/', function (req, res){
    res.send('Aló aló Mundo!');
  });

  //ponemos el server en escucha en un puerto
  app.listen(1666);
  console.log('Server Express iniciado en %d', app.address().port);
 {% endhighlight %}

Bastante simple, ahora iniciamos el server

{% highlight cpp %}
node app.js
 {% endhighlight %}

Abrimos el browser en **http://localhost:1666** y se va a disparar el único *get* que tenemos. 

{% highlight js %}
app.get('/', function (req, res){
    res.send('Aló aló Mundo!');
  });
 {% endhighlight %}

Se parece bastante a lo que haciamos con el [módulo Core *http* de NodeJS][4]: declaramos una funcion callback que recibe la request y el response y despues simplemente enviamos un texto al response.

Asi como tenemos el *get*, podemos declarar cualquiera de los verbos de HTTP, por ejemplo:

{% highlight js %}
app.get('/proyectos/:id', function (req, res){
     res.send('Este es el proyecto ' + req.params.id);
  });

  app.put('/proyectos/:id', function (req, res){
     res.send('Actualizando proyecto ' + req.params.id);
  });

  app.post('/proyectos/nuevo', function (req, res){
     res.send('Creando proyecto');
  });
 {% endhighlight %}

Por último tenemos la configuracion de ambientes. En ExpressJS configuramos los ambientes con el metodo .configure()

{% highlight js %}
//si no especificamos un ambiente, se aplica para todos 
  app.configure(function(){
    //configuración común para todos
  });

  app.configure('develpment', function(){
    //configuracion para desarrollo
  });

  //podemos especificar mas de un ambiente para la configuración
  app.configure('stage', 'production', function(){
    //configuracion para stage y producción
  });
 {% endhighlight %}

Ejecutamos la app para el entorno Productivo:

{% highlight cpp %}
EXPRESS_ENV=production node app.js
 {% endhighlight %}

> Es importante usar el ambiente *production* cuando está productivo nuestro sitio, porque algunos mecanismos de cache se funcionan sólo en ese estado.

 [1]: http://expressjs.com/ "ExpressJS "
 [2]: http://fernetjs.com/2012/02/estructura-de-un-sitio-web-mvc-en-nodejs/ "Estructura de un sitio web MVC en NodeJS"
 [3]: http://fernetjs.com/2011/12/la-era-del-package-json/ "La era del package.json"
 [4]: http://fernetjs.com/2011/11/que-es-nodejs-breve-introduccion/ "Qué es NodeJS?, breve introducción"