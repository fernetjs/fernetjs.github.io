---
title: Deferreds en jQuery (parte 2)
author: Matias Arriola
layout: post
permalink: /2012/02/deferreds-en-jquery-parte-2/
dsq_thread_id:
  - 581079912
categories:
  - Client Side
tags:
  - Deferred
  - jquery
---
Las deferreds en jquery fueron una pieza fundamental, que gracias a otorgar un mayor desacoplamiento en código asincŕonico, permitieron la reescritura del módulo de ajax para que sea testeable. Ya hablamos algo de eso en [la primera parte][1], y también vimos escenarios básicos, o casos de uso sencillos con ajax que no explotaban al cien por ciento lo que en verdad es una Deferred.

Vamos a ver cómo crear una Deferred:

<pre class="brush: jscript; title: ; notranslate" title="">function esperar(msegs){
    return $.Deferred(function(dfd){
        setTimeout(dfd.resolve, msegs);
    });    
};
console.log('empezo');
esperar(4000).then(function() { console.log('ya espere demasiado'); });
console.log('Acaba de empezar');
</pre>

<!--more-->

  
En este caso, creamos una función &#8220;esperar&#8221; que retorna un objeto creado con $.Deferred.  
$.Deferred acepta opcionalmente como parámetro una función que se ejecuta dentro del constructor (así es que se llama al setTimeout cada vez que creamos esa deferred).  
La deferred va a estar en un estado &#8216;pendiente&#8217; cuando la creamos. Luego agregamos callbacks con las funciones then, done, etc. que van a ser encolados y ejecutados cuando a la deferred se le haga .resolve() o .reject().  
Sabiendo esto, se puede llegar a entender el código presentado arriba. Resumen:

> >> Cuando llamamos a esperar, se crea y retorna una deferred.  
> >> Durante la creación de la deferred se ejecuta un setTimeout  
> >> Gracias al setTimeout, al cabo de msegs se va a ejecutar el resolve de la deferred.  
> >> La deferred va a pasar de estar en estado &#8216;pendiente&#8217; a estar en estado &#8216;resuelta&#8217;  
> >> Se van a ejecutar los callbacks attacheados en el then o el done.

Como resultado de ese código, la salida por consola va a ser:  
>empezo  
>Acaba de empezar  
>ya espere demasiado

Si no se entiende por qué la salida va a tener ese orden, recomiendo echarle un vistazo al post que habla de la [ejecución asíncronica con settimeout][2].

## El papel de las promesas

Ahora, cambiemos algo del código:

<pre class="brush: jscript; title: ; notranslate" title="">function esperar(msegs){
    return $.Deferred(function(dfd){
        setTimeout(dfd.resolve, msegs);
    });
};
console.log('empezo');
var espera = esperar(4000);
espera.then(function() { console.log('ya espere demasiado'); });
espera.resolve();
console.log('Acaba de empezar');​
</pre>

La salida en consola &#8216;ya espere demasiado&#8217; va a aparecer antes que &#8216;acaba de empezar&#8217;, ya que resolvimos la deferred por fuera, antes de que se ejecute el resolve del setTimeout.

Algo que estaría bueno, sería que el método esperar me devuelva una Deferred, pero que no exponga los métodos de .resolve() por ejemplo, ya que por fuera de la función esperar, lo único que queremos hacer es definir callbacks que se van a ejecutar, no cambiar el estado de la Deferred.  
Para eso usamos el método .promise(), que va a devolver la misma deferred, pero sin los métodos que cambian el estado de la misma.  
Es por eso que el siguiente código nos va a tirar error:

<pre class="brush: jscript; title: ; notranslate" title="">function esperar(msegs){
    return $.Deferred(function(dfd){
        setTimeout(dfd.resolve, msegs);
    }).promise();
};
console.log('empezo');
var espera = esperar(4000);
espera.then(function() { console.log('ya espere demasiado'); });
espera.resolve();
console.log('Acaba de empezar');​
</pre>

## Demás acciones / métodos

Cuando tenemos a la deferred en un estado &#8216;pendiente/sin resolver&#8217;, al momento de resolverla, tenemos varias opciones:

deferred.resolve() o deferred.resolveWith() van a pasar la deferred a estado resuelto; por lo que se van a ejecutar los callbacks definidos con deferred.then() (como primer parámetro), deferred.done(). Además si luego hacemos deferred.isResolved() nos va a devolver true.

deferred.reject() o deferred.rejectWith() van a pasar la deferred a estado rechazado; por lo que se van a ejecutar los callbacks definidos con deferred.then() (como segundo parámetro) y deferred.fail(). Además si luego consultamos por deferred.isRejected() va a devolver true.

deferred.notify() o deferred.notifyWith() van a servir para emitir notificaciones de progreso por ejemplo. Cada vez que se haga un .notify(), se van ejecutar los callbacks definidos con deferred.then() (tercer parametro) o deferred.progress(). Luego que la deferred es resuelta o rechazada, no se van a seguir ejecutando callbacks de progreso.

Este es un tema que no entra en la cabeza así nomás, así que éste post se puede parecer a las memorias de un disléxico, o a un material de referencia sobre las deferreds. Esperemos que sea lo segundo!

 [1]: http://fernetjs.com/2012/02/entendiendo-deferreds-en-jquery/ "Entendiendo Deferreds en jQuery"
 [2]: http://fernetjs.com/2011/11/ejecuciones-asincronicas-de-funciones/ "Ejecuciones Asincrónicas de funciones"