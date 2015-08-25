---
title: 'Modificando el contexto: call, apply y bind'
author: Pablo Novas
layout: post
permalink: /2013/01/modificando-el-contexto-call-apply-y-bind/
dsq_thread_id:
  - 1046688145
categories:
  - Lenguaje
tags:
  - apply
  - argumentos
  - bind
  - call
  - funciones
---
Buenas!, hace muy poquito conocí el bind() y me dieron ganas de armar un post mostrando la diferencia entre los 3.

Antes de arrancar, te recomiendo que leas el post [Patrones de Invocación de Funciones][1] que habla sobre el bindeo del contexto en el famoso *this*, así puedo concentrarme en mostrarte la diferencia entre estos métodos.

Bueno, ahora que sabes esto del *this* y como se bindea su contexto, algo que es extremadamente útil a la hora de tener el control sobre las funciones o métodos que hacemos y utilizamos.

Como viste en el post mas arriba en el caso del *apply* lo que estamos haciendo es meterle un nuevo contexto a una función, por ejemplo:

<pre class="brush: jscript; title: ; notranslate" title="">var obj = {
  delta: 2,
  test: function(num1, num2){
     return (num1 + num2) * this.delta;
  }
};

var resultado = obj.test(2,2);
console.log(resultado); // (2 + 2) * 2 = 8
</pre>

En este caso, simplemente tenemos un objeto con una propiedad y una función, al llamarla con 2 números, los sumamos y le aplicamos el delta de su contexto (en el cual está corriendo la función), que para este caso es el objeto en si mismo.

Pero que pasa si ahora queremos cambiarle ese contexto, un nuevo delta, definido por nosotros pero sin modificar el objeto&#8230;

### apply()

<pre class="brush: jscript; title: ; notranslate" title="">var cambio = {
  delta: 5
};

var resultado = obj.test.apply(cambio, [2,2]);
console.log(resultado); // (2 + 2) * 5 = 20
</pre>

Le aplicamos un nuevo contexto en el cual corre la función, por lo que ahora el *this* de *obj* va a contenter nuestro objeto *cambio*, por ende, el delta valdrá 5 al ejecutarse.  
Y que es el array que sigue a la llamada?, esos son los argumentos que recibe la función:

<pre class="brush: jscript; title: ; notranslate" title="">[funcion].apply([contexto], [parámetros como array]);
</pre>

### call()

Otra forma de llamar a una función aplicandole un contexto es con *call*, siguiendo con el ejemplo del apply:

<pre class="brush: jscript; title: ; notranslate" title="">var cambio = {
  delta: 5
};

var resultado = obj.test.call(cambio, 2, 2);
console.log(resultado); // (2 + 2) * 5 = 20
</pre>

La única diferencia es la forma de pasar los argumentos, ya que en vez de que sea un array, simplemente toma el primero como el contexto y los siguientes son los argumentos en el orden que los esperamos.

<pre class="brush: jscript; title: ; notranslate" title="">[funcion].call([contexto], [param1], [param2], [paramN]);
</pre>

### bind()

En este caso hay una vuelta de tuerca mas, que nos puede ser bastante útil.  
El *bind()* no llama a la función con un nuevo contexto, sino que nos devuelve una referencia a la función con ese nuevo contexto:

<pre class="brush: jscript; title: ; notranslate" title="">var cambio = {
  delta: 5
};

var funcionConCambio = obj.test.bind(cambio);
var resultado = functionConCambio(2, 2);
console.log(resultado); // (2 + 2) * 5 = 20
</pre>

Muy loco!, esto aplicado a callbacks puede ser muy interesante.  
Usas el *self*, *me* o *that*?

Supongamos tenemos una llamada ajax y definimos un callback para cuando termina, un ejemplo común sería:

<pre class="brush: jscript; title: ; notranslate" title="">// más código donde utilizamos el this
var that = this;
function callback(datos){
  that.magia(datos);
}

ajax(callback);
</pre>

Ahora con bind nos quedaría asi:

<pre class="brush: jscript; title: ; notranslate" title="">function callback(datos){
  this.magia(datos);
}

ajax(callback.bind(this));
</pre>

Mucho más limpio!

> Algo a tener en cuenta es que el metodo bind() aparece en el ECMAScript 5ta Edición, por lo que puede que los navegadores ancianitos no lo soporten.

 [1]: http://fernetjs.com/2012/01/patrones-de-invocacion-de-funciones-this/ "Patrones de Invocación de Funciones: this"