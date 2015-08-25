---
title: Entendiendo Deferreds en jQuery
author: Matias Arriola
layout: post
permalink: /2012/02/entendiendo-deferreds-en-jquery/
dsq_thread_id:
  - 561766197
categories:
  - Bibliotecas
  - Client Side
tags:
  - AJAX
  - Deferred
  - jquery
---
### ¿Qué es un Deferred?

Es un tipo de objeto que se introdujo en jQuery 1.5, que nos permite encadenar distintas acciones (callbacks) y disparar cierta funcionalidad (otros callbacks) dependiendo de su estado.  
Es similar y persigue la misma idea de las <a title="Promises/A - CommonJS" href="http://wiki.commonjs.org/wiki/Promises/A" target="_blank">Promises</a> y/o Futures, ya también conocidas con anterioridad e implementadas por ejemplo como paquetes para nodejs, donde el asincronismo, el anidamiento y las dependencias entre callbacks incrementaban la complejidad del programa, y se necesitaba una forma de manejar esto de manera más limpia y mantenible.

### Veamos Código

AJAX es uno de los principales usos de las deferreds en la mayoría de los casos. Un ejemplo sencillo:

Antes de la versión 1.5 de jQuery, así tendríamos que hacer para ejecutar dos acciones luego de la respuesta existosa a una llamada get:  
<!--more-->

<pre class="brush: jscript; title: ; notranslate" title="">$.get("postCopado.php",
	function(data){
		accionPostCarga1(data);
		accionPostCarga2(data);
	});
</pre>

A partir de la 1.5, $.get nos devuelve un objeto que cumple con la interfaz de una Deferred, por lo que podemos hacer algo así:

<pre class="brush: jscript; title: ; notranslate" title="">// accionPostCarga1 y accionPostCarga2 son funciones que se van a ejecutar una vez que tengamos 
//  una respuesta exitosa a la petición get
$.get("postCopado.php").done(accionPostCarga1, accionPostCarga2);
</pre>

Tanto como $.get como .done en este caso devuelven la misma Deferred ( o sea que es encadenable / chainable ) ==> podemos seguir agregando acciones:

<pre class="brush: jscript; title: ; notranslate" title="">// Agrego una función a ejecutar en caso de que la request get falle.
$.get("postCopado.php").done(accionPostCarga1, accionPostCarga2).fail(mostrarError);
</pre>

O tambien puedo guardar la deferred en una variable y manipularla:

<pre class="brush: jscript; title: ; notranslate" title="">var req = $.get("postCopado.php");
req.done(accionPostCarga1, accionPostCarga2);
req.fail(mostrarError);
// ocultarAjaxLoaderIcon se va a ejecutar no importa si la respuesta fue exitosa o fallida.
req.always(ocultarAjaxLoaderIcon);
console.log('esto se ejecuta primero que nada, y luego las acciones definidas para req');
</pre>

Ahora imaginemos que queremos que cierta funcionalidad se ejecute cuando ya se obtuvo la respuesta para dos requests distintas?? Fácil, usamos $.when

<pre class="brush: jscript; title: ; notranslate" title="">//armarPagina se ejecuta solo si se obtienen las respuestas exitosas
// a las dos requests.
$.when( $.get('post.php'), $.get('comments.php') ).done(armarPagina);

function armarPagina(a, b){
// a es un array con los argumentos que recibiria de la primer request,
// b lo mismo pero para la segunda request.
    console.log(a[2].responseText);
    console.log(b[2].responseText);
}
</pre>

### ¿Esto sólo?

No &#8211; Como fué antes mencionado el uso de las Deferreds no se limita a AJAX, sino que es una idea más arquitectural.  
Uno puede crear sus propias deferreds usando $.Deferred(), pero eso lo vamos a ahondar más en detalle en un futuro post. Si no te aguantás, podés echarle un vistazo a <a href="http://api.jquery.com/category/deferred-object/" title="Deferred Object - jQuery" target="_blank">Deferred Object</a> en la documentación oficial.