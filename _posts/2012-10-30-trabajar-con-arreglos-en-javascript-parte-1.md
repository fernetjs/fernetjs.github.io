---
title: Trabajar con arreglos en javascript (parte 1)
author: Fernando Rodriguez
layout: post
permalink: /2012/10/trabajar-con-arreglos-en-javascript-parte-1/
dsq_thread_id:
  - 907311189
categories:
  - Client Side
  - Utilidades
tags:
  - array
  - foreach
---
Trabajar con arreglos es una tarea habitual para cualquier programador, particularmente para aquellos que elegimos el lenguaje javascript. Recorrer un arreglo, encontrar un elemento, obtener ciertos elementos según sus características son tareas frecuentes. Pequeños pedazos de código para manejar arreglos se copian y pegan (o en el mejor de los casos se reescriben) continuamente. La pregunta es simple: Algo que nos resulta tan natural y que estamos tan acostumbrados a hacer día a día, ¿lo estamos haciendo de la mejor manera?

A continuación se muestran los métodos de la clase array y algunos ejemplos de como pueden mejorar nuestro código notablemente. Estos métodos tienen implementación nativa en navegadores modernos, con lo cual la eficiencia es superior comparada con la eficiencia de cualquier otra librería .js para colecciones (se puede utilizar <a title="array.js" href="http://ferrod20.github.com/array.js/" target="_blank">array.js</a> para obtener soporte completo). Todavía más: por su vasta funcionalidad, los métodos de la clase array abarcan a casi todos los métodos de colecciones no nativos, solo hay que aprender a utilizarlos.

<h3 style="text-align: center">
  Métodos
</h3>

#### Eliminar

**pop**: Elimina el ultimo elemento. Devuelve el elemento eliminado.  
**shift**: Elimina el primer elemento. Devuelve el elemento eliminado.

#### Agregar

**push**: Agrega al final del arreglo uno o más elementos. Devuelve la nueva longitud.  
**unshift**: Agrega uno o más elementos al inicio. Devuelve la nueva longitud.  
**splice**: Agrega y/o elimina elementos.

#### Orden

**reverse**: Da vuelta el arreglo.  
**sort**: Ordena los elementos.

#### Unión

**concat**: Une 2 arreglos.  
**join**: Une los elementos en un string.

#### Posición

**indexOf**: Devuelve el índice del primer elemento encontrado.  
**lastIndexOf**: Devuelve el índice del último elemento encontrado.

#### Recorrer

**forEach**: Ejecuta una función para cada elemento del arreglo.  
**filter**: Devuelve un nuevo arreglo cuyos elementos satisfacen la función pasada por parámetro.  
**map**: Dada una función de conversión, devuelve un nuevo arreglo con cada elemento convertido.  
**some**: Dada una función, devuelve verdadero si algún elemento cumple con la misma.  
**every**: Dada una función, devuelve verdadero si todos los elementos cumplen con la misma.

<h3 style="text-align: center">
  Ejemplos
</h3>

{% highlight js %}
var arr = ['durazno', 'pera', 'manzana', 'banana', 'mandarina']

arr.pop()
&gt; "mandarina" //el arreglo queda: ["durazno", "pera", "manzana", "banana"]

arr.shift()
&gt; "durazno" //el arreglo queda: ["pera", "manzana", "banana"]

arr.push('naranja')
&gt; 4 //el arreglo queda: ["pera", "manzana", "banana", "naranja"]

arr.unshift('kiwi')
&gt; 5 //el arreglo queda: ["kiwi", "pera", "manzana", "banana", "naranja"]

arr.splice(0,1)
&gt; ["kiwi"] //el arreglo queda: ["pera", "manzana", "banana", "naranja"]

arr.splice(2,2)
&gt; ["banana", "naranja"] //el arreglo queda: ["pera", "manzana"]

arr.splice(2,0, "banana", "naranja")
&gt; [] //el arreglo queda: ["pera", "manzana", "banana", "naranja"]

arr.splice(0,1, "kiwi")
&gt; ["pera"] //el arreglo queda: ["kiwi", "manzana", "banana", "naranja"]

arr.reverse()
&gt; ["naranja", "banana", "manzana", "kiwi"] //el arreglo queda: ["naranja", "banana", "manzana", "kiwi"]

arr.sort()
&gt; ["banana", "kiwi", "manzana", "naranja"] //el arreglo queda: ["banana", "kiwi", "manzana", "naranja"]

arr.concat(['pera', 'pomelo'])
&gt; ["banana", "kiwi", "manzana", "naranja", "pera", "pomelo"] //el arreglo queda: ["banana", "kiwi", "manzana", "naranja"]

arr.join()
&gt; "banana,kiwi,manzana,naranja"

arr.indexOf('naranja')
&gt; 3

arr.indexOf('kiwi')
&gt; 1
 {% endhighlight %}

En la segunda parte de este artículo se muestran ejemplos de los métodos más interesantes de array: forEach, filter, map, every, some