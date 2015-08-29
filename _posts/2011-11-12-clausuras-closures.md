---
title: Clausuras (Closures)
author: pjnovas
layout: post
permalink: /2011/11/clausuras-closures/
dsq_thread_id:
  - 497146049
categories:
  - Lenguaje
tags:
  - closures
  - funciones
---
El concepto es &#8220;clausurar&#8221; el contexto en el que se ejecuta una función, a esta función se la denomina *Closure*

### Cómo funcionan?

En donde se encuentra una función dentro de otra, la función interna tiene acceso a las variables de la función externa.

{% highlight js %}
function externa(x) {
   var variable = 3;

   function interna(y) {
      console.log(x + y + (++variable));
   }

   interna(10);
}

externa(2);
 {% endhighlight %}

Esto siempre dará 16 en la consola, porque *interna()* puede acceder a la *x* que fue definida como argumento en *externa()* y tambien puede acceder a variable de *externa()*.

Eso **NO** es un *closure*. Un *closure* es cuando se retorna la función interna y esta misma cierra sus variables externas antes de salir.  
<!--more-->

{% highlight js %}
function externa(x) {
   var variable = 3;

   return function (y) {
      console.log( x + y + (++variable) );
   }
}
var interna = externa(2); // interna es ahora un closure.
interna(10);
 {% endhighlight %}

También retornará 16, porque *interna()* todavia puede referenciar a *x* y *variable*, aunque ya no este directamente dentro del alcance de *externa()*. Sin embargo, como *variable* todavía esta siendo manejada dentro del closure *interna()*, va a continuar incrementandose cada vez que *interna()* sea llamada, a diferencia del ejemplo anterior.

### Importante cuando trabajamos con Closures

En el último ejemplo *x* es un número literal y como todo literal en javascript cuando se llame a *externa()* el numero *x* es copiado en la función como argumento.

Por otro lado, javascript siempre utiliza referencias cuando trabaja con Objetos. Por ejemplo, si llamamos a *externa()* con un objeto, el closure que retornará estará referenciado al objeto original.

{% highlight js %}
function externa(x) {
   var variable = 3;

   return function (y) {
      console.log(x + y + variable);
      x.unaProp = x.unaProp ? x.unaProp + 1 : 1;
      console.log(x.unaProp);
  }

}

var edad = new Number(2);

// interna es una closure referenciando al objeto edad.
var interna = externa(edad);

interna(10);
 {% endhighlight %}

Como es esperado, cada llamada a *interna()* incrementará *x.unaProp*. Lo que puede no ser esperado es que *x* está referenciando al mismo objeto que guarda *edad*, luego de un par de llamadas a *interna()* *edad.unaProp* valdrá 2.

> *Les dejo un training online que me pareció excelente lo interactivo y divertido que es.<del datetime="2012-04-16T13:43:31+00:00"> Está en Inglés, pero si se defienden con el idioma les va a resultar muy práctico: <a title="What's a Closure?" href="http://nathansjslessons.appspot.com/" target="_blank"><b>What&#8217;s a Closure?</b></a><br /> </em></del> **EDIT:** Hicimos disponible la versión en español! [Que es una clausura?][1] </p></blockquote> 
> 
> *Este post lo armé hace un tiempo en el sitio <a title="DosIdeas" href="http://www.dosideas.com" target="_blank">DosIdeas</a> (lo recomiendo, tiene muy buena info para el desarrollo Ágil de software) y como no puede faltar el tema en fernetjs, lo publiqué acá.*

 [1]: http://nathansjslessons.appspot.com/lesson?id=1000&lang=es