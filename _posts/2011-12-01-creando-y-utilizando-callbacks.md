---
title: Creando y utilizando callbacks
author: Pablo Novas
layout: post
permalink: /2011/12/creando-y-utilizando-callbacks/
dsq_thread_id:
  - 497208757
categories:
  - Lenguaje
tags:
  - asincronismo
  - funciones
  - sintaxis
---
Como la palabra en inglés lo indica un callback es una &#8220;llamada de vuelta&#8221; y este es un concepto importante al momento de escribir código. Es simple: llamo a una funcion y le envío por parámetro otra función (un callback) esperando que la función que llamé se encargue de ejecutar esa función *callback*.

Para ver mas esto de utilizar funciones como variables pasen por <a title="Alcance de Variables – Parte 2: funciones" href="http://www.fernetjs.com/2011/10/alcance-de-variables-parte-2-funciones/"  target="_blank">aca</a>

<pre class="brush: jscript; title: ; notranslate" title="">function haceAlgo(miCallback){
    //hago algo y llamo al callback avisando que terminé
    miCallback();
}

haceAlgo(function(){
   console.log('terminó de hacer algo');
});

</pre>

También podemos enviar y recibir parámetros:  
<!--more-->

<pre class="brush: jscript; title: ; notranslate" title="">function haceAlgo(miCallback){
    //hago algo y llamo al callback avisando que terminé
    miCallback('cualquier cosa');
}

haceAlgo(function(queHizo){
   console.log('terminó de hacer ' + queHizo);
});

</pre>

Pero callback no significa que voy a llamar cuando termino algo, simplemente puedo tener distintos callbacks que se van llamando en determinados casos.  
La idea es disparar eventos en las funciones que llamaron &#8220;avisando&#8221; que esta sucendiendo, por ejemplo:

<pre class="brush: jscript; title: ; notranslate" title="">function haceAlgo(callbackPaso1, callbackPaso2, callbackTermino){
    //algo aca
    callbackPaso1('paso 1');

    //sigo... algo aca
    callbackPaso2('paso 2');

    //sigo ... y termino
    callbackTermino('terminó');
}

haceAlgo(
    function(quePaso){
       console.log(quePaso);
    },
    function(quePaso){
       console.log(quePaso);
    },
    function(queHizo){
       console.log(queHizo);
    });

</pre>

También lo podemos utilizar declarando funciones nombradas y separando la lógica:

<pre class="brush: jscript; title: ; notranslate" title="">function haceAlgo(callbackPaso1, callbackPaso2, callbackTermino){
    //algo aca
    callbackPaso1('paso 1');

    //sigo... algo aca
    callbackPaso2('paso 2');

    //sigo ... y termino
    callbackTermino('terminó');
}

function paso1(quePaso){
     console.log(quePaso);
}

function paso2(quePaso){
     console.log(quePaso);
}

function termino(queHizo){
     console.log(queHizo);
}

haceAlgo(paso1, paso2, termino);

</pre>

De esta forma creamos funciones nombradas fuera de la llamada y estas a su vez podrian disparar otros eventos (con collbacks) tambien.

Por último y no menos importante, los callbacks **No son asincrónicos**, es decir, dispara el callback y cuando termina la ejecución de esa función de callback continua desde donde lo disparó. En el ejemplo anterior dispara el *callbackPaso1()* y cuando este termina, continua continua la ejecución disparando el *callbackPaso2()*.

Para realizarlo asincronicamente deberiamos utilizar un <a title="Ejecuciones Asincrónicas de funciones" href="http://www.fernetjs.com/2011/11/ejecuciones-asincronicas-de-funciones/" target="_blank">setTimeout()</a>