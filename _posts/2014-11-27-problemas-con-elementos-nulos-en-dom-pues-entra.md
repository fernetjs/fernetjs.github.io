---
title: 'Problemas con elementos nulos en DOM, pues entra&#8230;'
author: Jeferson De Freitas
layout: post
permalink: /2014/11/problemas-con-elementos-nulos-en-dom-pues-entra/
dsq_thread_id:
  - 3263324314
categories:
  - Client Side
tags:
  - DOM
  - eventos
  - jquery
  - onload
---
Bienvenido al tema de hoy les hablaremos sobre el **DOM** y mas exactamente porque aveces al asignar un elemento por **ID** este es nulo, ¿porqué?, pues desde acá desarrollaremos el tema

**DOM** o **Document Object Model**, no es mas que un Modelo en Objetos para la Representación de Documentos, los **navegadores** modernos crean un** árbol de nodos** de los elementos de una pagina

A partir de acá sabemos que al navegador web entra al sitio web **renderiza** todo tan rápido como pueda, ahora pues&#8230;, ¿y si yo asigno a una variable un elemento por **ID** que todavía no existe?, pues sera nula, y a partir de acá ya vemos el porque de que sea nulo, ¿pero cual es la solución?, esperamos a que el documento se cargue y luego ejecutamos la función que arranque con todo el procesamiento **DOM**, por ejemplo

**Desde el body**

{% highlight xml %}
&lt;body onload="myMainFunction()"&gt;
 {% endhighlight %}

**Desde el javascript**

{% highlight js %}
window.onload=function() {
  // myMainFunction() o el código desde acá
}
 {% endhighlight %}

**Desde JQuery**

{% highlight js %}
$(function() {
// myMainFunction() o el código desde acá
});
 {% endhighlight %}

Por otra parte, ¿que es un **nodo** exactamente?, &#8220;un **nodo** es uno de los elementos de una **lista enlazada**, de **un árbol** o de **un grafo**&#8220;, &#8220;Cada **nodo** será una **estructura** o **registro** que dispondrá de varios **campos**, y al menos uno de esos **campos** será un **puntero** o referencia a otro **nodo**&#8221;

Un **nodo** se usa en **estructura de datos** de** lenguajes de bajo nivel** para crear **estructura de datos** de expansion dinámica

Este es un post de *Jeferson De Freitas*, el post se baso en mis experiencias y información sacada de [http://es.wikipedia.org][1] , puedo atender sus dudas en la caja de comentarios, y ante mano este tema no trata sobre DOM desde 0

 [1]: http://es.wikipedia.org "Wikipedia"