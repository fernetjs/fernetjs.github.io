---
title: Que es jQuery?
author: Pablo Novas
layout: post
permalink: /2011/12/que-es-jquery/
dsq_thread_id:
  - 503714729
categories:
  - Bibliotecas
  - Client Side
tags:
  - DOM
  - jquery
  - performance
---
jQuery es una libreria, una referencia a un js en nuestro documento HTML para trabajar en el cliente con el <a href="http://fernetjs.com/2011/10/introduccion/" title="DOM" target="_blank">DOM</a> de una manera mucho mas fácil y legible.  
jQuery NO es un lenguaje de programación, ni tampoco la solución a todos tus problemas. Esto último es dificil de entender para muchos programadores. Si bien jQuery nos brinda muchas facilidades, no nos resuelve todos los problemas y hay muchos casos en los que es mejor no usarlo y no abusar de su grandioso *selector* (en un ratito vuelvo con un ejemplo)

### $() &#8230; qué es eso?, por qué?

Pensemos a jQuery como una función, si &#8230; simplemente una función que recibe parametros. La función está nombrada como jQuery(*parametros*), por ejemplo:  
<!--more-->

{% highlight js %}
var todosLosDivs = jQuery('div');
 {% endhighlight %}

Llamamos a la función jQuery pasandole como parámetro un string, en éste caso &#8216;div&#8217; y eso nos retornará todos los *divs* en nuestro documento. Bueno, a esto se le llama *selector*, un *selector* es un cadena (string) en la cual, por medio de standares como ser CSS, xPath, customs de jQuery, etc; definimos lo que vamos a buscar en nuestro documento. 

Y el signo $?, bueno, $() es lo mismo que jQuery(). Es un nombre alias para lo mismo, como javascript permite nombres de variables y funciones que empiecen con $ tenemos declarado ese alias para ahorrarnos escribir jQuery(), por lo que usando el ejemplo anterior, esto es lo mismo:

{% highlight js %}
var todosLosDivs = $('div');
 {% endhighlight %}

### Selectores

Como dije, es una cadena (string) en la cual definimos lo que queremos buscar. Pensemoslo como un *query* aplicado al DOM. Hay muchos tipos de selectores, ya sean:

{% highlight js %}
var divs_con_clase_foo = $('div.foo');
var elemento_con_id_baz = $('#baz');
 {% endhighlight %}

{% highlight js %}
var inputs_con_id_termina_en_chau = $('input[id$=chau]');
var botones = $('input[type=button]');
var checkboxs = $('input[type=checkbox]');
 {% endhighlight %}

{% highlight js %}
var botones = $(':button');
var checkboxs = $(':checkbox');
var checkboxs_con_checked_true = $(':checkbox :checked');
 {% endhighlight %}

Hay muchas formas más de *seleccionar* o hacer un *query* en el DOM, por ejemplo enviandole un elemento *nativo* de DOM:

{% highlight js %}
var ele = document.getElementById('miElemento');
var boton = $(ele);
 {% endhighlight %}

Pero no termina ahí, el punto no es solo *buscar* de una manera mas fácil en el DOM, sino también manipularlo. Lo que nos devuelve esa búsqueda es un objeto de jQuery (conocido como *jQuery wrapped set*, o envoltorio de jQuery), este objeto es un arreglo de elementos DOM, a los cuales les podemos aplicar alguna función de todas las que nos brinda jQuery, por ejemplo, agregarles a todos una clase CSS &#8216;baz&#8217;:

{% highlight js %}
var divs = $('div.foo');
if (divs.length &gt; 0) {
    divs.addClass('baz');
}
 {% endhighlight %}

Como se puede ver tengo un atributo *length* y ya que es un arreglo puedo comprobar cuantos elementos encontró. Despues le agregamos la clase CSS a todos los elementos.

### Listo!, soluciona mi vida?: NO

jQuery no es la solución a tu vida con javascript y el DOM, esos *queries* que hacemos necesitan procesamiento, también crear el jquery wrapper, y no queremos procesamientos con uso de memoria si no son necesarios. Un ejemplo muy común donde pierde sentido es:

{% highlight js %}
$('.boton').bind('click', function(){
    var id_del_boton = $(this).attr('id');
    if (id === 'foo') {
       // algo
    }
});
 {% endhighlight %}

Lo que estoy haciendo es bindear el evento *click* de un botón y cuando se dispare compruebo su id y realizo algo. Bueno, es muy común que en el primer amor a jQuery hagamos ese tipo de cosas, donde estamos creando un objeto jQuery solo para comprobar su id, algo que es mejor hacer utlizando el atributo nativo:

{% highlight js %}
$('.boton').bind('click', function(){
    if (this.id === 'foo') {
       // algo
    }
});
 {% endhighlight %}

Ese es uno, entre otros ejemplos en donde NO es necesario usar jQuery.

jQuery es mi librería favorita para el uso del DOM, pero hay que usarla cuando es necesario. Es importante entender que nos ayudda mucho, pero **sólo para lo que fue creada**.