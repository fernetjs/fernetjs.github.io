---
title: Express View Engines
author: Pablo Novas
layout: post
permalink: /2012/05/express-view-engines/
dsq_thread_id:
  - 693450156
categories:
  - Bibliotecas
  - Server Side
tags:
  - node
  - nodejs
  - npm
---
Como vimos en el [post anterior de ExpressJS][1], podemos referenciar a nuestro WebFramework con el ViewEngine que elijamos, vamos a ver 2 opciones de VisionMedia: EJS y Jade, y por último Mustache.

Ambas opciones se instalan desde NPM:

<pre class="brush: cpp; title: ; notranslate" title="">npm install ejs
npm install jade
</pre>

> Ejs, jade, mustache, etc. son paquetes externos a Express. Por lo que hay que instalarlos por npm aparte. 

#### Configurando un ViewEngine en Express

El objetivo de los view engines en express es que podamos definir a nuestro gusto como renderizar la vista utilizando templates.  
Ejs y Jade son los primeros que salieron con Express, hoy en dia tenemos mas opciones como jQuery Template, Mustache, etc.

Siguiendo con la estructura, creamos el archivo nuevo lenguajes.ejs donde vamos a tener nuestra vista.

<pre class="brush: cpp; highlight: [6,7]; title: ; notranslate" title="">/app-root
  /models

  /controllers

  /views
    lenguajes.ejs

  /public
    /images
    /styles
    /scripts

  /tests

  /utils

  app.js
  package.json
</pre>

Luego, configuramos el server express con el view engine:

<pre class="brush: jscript; title: ; notranslate" title="">var express = require('express'),
  app = express.createServer();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('lenguajes', {
    title: 'Lenguajes de Programacion',
    lenguajes: ['javascript', 'java', '.net', 'python', 'php']
  });
});
</pre>

En la primeras 2 lineas referenciamos a express y creamos un server. En la linea 04 le decimos a express donde vamos a guardar las vistas y en la 05 le especificamos el view engine a utilizar.

#### EJS

Ejs es el mas simple, ya que se parece mucho a otros lenguajes como Java o .NET. Con Ejs la vista nos quedaria de esta forma:

<pre class="brush: xml; title: ; notranslate" title="">&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;&lt;%= title %&gt;&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
  &lt;% if (lenguajes.length) { %&gt;
    &lt;ul&gt;
      &lt;% lenguajes.forEach(function(lenguaje){ %&gt;
        &lt;li&gt;&lt;%= lenguaje %&gt;&lt;/li&gt;
      &lt;% }) %&gt;
    &lt;/ul&gt;
  &lt;% } %&gt;
  &lt;/body&gt;
&lt;/html&gt;
</pre>

[Github Ejs][2]

#### Jade

Jade es bastante diferente, ya que es mas apuntando a [ZenCoding][3], no exactamente eso, pero es divertido:

<pre class="brush: jscript; title: ; notranslate" title="">!!! html
  head
    title= title
  body
    - if (lenguajes.length)
    ul
      - lenguajes.forEach(function(lenguaje){
        li= lenguaje
      - })
</pre>

[Github Jade][4]

#### Mustache

Este es interesante ya que el template queda bastante mas limpio, es decir, no tiene condicionales ni forEachs. Por lo que no es para cualquier cosa, pero si armas templates simple (como el de arriba) queda mucho mas limpio tu view.

<pre class="brush: xml; title: ; notranslate" title="">&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;{{title}}&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
  &lt;ul&gt;
  {{# lenguajes}}
    &lt;li&gt;{{.}}&lt;/li&gt;
  {{/ lenguajes}}
  &lt;/ul&gt;
  &lt;/body&gt;
&lt;/html&gt;
</pre>

[Github Mustache][5]

Como dije antes hay muchos mas, para cerrar les dejo [Consolidate.js][6] es un repositorio de VisionMedia donde consolidan todos los templates, para que no estemos referenciando a cada uno en especial.

> En Consolidate mustache está dentro de hogan y jqueryTmpl en jqtpl

 [1]: http://fernetjs.com/2012/03/creando-un-server-con-expressjs/ "Creando un server con ExpressJS"
 [2]: http://github.com/visionmedia/ejs
 [3]: http://code.google.com/p/zen-coding/
 [4]: http://github.com/visionmedia/jade
 [5]: http://mustache.github.com/
 [6]: https://github.com/visionmedia/consolidate.js