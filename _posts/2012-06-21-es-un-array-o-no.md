---
title: Es un Array o no?
author: pjnovas
layout: post
permalink: /2012/06/es-un-array-o-no/
dsq_thread_id:
  - 735561475
categories:
  - Lenguaje
tags:
  - array
  - ECMAScript
  - prototype
  - tipos de datos
---
Te pasó, no?, tenés que comprobar si el parámetro que recibiste en tu maravillosa funcion es un Array, o no. Primero probamos, tardamos menos que abrir google (o no ..):

{% highlight js %}
var unArray = [];
if (typeof unArray === 'Array') //puede que tenga sentido, pero no
if (unArray.constructor === Array) //anda?, no parece piola 
 {% endhighlight %}

Ahora si, abrimos google y nos tira mil opciones mas

{% highlight js %}
if (unArray instanceof Array) //esta pinta bien
toString.call(unArray) === "[object Array]"; //bueh..
 {% endhighlight %}

No estaría bueno poder hacer lo siguiente y fue?:

{% highlight js %}
if (Array.isArray(unArray)) {
}
 {% endhighlight %}

Está bueno y se puede, no entiendo porque tantas formas de comprobar lo mismo si ya podemos hacerlo tan simple.

Soporte: Chrome 5+, Firefox 4+, Safari 5+, Opera 10.5+, IE 9+

Si, ya se, me vas a decir que en IE 6, 7 y 8 no funca, bueno para todo browser que no se la banque, metemos el script:

{% highlight js %}
if(!Array.isArray) {
  Array.isArray = function (vArg) {
    return Object.prototype.toString.call(vArg) === "[object Array]";
  };
}
 {% endhighlight %}

o bien, algunas de todas las librerias que &#8220;levantan&#8221; el soporte del browser.

Como conclusión, dejemos de tirar condiciones extrañas de comprobacion de Arrays, ya tenemos a disposición un método que queda muy coqueto 😛

[Mas documentación en MDN: isArray()][1]

 [1]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray "isArray en MDN"