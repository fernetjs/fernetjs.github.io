---
title: Variables Globales
author: Pablo Novas
layout: post
permalink: /2011/11/variables-globales/
dsq_thread_id:
  - 498150555
categories:
  - Lenguaje
tags:
  - variables
---
Algo para tener en cuenta al momento de declarar variables globales en javascript es como se comportan con respecto a su alcance.  
Supongamos el siguiente codigo:

<pre class="brush: jscript; title: ; notranslate" title="">foo = true; //alcance global
var baz = 101; //alcance global

function unaFuncion(){
    var bar = true; //alcance de funcion

    foo2 = 'foo'; //alcance global

    window.foo3 = false; //alcance global
}

unaFuncion();
</pre>

Si inspeccionamos los objetos luego de ejecutar el script, tendremos lo siguiente:

<pre class="brush: jscript; title: ; notranslate" title="">&gt;&gt; window
    &gt;&gt; foo // true
    &gt;&gt; foo2 // 'foo'
    &gt;&gt; foo3 // false

&gt;&gt; baz // 101

&gt;&gt; unaFunction
    &gt;&gt; bar // true
</pre>

Como se puede ver *foo* y *foo2* no fueron declaradas con *var*, y ambas fueron tratadas al igual que *foo3*, es decir, automáticamente asignadas al objeto *window*. Esto siginifica que *window* es nuestro **objeto global**, todo lo que **no** declaremos con *var* terminará siendo un miembro de *window*.  
Es por eso que hay que tener mucho cuidado cuando evitamos el *var*:  
<!--more-->

<pre class="brush: jscript; title: ; notranslate" title="">foo = true;
function test(){
    foo = false;
}
// foo === true;
test();
// foo === false;
</pre>

Esto pasa porque es lo mismo que:

<pre class="brush: jscript; highlight: [1,3]; title: ; notranslate" title="">window.foo = true;
function test(){
    window.foo = false;
}
// window.foo === true;
test();
// window.foo === false;
</pre>

Ahora si volvemos al primer ejemplo podremos ver que *bar* solo tuvo alcance dentro de la funcion (no siendo posible utilizarla por fuera), pero *baz* sí, y no fue tratada de la misma manera que las *foo*. Al ser declarada con *var* no fue incluida en *window*.

### Conclusión

Intenten declarar siempre con *var*, si quieren utilizar variables globales declarenlas con el *var* fuera de las functiones para que estén a un alcance global, pero no siendo incluidas en window y así tendrán un mayor control de las mismas.

<< En NodeJS sucede lo mismo, con la diferencia que *window* es *process*. >>