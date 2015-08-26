---
title: 'Extendiendo javascript: String.trim()'
author: Pablo Novas
layout: post
permalink: /2012/01/extendiendo-javascript-string-trim/
dsq_thread_id:
  - 534326723
categories:
  - Utilidades
tags:
  - extender javascript
  - trim
migration_issue: highlightline
---
El famoso trim, que casi siempre esta presente, javascript no lo tiene (o por lo menos todavía). Vamos a usar ese tan necesario metodo para ver un poco como podemos extender nuestro javascript; pero es importante no utilizar una libreria, por ej: jQuery tiene $.trim() lo cual es muy útil, pero la idea no es referenciar una libreria por un método. 

<!--highlight:[12]-->
{% highlight js %}
Function.prototype.nuevoMetodo = function(nombre, funcion) {
    if (!this.prototype[nombre]) {
        this.prototype[nombre] = funcion;
        return this;
    }
}

String.nuevoMetodo('trim', function(){
    return this.replace(/^\s+|\s+$/g, '');
});

var trimeado = '    hola'.trim();
console.log(trimeado); // 'hola'
 {% endhighlight %}

Primero extendemos el objeto Function de javascript mediante prototype con una funcion nuestra que llamé *nuevoMetodo*, la cual recibe un nombre y una funcion. Lo primero que hacemos es comprobar que no lo tenga, como vimos <a href="http://fernetjs.com/2011/10/usando-for-each-con-arrays/" title="Usando for each con Arrays" target="_blank">en este post</a> podemos acceder a propiedades de un objeto en forma de array, y ya que el valor *undefined* es falso podemos hacer la condición: Si no existe, lo agregamos. De esta manera estamos prototipando *Function* con una función generica para agregar métodos y extender nuestro javascript.

Ahora simplemente llamamos a *nuevoMetodo* desde String (ahora lo posee por herencia) y le agregamos la función trim, que basicamente es un regular expression que remueve los espacios.

Es una forma segura y limpia de extender nuestro javascript para casos especificos sin tener que hacernos una funcion colgada de una palmera.

Fuente: <a href="http://shop.oreilly.com/product/9780596517748.do" title="JavaScript: The Good Parts" target="_blank">JavaScript: The Good Parts &#8211; Douglas Crockford</a>