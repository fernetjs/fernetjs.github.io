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
---
[ExpressJS][1] es un web framework que envuelve a ConnectJS. Con ExpressJS podemos crear un server, manejar las requests, responses y mucho mas, pero antes de meternos veamos un momento la estructura del sitio ([post relacionado][2]):

<pre class="brush: cpp; highlight: [11,12]; title: ; notranslate" title="">/app-root
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
</pre>

En app.js vamos a crear nuestro servidor, pero ExpressJS es un NPM, asi que primero lo instalamos  
<!--more-->

<pre class="brush: cpp; title: ; notranslate" title="">npm install express
</pre>

O &#8230; mejor todavia, empecemos organizadamente a armar nuestro [package.json][3]:

<pre class="brush: jscript; highlight: [5]; title: package.json; notranslate" title="package.json">{
  "name": "SitioWebConNodeJS",
  "version": "0.0.1",
  "dependencies": {
    "express": "&gt;=2.5.8"
  }
}
</pre>

Ahora simplemente podemos hacer: 

<pre class="brush: cpp; title: ; notranslate" title="">npm install
</pre>

Solito se va a encargar de bajar las dependencias de nuestro proyecto leyendo el package.json. Es importante mantener nuestro package.json actualizado, ya que sirve como &#8220;mapa&#8221; de nuestras dependencias para NPM, Hosting, nosotros mismos, etc &#8230; 

Bueno, ahora que tenemos instalado el NPM de ExpressJS podemos armar nuestro app.js:

<pre class="brush: jscript; title: app.js; notranslate" title="app.js">//creamos una variable para el módulo
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
</pre>

Bastante simple, ahora iniciamos el server

<pre class="brush: cpp; title: ; notranslate" title="">node app.js
</pre>

Abrimos el browser en **http://localhost:1666** y se va a disparar el único *get* que tenemos. 

<pre class="brush: jscript; title: ; notranslate" title="">app.get('/', function (req, res){
    res.send('Aló aló Mundo!');
  });
</pre>

Se parece bastante a lo que haciamos con el [módulo Core *http* de NodeJS][4]: declaramos una funcion callback que recibe la request y el response y despues simplemente enviamos un texto al response.

Asi como tenemos el *get*, podemos declarar cualquiera de los verbos de HTTP, por ejemplo:

<pre class="brush: jscript; title: ; notranslate" title="">app.get('/proyectos/:id', function (req, res){
     res.send('Este es el proyecto ' + req.params.id);
  });

  app.put('/proyectos/:id', function (req, res){
     res.send('Actualizando proyecto ' + req.params.id);
  });

  app.post('/proyectos/nuevo', function (req, res){
     res.send('Creando proyecto');
  });
</pre>

Por último tenemos la configuracion de ambientes. En ExpressJS configuramos los ambientes con el metodo .configure()

<pre class="brush: jscript; title: ; notranslate" title="">//si no especificamos un ambiente, se aplica para todos 
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
</pre>

Ejecutamos la app para el entorno Productivo:

<pre class="brush: cpp; title: ; notranslate" title="">EXPRESS_ENV=production node app.js
</pre>

> Es importante usar el ambiente *production* cuando está productivo nuestro sitio, porque algunos mecanismos de cache se funcionan sólo en ese estado.

 [1]: http://expressjs.com/ "ExpressJS "
 [2]: http://fernetjs.com/2012/02/estructura-de-un-sitio-web-mvc-en-nodejs/ "Estructura de un sitio web MVC en NodeJS"
 [3]: http://fernetjs.com/2011/12/la-era-del-package-json/ "La era del package.json"
 [4]: http://fernetjs.com/2011/11/que-es-nodejs-breve-introduccion/ "Qué es NodeJS?, breve introducción"