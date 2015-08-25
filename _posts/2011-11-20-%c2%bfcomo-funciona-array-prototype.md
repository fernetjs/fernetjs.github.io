---
title: ¿Cómo funciona Array.prototype?
author: Lucas Romero
layout: post
permalink: /2011/11/%c2%bfcomo-funciona-array-prototype/
dsq_thread_id:
  - 497141991
categories:
  - Lenguaje
tags:
  - array
  - prototype
---
Con la propiedad prototype de la clase Array es posible agregar funcionalidad a un array o bien extender ciertos métodos si es que existe tal necesidad. A pesar de que la clase Array tiene muchos métodos útiles ([prototypeDef][1]) a veces es necesario agregar métodos que nos faciliten el desarrollo.

Veamos un ejemplo sencillo para entender su funcionamiento:

<pre class="brush: jscript; title: ; notranslate" title="">Array.prototype.fernet = function() {
    console.log('Fernet + JS!');
};
    
var vector = [];
vector.fernet();
</pre>

Con el ejemplo vemos que la función &#8216;fernet&#8217; fue agregada entre los métodos disponibles para todos los objetos array que haya. Esto puede ser problemático en el caso de que necesitemos usar un ciclo del tipo &#8216;for..in&#8217; (ver post [Usando for each con arrays][2]).

Veamos otro ejemplo:  
<!--more-->

<pre class="brush: jscript; title: ; notranslate" title="">Array.prototype.where = function(func) {
    var found = [];
    for (var i = 0, l = this.length; i &lt; l; ++i) {
        var item = this[i];
        if (func(item))
            found.push(item);
    }
    return found;
};

var conjunto = [];
conjunto[0] = 0;
conjunto[1] = 1;
conjunto[2] = 2;
conjunto[3] = 3;

var resultado = conjunto.where(function(a){
    return a&lt;2?true:false;
});

console.log(conjunto);
console.log(resultado);
</pre>

En el ejemplo vemos que se implementó el método &#8216;where&#8217; que recibe un condición y devuelve un nuevo array que contiene los elementos que cumplen esa condición.

¿Ahora qué pasa si queremos extender la funcionalidad de un determinado método? Veamos este ejemplo que extiende la funcionalidad para el método push:

<pre class="brush: jscript; title: ; notranslate" title="">Array.prototype.push=(function(){
    var original = Array.prototype.push;
    return function() {
        console.log('push modificado globalmente!!');
        return original.apply(this,arguments);
    };
})();
</pre>

Como pueden ver este método modifica el método push globalmente lo que hará que cada array tenga este push modificado entre sus métodos lo cual no es recomendable.

Para evitar esto veamos lo que hace este ejemplo:

<pre class="brush: jscript; title: ; notranslate" title="">var arr = [1,2,3,4];

arr.push = function (){
    console.log('push modificado!');
    return Array.prototype.push.apply(this,arguments);
};

arr.push(5);
console.log(arr);

var arr2 = [1,2];
arr2.push(3);
console.log(arr2);
</pre>

De esta forma sólo se modifica el método push para el array llamado &#8216;arr&#8217;, no siendo así para &#8216;arr2&#8217; que tuvo una ejecución normal del método.

Como conclusión se puede decir que la propiedad prototype es una herramienta potente para agregar métodos y extender la funcionalidad de otros aunque debe ser usada con cuidado.

 [1]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/prototype "Definición de prototype"
 [2]: http://www.fernetjs.com/2011/10/usando-for-each-con-arrays/ "Usando for each con arrays"