---
title: 'Funciones: Argumentos y Parámetros'
author: Pablo Novas
layout: post
permalink: /2011/11/funciones-argumentos-y-parametros/
dsq_thread_id:
  - 529530113
categories:
  - Lenguaje
tags:
  - argumentos
  - funciones
  - parámetros
---
Todos conocemos lo que son los parámetros en una función, en muchos lenguajes simplemente los definimos en lo que se puede llamar *la firma del método o función* y cuando queremos opcionales?, o simplemente utilizar menos?, bueno definimos nulleables, hacemos otras firmas con menos o mas parámetros, en algunos lenguajes podemos definir cuales son opcionales, etc. Pero en javascript es aún mas fácil, no hacemos nada, simplemente no los pasamos:

<pre class="brush: jscript; title: ; notranslate" title="">function hacerAlgo(a, b){
    console.log('hacerAlgo fue llamada sin problemas');
}

hacerAlgo();
hacerAlgo('a');
hacerAlgo('a', 'b');
hacerAlgo('a', 'b', 'c');
</pre>

Javascript nos deja llamar a la funcion con menos parámetros sin problemas (siempre desde izquierda a derecha), hasta no enviando ni siquiera uno, o mas de los que permite.  
Nunca se preguntaron como funciona jQuery en los getter y setter?, por ejemplo la función text()  
<!--more-->

<pre class="brush: jscript; title: ; notranslate" title="">$('#unSpan').text('un valor para el span');
var valorDelSpan = $('#unSpan').text();
</pre>

La función es la misma, no hay sobrecargas ni declaraciones especiales de parametro opcional, es que javascript nos deja utilizar la función sin problemas enviando más o ningún parámetro. Pero cómo podemos saber que llega y que no?, bueno en principio podemos comprobar contra *undefined* de esta manera:

<pre class="brush: jscript; title: ; notranslate" title="">function text(texto){

    if (texto !== undefined) 
       console.log('me quieren usar como setter');
    else console.log('me quieren usar como getter');

}
</pre>

Es una manera, pero hay otras formas de comprobar que llega o no a una función y estos son los *argumentos*  
Con los *argumentos* podemos ver cuantos llegaron, quien llamo, sus valores y hasta ver los que no estamos esperando y fueron enviados igual.

<pre class="brush: jscript; title: ; notranslate" title="">function hacerAlguna(a, b){
    console.log(arguments); // ['a','b','c','d','e','f']
    console.log(arguments.length); // 6
    console.log(arguments[0]); // 'a'
    console.log(arguments[5]); // 'f'

    console.log(hacerAlguna.length); // 2

    if(arguments.length &gt; hacerAlguna.length)
       console.log('ey! me enviaste más parametros de los que tengo!');
}

hacerAlguna('a','b','c','d','e','f');
</pre>

Que tiene de mejor esto que comprobar contra *undefined*?, podemos tomar directamente el argumento por el índice. Pero tampoco es toda la idea, ya que sino para qué ponemos nombres a los parámetros o siquiera para que ponemos parámetros?, bueno sepan que existe y está ahi para usar, pero tampoco es para hacer nuestro código ilegible y complicado.

### Usar parametros o un objeto?

Qué pasa cuando tenemos una función con 3 parámetros y necesitamos agregar uno más?, editar la función y tener en cuenta el código ya existente para que admita ese parametro, con su refactorización de código &#8230; uff molesto. Y si utilizamos un objeto como parámetro?

<pre class="brush: jscript; title: ; notranslate" title="">function hacerAlguna(opciones){
    console.log(opciones.a);
    console.log(opciones.b);
    opciones.c(); 
}

hacerAlguna({
    a: 'parametro a',
    b: 'parametro b',
    c: function(){
       console.log('una funcion anónima llamada');
    }
});

</pre>

Suena bien, no?, no siempre es la opción pero es mucho más mantenible, ya que no cambiamos la *firma* de la función cada vez que necesitamos algo nuevo y mantenemos la nomenclatura de los parametros siendo código más legible.