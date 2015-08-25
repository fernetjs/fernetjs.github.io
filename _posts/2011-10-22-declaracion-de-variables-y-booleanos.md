---
title: Declaración de Variables y Booleanos
author: Pablo Novas
layout: post
permalink: /2011/10/declaracion-de-variables-y-booleanos/
dsq_thread_id:
  - 499032639
categories:
  - Lenguaje
tags:
  - booleanos
  - variables
---
<pre class="brush: jscript; title: ; notranslate" title="">var foo = true;
//var nombre = valor ;
</pre>

Hay que tener en cuenta que *var* declara una variable en el alcance actual, esto significa quepodemos declarar la variable como *foo = true;* sin el *var* y va a funcionar igual, pero de esta manera lo estamos haciendo Global. Mi recomendacion es utilizar el var SIEMPRE hasta que entiendan muy bien cual es la diferencia, por el momento vamos a decir que las varibles se declaran con *var*.

Espacios en blanco: en Javascript el fin de la instruccion es definido con *;* por lo que podemos declarar

<pre class="brush: jscript; title: ; notranslate" title="">var     foo         =      true        ;
// ó
var foo=true;
// ó
var foo = true ;
</pre>

van a funcionar de la misma manera, no siendo asi:

<pre class="brush: jscript; title: ; notranslate" title="">varfoo = true;
</pre>

ya que de esta manera estamos perdiendo el &#8220;var&#8221;, pero javascript va a funcionar igual, como dije antes el var no es obligatorio por lo que vamos a estar declarando una variable global llamada varfoo con valor true.  
Multiples declaraciones en la misma sentencia

<pre class="brush: jscript; title: ; notranslate" title="">var foo = true, baz = false;</pre>

<!--more-->

  
Podemos realizar mas de una declaracion en la misma sentencia comenzando con var y separando las declaraciones con ,  
Tambien podemos tenerlas en diferentes lineas, como dije antes, los espacios en blanco no son un  
problema para javascript siempre y cuando terminemos la sentencia con ;

<pre class="brush: jscript; title: ; notranslate" title="">var foo = true,
    baz = false;</pre>

En este caso ambas variables van a ser declaradas como var, pero tengan cuidado porque si me olvido la  
&#8220;,&#8221; todo cambia:

<pre class="brush: jscript; highlight: [1]; title: ; notranslate" title="">var foo = true
    baz = false;</pre>

En este caso es probable que no funcione o bien que esté declarando la primer variable con var y  
la segunda sin var. Pero por qué?, bueno en muchos casos javascript &#8220;agrega&#8221; a su gusto cuando  
cree que nos equivocamos, es decir, nos puede agregar solito ; al final de la primer sentencia  
pensando que ahi deberia ir, un ejemplo comun es:

<pre class="brush: jscript; title: ; notranslate" title="">var foo = 'Hola';

return
foo;</pre>

en este caso nos puede pasar que en ves de retornar la variable foo, simplente realize el return,  
porque nos agrego el &#8220;;&#8221;, lo que sucede es:

<pre class="brush: jscript; title: ; notranslate" title="">var foo = 'Hola';

return ; // ; agregado por el javascript
foo;</pre>

Asi que fijarse bien cuando declaramos variables, porque tranquilamente no falla nada y sin embargo  
no se esta comportando como lo esperamos.

Las variables apuntan a un valor

<pre class="brush: jscript; title: ; notranslate" title="">var foo = true;
//...
foo = false;</pre>

Las variables en javascript apuntan a un valor, no es que le cambiamos el estado a la memoria, sino que cambiamos a donde apuntan. En el ejemplo vemos que declaramos una variable foo con valor true y mas tarde le asignamos false, bueno lo que hicimos fue primero apuntar foo a true y luego apuntamos foo a false.