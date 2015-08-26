---
title: Mouse enter, over, leave, out. cual y cuando?
author: Pablo Novas
layout: post
permalink: /2011/10/mouse-enter-over-leave-out-cual-y-cuando/
dsq_thread_id:
  - 528218059
categories:
  - Client Side
tags:
  - eventos
  - hover
  - mouseenter
  - mouseleave
  - mouseout
  - mouseover
migration_issue: highlightline
---
Utilizar los eventos del mouse en javascript para modificar el DOM le da una mejor experiencia al usuario que utiliza nuestra página web, podemos comprobar en que caso tiene el mouse sobre algún lugar en especial y animarlo, mostrarlo, subrayarlo o simplemente cambiarle el color de fondo. El punto es entender que eventos son mejores que otros y para que casos.

Suponiendo que no necesitamos una animación, queremos cambiar el estilo CSS de un elemento, como puede ser el tamaño de la fuente de texto, el color de la misma o el background-color, etc. Para la mayoría de esos casos no nos convendría escribir javascript ya que podríamos utilizar simplemente el *:hover* de css y con eso bastaría.

{% highlight xml %}
&lt;div class="miClaseCSS"&gt;
    &lt;p&gt;Este div cambiará su color de fondo a verde
             cuando el mouse este sobre él&lt;/p&gt;
&lt;/div&gt;
 {% endhighlight %}

<!--highlight:[5]-->
{% highlight css %}
.miClaseCSS
{
    background-color: white;
}
.miClaseCSS:hover
{
    background-color: green;
}
 {% endhighlight %}

Ahora que pasa si necesitamos realizar alguna animación o ejecutar alguna lógica. Bueno, ahí cambia porque ya no es un &#8220;estilo&#8221; lo que estamos cambiando y vamos a necesitar capturar el evento en javascript.  
<!--more-->

  
Para el &#8220;cuando paso el mouse, entro o salgo&#8221; tenemos varias opciones, vamos a ver bien para que funciona cada una, porque si bien suenan parecido, no funcionan de la misma manera:

**Evento mouseenter:** Se dispara cuando el mouse *entra* al control que está escuchando. Este evento se ejecuta sólo una vez, para que se vuelva a ejecutar debemos salir del control y volver a *entrar*.

**Evento mouseleave:** Se dispara cuando el mouse *sale* del control que está escuchando. Este evento se ejecuta sólo una vez, para que se vuelva a ejecutar debemos ingresar al control y volver a *salir*.

Son simples, entro y salgo de un control y sus respectivos eventos se disparan al momento en que sucede la acción, pero no es lo mismo para los siguientes:

**Evento mouseover:** Se dispara cuando el mouse se encuentra dentro del control que esta escuchando el evento, es decir, el puntero *entra* al control y se ejecuta, pero mientras el puntero este adentro del control y lo mueva se vuelve a ejecutar. Hay que destacar la diferencia con el evento *mouseenter*, ya que el ultimo solo se ejecuta una vez, en cambio el *mouseover* cuantas veces me mueva dentro del control.

**Evento mouseout:** Se dispara cuando el mouse sale del control que esta escuchando el evento. Pero es diferente al *mouseleave*, en este caso el evento se dispara si algún elemento hijo del mismo dispara el mouseout.

Supongamos lo siguiente:

{% highlight xml %}
&lt;div id="padre" onmouseout="alert('mouseout ejecutado!');"&gt;
   &lt;div id="hijo"&gt;&lt;/div&gt;
&lt;/div&gt;
 {% endhighlight %}

En este caso cuando salgamos del div &#8220;hijo&#8221; se disparará el alert. No siempre es el comportamiento esperado, por lo que en principio yo utilizaría el mouseleave para el caso en el que salgo de un control.

Les dejo un jsFiddle con un ejemplo muy bueno sacado de jQuery para que vean las diferencias entre estos eventos.



Y por otro lado les recomiendo vean el evento <a title=".hover() - jQuery" href="http://api.jquery.com/hover/" target="_blank">.hover() de jQuery</a>, el cual facilita el manejo cuando el mouse entra o sale de un control en un solo evento con 2 handlers.

**Resumen**  
Si solo van a cambiar estilos css, usen el :hover de css, queda mas limpio y no necesitan ejecutar scripts. En otro caso que requiera scripts utilicen los eventos cuidadosamente para no tener comportamientos extraños, y si pueden, usen jQuery para mejorar la lectura del código y mantener el código *cross-browser*