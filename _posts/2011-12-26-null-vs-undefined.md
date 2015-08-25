---
title: null vs. undefined
author: Lucas Romero
layout: post
permalink: /2011/12/null-vs-undefined/
dsq_thread_id:
  - 516962989
categories:
  - Lenguaje
tags:
  - 'null'
  - nullvsundefined
  - operadores de igualdad
  - tipos de datos
  - undefined
---
Estos dos tipos de datos primitivos de javascript pueden causar confusión así que hay que tener bien en claro de que estamos hablando de cosas distintas.  
Por un lado, null puede tener solo un valor y ese valor es null :). El tipo de datos Null es considerado un &#8216;placeholder&#8217; para un objeto no existente. Se podría decir que null es un tipo especial de objeto ya que:

<!--more-->

<pre class="brush: jscript; title: ; notranslate" title="">alert(typeof(null)); //object
</pre>

Se puede decir que null es un placeholder que contiene nada, su espacio en memoria está seteado como vacío.  
Por otro lado, undefined significa que el valor aún no fue seteado, ni siquiera seteado como vacío. Por ejemplo, una variable que fue declarada pero no inicializada va a tener un valor de undefined: 

<pre class="brush: jscript; title: ; notranslate" title="">var fernetjs; 
alert(typeof fernetjs); //undefined
</pre>

De acuerdo al ECMAcore, ambos tipos de datos al igual que el resto de los tipos de datos primitivos de javascript (a excepción del string) ocupan un clúster de 8B en la memoria stack que es mucho más rápida que el heap que es donde van a parar los tipos de datos por referencia con un tamaño de almacenamiento variable. Más info en [Uso de memoria][1]  
En una de las reuniones de fernetJS pjnovas comentó el caso de que tuvo que asignar null a todas las variables de un juego para poder destruirlas (como se dijo anteriormente el espacio ocupado por null es vacío), sin embargo no es posible hacer eso si les hubiese asignado undefined.

Algo curioso que se da en terminos de comparación entre estos dos tipos de datos es lo siguiente:

<pre class="brush: jscript; title: ; notranslate" title="">alert(null == undefined); //true

alert(null === undefined); //false
</pre>

como pueden ver, esto puede ser el causante de muchos problemas en la aplicación (ver [Diferencia entre == y ===][2]) por eso siempre es necesario utilizar los operadores de igualdad correctos.

 [1]: http://rx4ajax-jscore.com/ecmacore/more/memory.html "Uso de memoria"
 [2]: http://fernetjs.com/2011/11/operadores-de-igualdad-y/ "Diferencia entre == y ==="