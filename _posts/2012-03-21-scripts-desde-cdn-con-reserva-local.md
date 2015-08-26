---
title: Scripts desde CDN con reserva local
author: Pablo Novas
layout: post
permalink: /2012/03/scripts-desde-cdn-con-reserva-local/
dsq_thread_id:
  - 620040256
categories:
  - Client Side
  - Utilidades
tags:
  - CDN
  - jquery
---
CDN qué?, para los que no escucharon del tema: 

### CDN (Content Delivery Network o Content Distribution Network) 

Como se lee, es una *red de distribución de contenido*, un gran sistema distribuido de servidores desplegados en múltiples centros de datos en Internet. El objetivo de un CDN es el de servir contenido a los usuarios finales con una alta disponibilidad y alto rendimiento. 

**Alta disponibilidad?** tenemos el CDN de Google (entre otros) &#8230; digamos que su uptime es bastante bueno :P.

**Alto rendimiento?** fuera del *poder* que puede tener un *Google*, nos van a servir los contenidos utilizando el mas cercano a nuestra conexión, por ejemplo, si referenciamos a jquery y tenemos un cliente que se conecta desde Argentina, le va a servir el archivo desde el servidor mas cercano a su ubicación (aunque nuestro hosting sea en el Congo)

Tenemos otras ventajas en su uso también, como el cache del browser, es decir, los archivos se llaman de una forma fija, links permanentes, por lo que si el cliente entró a un sitio X con una referencia al mismo CDN, para nuestra sitio ya tiene el archivo *cacheado*.

<!--more-->

Supongamos que tenemos nuestra referencia:

{% highlight xml %}
&lt;script src="js/jquery.min-1-7-1.js"&gt;&lt;/script&gt;
 {% endhighlight %}

Es poco probable que el cliente ya lo tenga en cache con ese nombre.

### Referenciando a un CDN

{% highlight xml %}
&lt;script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"&gt;&lt;/script&gt;
 {% endhighlight %}

Se vé mucho mejor, no?

### Por qué una reserva local?

Podríamos pensarlo para un entorno de desarrollo o una intranet, si el cliente (o nosotros desarrollando) no tenemos internet, el sitio funcionaría sin problemas.

Y qué pasa si el CDN, por ejemplo de Google, está caído?, aparte de que se seguramente el mundo se detendría, nuestro sitio no funcionaría, así que agreguemos la reserva local *por si las dudas*:

{% highlight xml %}
&lt;script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;window.jQuery || document.write('&lt;script src="js/libs/jquery-1.7.1.min.js"&gt;&lt;\/script&gt;')&lt;/script&gt;
 {% endhighlight %}

Así de simple, referenciamos al CDN de google para la version 1.7.1 de jquery y ponemos otro script comprobando que si *window.jQuery* es *undefined* insertamos nuestro script local.

Links relacionados:

  * [Google Javascript CDN][1]
  * [What is CDN][2]
  * [CDN wikipedia][3]

 [1]: http://code.google.com/intl/es-ES/apis/libraries/
 [2]: http://www.whatiscdn.org
 [3]: http://en.wikipedia.org/wiki/Content_delivery_network