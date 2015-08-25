---
title: Ejecuciones Asincrónicas de funciones
author: Pablo Novas
layout: post
permalink: /2011/11/ejecuciones-asincronicas-de-funciones/
dsq_thread_id:
  - 497142000
categories:
  - Lenguaje
tags:
  - asincronismo
  - clearInterval
  - setInterval
  - setTimeout
---
En javascript no tenemos la posibilidad de hacer un *new Thread()* como en otros lenguajes, pero podemos *simular* ese comportamiento y es ahi donde entran las funciones setTimeout() y setInterval():

**.setTimeout ( *función , tiempo* )**
:   Ejecuta una función **al** X tiempo, siendo X milisegundos

**.setInterval ( *función , tiempo* )**
:   Ejecuta una función **cada** X tiempo, siendo X milisegundos

Así de simple, setTimeout va a ejecutar la funcion que le enviemos por parámetro en el tiempo que le digamos y setInterval ejecuta la función *n* veces esperando por cada ejecución el tiempo que le digamos.

Supongamos que necesitamos realizar una llamada a ajax cada *x* tiempo y refrescar una lista de entidades:  
<!--more-->

<pre class="brush: jscript; highlight: [4,5,6,9]; title: Utilizando 1=setTimeout; notranslate" title="Utilizando 1=setTimeout">function obtenerDatos(){
    // lógica para obtener y mostrar los datos

    setTimeout(function(){
        obtenerDatos();
    }, 10000);
}

obtenerDatos();
</pre>

<pre class="brush: jscript; highlight: [5,6,7]; title: Utilizando 1=setInterval; notranslate" title="Utilizando 1=setInterval">function obtenerDatos(){
    // lógica para obtener y mostrar los datos
}

var relojito = setInterval(function(){
        obtenerDatos();
    }, 10000);
</pre>

En el primer caso llamo a la función y esta se llama a si misma cada 10 segundos, pero en el segundo caso inicio una llamada a la funcion con un intervalo de 10 segundos en cada llamada.

> En el segundo caso (setInterval) la función va a ser llamada por primera vez a los 10 segundos de setear el intervalo. 

Cual utilizar y cuando va a depender de lo que queramos hacer, pero es importante entender sus diferencias al momento de elejir. 

Y si queremos dejar de llamar a la funcion en algún momento dado?, supongamos a la 5ta llamada. Como sería para cada caso?:

<pre class="brush: jscript; highlight: [1,3,7]; title: Utilizando 1=setTimeout; notranslate" title="Utilizando 1=setTimeout">var cantidadDeLlamadas = 0;
function obtenerDatos(){
    cantidadDeLlamadas++;

    // lógica para obtener y mostrar los datos

    if (cantidadDeLlamadas &lt; 5) {
        setTimeout(function(){
             obtenerDatos();
        }, 10000);
    }
}

obtenerDatos();
</pre>

<pre class="brush: jscript; highlight: [1,3,7,8]; title: Utilizando 1=setInterval; notranslate" title="Utilizando 1=setInterval">var cantidadDeLlamadas = 0;
function obtenerDatos(){
    cantidadDeLlamadas++;

    // lógica para obtener y mostrar los datos

    if (cantidadDeLlamadas === 5)
        clearInterval(relojito);
}

var relojito = setInterval(function(){
        obtenerDatos();
    }, 10000);
</pre>

Genial, en el primer caso simplemente comprobamos la cantidad y no llamamos al setTimeout, pero en el segundo realizamos un clearInterval() de la variable donde guardamos el intervalo. Bueno, hay que tener algo muy importante en cuenta para el clearInterval. Qué pasa si hago lo siguiente?:

<pre class="brush: jscript; highlight: [16,17,18]; title: Utilizando 1=clearInterval; notranslate" title="Utilizando 1=clearInterval">var cantidadDeLlamadas = 0;
function obtenerDatos(){
    cantidadDeLlamadas++;

    // lógica para obtener y mostrar los datos

    if (cantidadDeLlamadas === 5)
        clearInterval(relojito);
}

var relojito = setInterval(function(){
        obtenerDatos();
    }, 10000);

// creo otro setInterval y lo guardo en la misma variable que el anterior 
relojito = setInterval(function(){
        obtenerDatos();
    }, 10000);
</pre>

Lamentablemente al realizar el segundo setInterval perdimos toda referencia al primero, pero ambos siguen ejecutandose, por lo que cuando ejecute el *clearInterval(relojito)* solo va a detener el segundo intervalo, quedando el primero corriendo infinitamente sin posibilidad de detenerlo.

Ahora que sabemos esto, vamos a hacer un cambio en el código:

<pre class="brush: jscript; highlight: [2,12]; title: Utilizando 1=clearInterval; notranslate" title="Utilizando 1=clearInterval">var cantidadDeLlamadas = 0;
var relojito;
function obtenerDatos(){
    cantidadDeLlamadas++;

    // lógica para obtener y mostrar los datos

    if (cantidadDeLlamadas === 5)
        clearInterval(relojito);
}

clearInterval(relojito);
relojito = setInterval(function(){
        obtenerDatos();
    }, 10000);

</pre>

Simplemente realizo un clearInterval antes de asignarle uno nuevo, de esta manera me aseguro de no pisar un intervalo anterior al momento de crear uno. Realizar un clear antes de crear un nuevo intervalo es una recomendación personal, pero creanme que puede ser muy frustrante descubrir un problema de ese tipo.