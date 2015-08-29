---
title: La era del package.json
author: pjnovas
layout: post
permalink: /2011/12/la-era-del-package-json/
dsq_thread_id:
  - 505437916
categories:
  - Bibliotecas
  - Server Side
tags:
  - commonjs
  - json
  - nodejs
  - npm
---
Leyendo sobre &#8220;<a href="http://blog.jquery.com/2011/12/08/what-is-happening-to-the-jquery-plugins-site/" target="_blank">el que pasó</a>&#8221; con la pérdida de la base de datos de jquery plugins por *Adam J. Sontag* hace referencia a empezar a utilizar el archivo package.json para marcar dependencias y versiones de los futuros plugins que se desarrollen, como lo hace <a href="http://www.npm.org/" title="Node Package Manager" target="_blank">NPM</a> y muchos otros proyectos en <a href="https://github.com/" title="GitHub" target="_blank">GitHub</a>. No es algo muy nuevo, yo lo desconocia hasta que *Matias Arriola* me lo mostró en una de las juntadas de FernetJS.

Este archivo (o mejor dicho standard) nace desde una especificación de implementaciones para paquetes de javascript (server-side) por <a href="http://www.commonjs.org" title="CommonJS" target="_blank">CommonJS</a>

Simplemente es crear un archivo con el nombre package.json en el root del paquete/ proyecto con su información, dependecias y otras *yerbas*. Un ejemplo sería:

{% highlight js %}
{
    "name": "miPaquete"
  , "version": "0.0.1"
  , "description": "un paquete de nodeJs con dependencias a express y socket.io de NPM."
  , "dependencies": {
      "express": "2.5.1"
    , "socket.io": "&gt;= 0.2.3"
  }
}
 {% endhighlight %}

Básicamente definimos el *nombre* del paquete, su *versión* y *descripción*, también podemos definir dependencias con otros paquetes.  
Como verán, es un json (Javascript Object Notation), si desconocen <a href="http://json.org/" target="_blank">JSON</a>, es un buen momento para aprenderlo.

Ya que es algo nuevo para mi, y lo estoy viendo por todos lados, quería compartirlo.  
<a href="http://wiki.commonjs.org/wiki/Packages/1.1" title="Packages 1.1 - CommonJS" target="_blank">Aca</a> pueden encontrar la especificación completa.