---
title: querySelector y querySelectorAll existen
author: matiasarriola
layout: post
permalink: /2012/06/queryselector-y-queryselectorall-existen/
dsq_thread_id:
  - 711402232
categories:
  - Client Side
tags:
  - DOM
---
En el pasado me encontré utilizando jQuery principalmente por los selectores y la potencia que me daban a la hora de trabajar y referenciar a elementos del DOM.  
Poco más tarde, me dí cuenta de que en varias oportunidades no era realmente necesario incluir todo jquery, sino que con solo un motor o biblioteca especializada en  selectores como <a title="sizzle" href="http://sizzlejs.com/" target="_blank">sizzle</a> bastaría.  
Hoy quiero compartir que querySelector y querySelectorAll existen.

##### Qué significa esto?

Es importante saber que a la hora de trabajar con el DOM no sólo estamos en la discusión de ir con los amigazos getElementById y getElementsByTagName o con bibliotecas como jQuery.  
Con js plano, puro, vanilla, o como udsted quiera llamarle, también podemos obtener elementos del DOM a partir de selectores basados en CSS.  
Este post está hecho porque sé que hay mucha gente que no está al tanto de querySelector. O de que tiene tan buen soporte; y yo me incluyo dentro dentro de este último grupo. No hace mucho me dí cuenta de que el tiempo había pasado y que <a href="http://caniuse.com/queryselector" title="soporte querySelector" target="_blank">casi todos los browsers se lo bancan</a> lo más bien. 

<img class="alignleft size-full wp-image-2097" title="Que piola!! cross-browser!" src="//fernetjs.com/wp-content/uploads/2012/06/burns-ok.jpg" alt="copado" width="251" height="224" />

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

##### Uso

querySelector es una función que a partir de un selector, devuelve el primer elemento que matchea con ese selector, o null en caso de que no matchee con ningún elemento.

{% highlight js %}
// obtengo el primer artículo
var articulo = document.querySelector('article'),
    primerLinkDelArticulo = null;
// checkeo si existe al menos un "article"
if (articulo !== null){
    // tambien puedo correr querySelector sobre un elemento (matchea hijos)
    primerLinkDelArticulo = articulo.querySelector('a');
}
 {% endhighlight %}

querySelectorAll devuelve un array de elementos con los que el selector matchea. En caso de que esto no ocurra con ningún elemento, el resultado va a ser un array vacío (array con length === 0).

{% highlight js %}
//traigo todos los elementos con la clase warning
var warnings = document.querySelectorAll('.warning');
if (warnings.length > 0){
    throw new Error('que lo pario! que pasó??');
}
 {% endhighlight %}

Obviamente, todo esto toma un poco más de sentido cuando tenemos selectores un poco más complejos.. un ejemplo un toque mas práctico:

{% highlight js %}
// los links que apuntan a un pdf
var pdfs = document.querySelectorAll('a[href$=".pdf"]');
pdfs.forEach(function(aPdf){
    console.log(aPdf.href);
});
 {% endhighlight %}

En fin.. éstas funciones son una herramienta más a tener en cuenta &#8211; que en mi caso y algunos casos conocidos estaba siendo menospreciada y casi olvidada.