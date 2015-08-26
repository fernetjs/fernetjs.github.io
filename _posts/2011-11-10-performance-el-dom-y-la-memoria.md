---
title: 'Performance: El DOM y la memoria'
author: Pablo Novas
layout: post
permalink: /2011/11/performance-el-dom-y-la-memoria/
dsq_thread_id:
  - 529530095
categories:
  - Client Side
  - Performance
tags:
  - DOM
  - performance
migration_issue: highlightline
---
Con la llegada de las aplicaciones ricas de internet (RIA: Rich Internet Applications), nuestras páginas requieren mejor experiencia de usuario, lo que lleva a un mayor manejo del DOM con largas hojas de código js, animaciones, etc. Pero esto lleva a un problema que no siempre se prevé antes de desarrollar y de pronto todo empieza a funcionar lento o se come la memoria de la maquina del cliente.

El problema con la web no es el javascript, sino el DOM:

  1. Cada vez que modificamos el DOM resultando en un lindo efecto visual, el explorador realiza lo que se llama &#8220;re-flow&#8221;, re-dibujar el DOM.
  2. Cada explorador maneja la memoria a su gusto, el DOM es peso en memoria que no siempre se libera como lo esperamos, o ni siquiera pensamos en lo que va a pesar después de que ejecute nuestra maravillosa función JS.

Para el caso 1 lo que se puede hacer es intentar reducir las animaciones y modificaciones, eso soluciona el problema del re-flow pero no el hecho de que ahora tenemos menos animaciones y efectos visuales. Si tienen la posibilidad de utilizar HTML 5, una buena opción es la utlización de Canvas, lo que es mucho menos pesado al momento de realizar animaciones. Podemos dibujar e interactuar con los eventos del cliente, como ser mouse y teclado pero sin el trabajo que requiere un re-flow ya que no usamos el DOM.

En el caso 2 jQuery puede ser de gran ayuda con sus funciones empty() y remove(), las cuales nos liberan a través de selectores los elementos del DOM.

Un ejemplo común es realizar llamadas ajax y refrescar una lista de elementos, simulemos eso:  
<!--more-->

<!--highlight:[6]-->
{% highlight js %}
var cantidadEjecuciones = 0;

function AgregarElementos(){
    cantidadEjecuciones++;

    $('#unDiv').html('');

    for(var i=0; i&lt;100; i++) {
       $('#unDiv').append($('&lt;p&gt;').text('texto'));
    }

    //Si ejecutó menos de 5 veces, vuelvo a ejecutar.
    if (cantidadEjecuciones &lt;= 5){
        setTimeout(function() {
            AgregarElementos();
        }, 2000);
    }
}

AgregarElementos();

 {% endhighlight %}

La función anterior simula una carga de párrafos a un div cada 2 segundos, 5 veces. A simple vista la función es llamada, limpia el div y agrega 100 párrafos nuevos. El problema es que no se están liberando los objetos de memoria, como parece y cada vez que ejecuto la función, se agregan 100 más.

<!--highlight:[7]-->
{% highlight js %}
var cantidadEjecuciones = 0;

function AgregarElementos(){
    cantidadEjecuciones++;

    //Limpio el DOM con los elementos anteriores.
    $('#unDiv p').empty().remove();

    for(var i=0; i&lt;100; i++) {
       $('#unDiv').append($('&lt;p&gt;').text('texto'));
    }

    //Si ejecutó menos de 5 veces, vuelvo a ejecutar.
    if (cantidadEjecuciones &lt;= 5){
        setTimeout(function() {
            AgregarElementos();
        }, 2000);
    }
}

AgregarElementos();
 {% endhighlight %}

De esta manera, justo antes de agregar los 100 nuevos párrafos limpio el dom utilizando el remove() de jQuery y así también la memoria.