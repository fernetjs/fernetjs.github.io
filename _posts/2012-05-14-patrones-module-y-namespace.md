---
title: 'Patrones: Module y Namespace'
author: pjnovas
layout: post
permalink: /2012/05/patrones-module-y-namespace/
dsq_thread_id:
  - 689698023
categories:
  - Lenguaje
tags:
  - closures
  - funciones
  - patrones de diseño
---
Es muy común cuando tenemos una pagina web y tenemos que darle un poco de &#8220;salsón&#8221; automáticamente creamos un archivo js y tiramos funciones indefinidamente. Esto no esta bueno, si bien todo parece funcionar genial y nos sentimos bien por eso, despues de unas 5 o 6 funciones nuestro código empieza a volverse un poco feo.

Para evitar esto, lo mejor es empezar a pensar en patrones de diseño en javascript, en vez de tirar funciones, ordenemos nuestro código y usemos javascript como lenguaje y no como un medio de scripting desordenado.

#### Patrón Módulo

{% highlight js %}
var miFuncion = function() {};
miFuncion = miFuncion();
 {% endhighlight %}

Extraño, almacenamos una función en miFuncion y luego pisamos su valor con la ejecución de esa función.  
Y si ahora acortamos el código?:

{% highlight js %}
var miFuncion = ( function(){} )();
 {% endhighlight %}

Bien, ahora tenemos dentro de miFuncion una funcion ya ejecutada&#8230;  
Ahora vamos a un ejemplo mas real, cambiemos el nombre por *suma* y agreguemos una varibale *total*.

{% highlight js %}
var suma = (function() {
  var total = 0;
})();
 {% endhighlight %}

Pero no tenemos acceso a *total*, asi que vamos a retornar un objeto que nos de acceso:

{% highlight js %}
var suma = (function() {
  var total = 0;

  return {
    sumar: function(a, b){
      var sum = a + b;
      total += sum;
      return sum;
    },
    getTotal: function(){
      return total;
    }
  };
})();
 {% endhighlight %}

Ahá!, o sea que desde afuera no tenemos forma de cambiar *total*, pero si llamamos a *sumar* podemos modificar su valor y obtenerlo con *getTotal*.

Pensemos que *suma* guarda el resultado de una funcion ejecutada, mejor dicho, ***suma* guarda el retorno de la ejecución de la función con el contexto cuando fue ejecutada**. (si si, leelo 7 veces porque ahi está el secreto)

Eso suena piola, ahora vamos a ordenarlo, porque necesitamos un módulo resta tambien:

#### Patrón Namespace

Creemos un nuevo modulo maths donde vamos a poner nuestros 2 *sub-modulos* suma y resta:

{% highlight js %}
var maths = maths || {};

maths.suma = (function() {
  var total = 0;

  return {
    sumar: function(a, b){
      var sum = a + b;
      total += sum;
      return sum;
    },
    getTotal: function(){
      return total;
    }
  };
})();

maths.resta = (function() {
  var total = 0;

  return {
    restar: function(a, b){
      var dif = a - b;
      total += dif;
      return dif;
    },
    getTotal: function(){
      return total;
    }
  };
})();

maths.suma.sumar(20, 40); //retorna 60
maths.suma.sumar(10, 10); //retorna 20
maths.suma.getTotal(); //retorna 80

maths.resta.restar(40, 20); //retorna 20
maths.resta.restar(10, 10); //retorna 0
maths.resta.getTotal(); //retorna 20
 {% endhighlight %}

En la primer linea nos aseguramos de no pisar una declaracion anterior, si ya hay una, usamos esa, sino creamos un objeto vacio ([pueden ver mas de ese || en este post][1]). Y después, ya que en javascript podemos crear propiedades sin problemas en cualquier momento, simplemente le agregamos 2 propiedades, en las cuales creamos dos módulos.

El problema que encontramos en esto es el testeo, como testeamos esto?, como podemos armar un test donde podamos comprobar que despues de sumar un valor, x contenga el valor que esperamos? &#8230; escucho ofertas

 [1]: http://fernetjs.com/2012/04/valores-falsos-y-verdaderos/ "Valores falsos y verdaderos: || y &&"