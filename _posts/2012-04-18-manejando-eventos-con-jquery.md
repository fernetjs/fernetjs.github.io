---
title: Manejando eventos con jQuery
author: pjnovas
layout: post
permalink: /2012/04/manejando-eventos-con-jquery/
dsq_thread_id:
  - 654569561
categories:
  - Bibliotecas
  - Client Side
tags:
  - DOM
  - eventos
  - jquery
  - performance
---
Aunque no lo parezca o bien no estemos al tanto, no es lo mismo realizar un .bind() que un .live() o bien un .delegate(). Cuando empezamos a utilizar jQuery o descubrimos una funcionalidad nueva, ya sea por buscarla en internet o cruzarnos con alguna, es importante entender un poco mas a fondo como funciona antes de usarla.

Vamos a ver que opciones tenemos al momento de suscribirnos a eventos del DOM con jQuery y como funcionan cada una.  
Antes de ver como nos suscribimos a eventos, tenemos que entender como funcionan.

##### DOM Tree (o árbol DOM)

Cuando escribimos HTML vamos creando contenedores con sus hijos, dandole estilos y armando nuestro esqueleto para su visualización. Por detrás se va generando [DOM][1], el cual se va construyendo en forma de árbol, de la misma manera que lo hacemos con nuestro HTML.  
Un ejemplo podría ser:

<pre>window
└── document
    ├── h1
    ├── div
    │   ├── span
    │   └── a
    └── p
        └── span
</pre>

Ahora, cuando hacemos click en el elemento *a* se va a disparar el evento &#8216;click&#8217;, pero a su vez se va a propagar hacia sus padres dentro del **árbol del DOM**. Es decir, el evento se va a ir &#8216;disparando&#8217; en sus padres (*a* -> *div* -> *document* -> *window*).

<pre><font style="color:red">window</font>
└── <font style="color:red">document</font>
    ├── h1
    ├── <font style="color:red">div</font>
    │   ├── span
    │   └── <font style="color:red">a</font>
    └── p
        └── span
</pre>

Ahora agreguemos un manejador a ese evento:

{% highlight js %}
$('a').bind('click', function(){
  console.log('disparado!');
});

//desligar evento
// $('a').unbind('click');
 {% endhighlight %}

En este caso utilizando .bind(), con nuestro selector de jQuery vamos a buscar todos los *a* en el documento, por lo que para cada *a* que **exista en el documento al momento de ejecutar ese código** vamos a estar suscribiendonos al evento *click*.

{% highlight js %}
$('a').live('click', function(){
  console.log('disparado!');
});

//desligar evento
// $('a').die('click');
 {% endhighlight %}

Es lo mismo?, no. Con el evento *.live()* de jQuery nos suscribimos al evento *click* del documento ( *$(document)* ) avisandole que es sólo para los *a*. Sabemos que cualquier evento que se dispare, su propagacion llegará hasta document, entonces, cuando una propagacion de un evento llega hasta el document, jQuery comprueba si el que disparó ese evento es igual al selector, en este caso un *a*.

Esto es mucho mejor que el .bind(), primero porque no necesitamos que exista el elemento antes de agregar el evento, el .live() se suscribe al document, por lo que no necesitamos existencia del *a*. Por otro lado, suponiendo que tenemos 100 *a* en el div, con el .bind() vamos a suscribirnos al click de 100 elementos DOM (lo que no suena nada bien), en cambio con el .live() va a ser solo a uno.

Y si queremos hacerlo de la misma manera que jQuery .live()?:

{% highlight js %}
$(document).delegate('a', 'click', function(){
  console.log('disparado!');
});

//desligar evento
// $(document).undelegate('a', 'click');
 {% endhighlight %}

Ahora se pone mas interesante, ya que podemos suscribirnos a eventos de una forma mucho mas controlada.  
Por ejemplo, en vez de esperar que toda la propagación del evento llegue al document, lo hacemos sobre el contenedor:

{% highlight js %}
$('div').delegate('a', 'click', function(){
  console.log('disparado!');
});
 {% endhighlight %}

En ese caso jQuery se suscribe a la propagación del contenedor, para el ejemplo un *div* y de esa manera no viajamos hasta el document.

Esto se puede hacer tranquilamente con el *.live()*:

{% highlight js %}
$('a', 'div').live('click', function(){
  console.log('disparado!');
});
 {% endhighlight %}

**Entonces?, cual uso?, cual es mejor?, el *.delegate()* ó el *.live()*?**  
La respuesta es el *.delegate()*, si bien el *.live()* hace lo mismo, nos salteamos una búsqueda en el DOM con el *.delegate()*, en el último caso con el *.live()* estamos buscando los *a* antes de llamar al metodo *.live()*, con el *.delegate()*, no ejecutamos el selector de los *a*, sino el del contenedor avisandole que vamos a querer que compruebe **mas tarde** los *a*.

**Ahora que entendemos todo el tema, que juega en todo esto el *.on()*?**  
El evento *.on()* y *.off()* aparecieron en jQuery 1.7 para terminar con todo este juego de *.bind()*, *.live()* y *.delegate()*. Su funcionalidad es simple, recibe 3 parámetros, tipo de evento, selector (opcional) y función. Si le pasamos un selector es un *.delegate()*, caso contrario un *.live()*:

{% highlight js %}
// bind:
$('a').bind('click', function(){ });
$('a').on('click', function(){ });

// live:
$('a').live('click', function(){ });
$(document).on('click', 'a', function(){ });

// delegate:
$('div').delegate('a', 'click', function(){ });
$('div').on('click', 'a', function(){ });

//desligar evento
// $('div').off('click', 'a');
 {% endhighlight %}

Asi que si tienen la posibilidad de utilizar jQuery desde 1.7 usen el .on() y se pueden olvidar de todo lo que explique mas arriba 😛

 [1]: http://fernetjs.com/2011/10/introduccion/ "Que es el DOM?"