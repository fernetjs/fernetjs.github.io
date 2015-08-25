---
title: jQuery .animate y .stop
author: Pablo Novas
layout: post
permalink: /2011/11/jquery-animate-y-stop/
dsq_thread_id:
  - 497142001
categories:
  - Bibliotecas
  - Client Side
tags:
  - animaciones
  - DOM
  - hover
  - mouseenter
  - mouseleave
---
Hoy en día encontramos muchas animaciones en la web, muchas formas de realizarlas y muchos plugins también. Lo que vengo viendo es el uso del método *.animate()* de jquery pero sin tener en cuenta su cola de animaciones (queue), por ejemplo disparando animaciones en un *mouseenter* y *mouseleave* sin detener la animación que esta ocurriendo, lo que incrementa la cola de animaciones y genera una repeticion no esperada de la misma animación muchas veces.

Antes de empezar les dejo la documentación de la API de jQuery, en mi opinión es el punto de partida para hacer animaciones personalizadas del DOM con jQuery: <a title="jQuery Effects" href="http://api.jquery.com/category/effects/" target="_blank">jQuery Effects</a>

Veamos como hacer una animación con jQuery:  
<!--more-->

  


En el ejemplo estamos utilizando la implementación de jQuery *.hover()* para el *mouseenter* y el *mouseleave* pasándole 2 handlers para cada uno y realizando una animación: aumentamos el ancho y alto cuando esta sobre el div y lo disminuimos a su estado inicial cuando termina. Como funciona?, simplemente utilizando el *.animate()* enviamos parámetros como objeto de las propiedades de CSS que queremos modificar en un tiempo determinado (milisegundos) y jQuery se encarga de armar la lógica para que suceda. 

<pre class="brush: jscript; highlight: [2]; title: ; notranslate" title="">$('#divAnimado').hover(function(){
    $(this).animate({
        width: 140,
    //...
</pre>

Pero qué pasa si pasamos el mouse repetidas veces antes de que termine una animación?, prueben poner el mouse adentro de div y sacarlo antes de que termine la animación varias veces.

La animación se repite cuantas veces hayamos pasado el mouse, esto es porque jQuery agrega una animación a la cola (queue) cada vez que llamamos a la función *.animate()* y como estamos ejecutando un *.animate()* cada vez que el mouse ingresa al div estamos &#8220;encolando&#8221; unas cuantas.

Para arreglar esto utilizamos el método *.stop()*, el cual detiene la animación actual, pero también necesitamos enviarle como parámetro que limpie toda la cola actual *.stop(true)*.  
De esta manera lo que hacemos es:

  1. Detener la animación actual.
  2. Limpiar la cola de animaciones.
  3. Ejecutar nuestra animación.



Ahora si pasamos el mouse repetidas veces tenemos una mejor experiencia.

<pre class="brush: jscript; highlight: [2]; title: ; notranslate" title="">$('#divAnimado').hover(function(){
    $(this).stop(true).animate({
        width: 140,
    //...
</pre>

Es muy común ver el método *.animate()*, empezar a utilizarlo y no darnos cuenta de este comportamiento, es por eso que les recomiendo que estén al tanto del *.stop(true)*, ya que la mayoría de las veces, queremos que detenga y limpie la cola de animaciones antes de ejecutar otra animación.