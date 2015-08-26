---
title: 'DOM: Obteniendo y asignando texto con jQuery'
author: Pablo Novas
layout: post
permalink: /2012/04/dom-obteniendo-y-asignando-texto-con-jquery/
dsq_thread_id:
  - 652013324
categories:
  - Bibliotecas
  - Client Side
tags:
  - DOM
  - jquery
  - parámetros
---
jQuery nos brinda 3 formas de obtener y asignar contenido como texto al DOM.  


.val()
:   Obtener y asignar el valor de controles de formulario como ser input, select y textarea

.text()
:   Obtener y asignar el texto de cualquier elemento DOM. Específicamente utiliza en la propiedad innerHTML

.html()
:   Lo mismo que el text() con la diferencia que el texto es interpretado como HTML, no como texto plano

Los tres métodos trabajan de la misma manera al momento de obtener o asignar: para asignar, simplemente enviamos un string por parámetro y para obtener no enviamos ningún parámetro:

{% highlight js %}
//Obtener
var valorInput = $("#unInput").val();
var valorSpan = $("#unSpan").text();
var valorDiv = $("#unDiv").html();

//Asignar
$("#unInput").val(valorInput + " ... Nuevo");
$("#unSpan").text(valorSpan + " ... Nuevo");
$("#unDiv").html(valorDiv + "&lt;b&gt; ... Nuevo&lt;/b&gt;");

//Diferencia entre text() y html()

$("#unDiv").text("&lt;span&gt;HOLA!&lt;/span&gt;"); 
//resultado: &lt;span&gt;HOLA!&lt;/span&gt;

$("#unDiv").html("&lt;span&gt;HOLA!&lt;/span&gt;");
//resultado: HOLA!
 {% endhighlight %}

> Desde la versión 1.4 de jQuery el método .html() puede recibir una función y con un return dentro de la misma asignamos el innerHTML al elemento selecionado. 

{% highlight js %}
$("#unDiv").html(function(){
  return "Elementos hijos: " + $(this).children('*').length;
});
 {% endhighlight %}

#### Puntos importantes a tener en cuenta al utilizarlos:

{% highlight js %}
//val() como SET retorna el elemento
$('#unInput').val('Hola').addClass('alerta').show();

//val() como GET retorna el texto, no así su elemento
//simplemente podemos mover su get al final
var valor = $('#unInput').removeClass('alerta').val();

//De la misma manera funcionan el text() y el html().
 {% endhighlight %}

{% highlight js %}
// SET: html, text y val asignan el valor a todos 
$('div').html('&lt;p&gt;Contenido pisado con este Párrafo&lt;/p&gt;');

// GET: 
// html devuelve SOLO el innerHTML del primer elemento
var innerHTML_del_primer_DIV = $('div').html();

// text devuelve un concatenado de todos los innerHTML
var cadena = $('div, span, label').text();

// val devuelve un arreglo con los valores
// un select con multiple="multiple"
var paisesSeleccionados = $('#paises').val();
 {% endhighlight %}

{% highlight js %}
// Pisamos sin limpiar y perdemos la referencia
// a lo que ya existia de DOM
$("#unDiv").html("&lt;span&gt;Piso todo&lt;/span&gt;");
// Limpiamos el contenido del div antes de asignar
// nuevo html
$("#unDiv").empty().html("&lt;span&gt;Piso todo&lt;/span&gt;");
 {% endhighlight %}

Al momento de asignar con el método html() y pisar el contenido hay que tener en cuenta limpiar la memoria de los elementos antes de hacerlo para evitar que la memoria se nos vaya de las manos. Pueden ver mas sobre empty() y remove() en [este post][1]

Les dejo el jsFiddle con un ejemplo para que hagan pruebas: <http://jsfiddle.net/pjnovas/nwWYu/>

 [1]: http://fernetjs.com/2011/11/performance-el-dom-y-la-memoria/ "Performance: El DOM y la memoria"