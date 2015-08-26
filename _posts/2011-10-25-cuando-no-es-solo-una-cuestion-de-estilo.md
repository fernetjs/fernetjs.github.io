---
title: Cuando no es sólo una cuestion de estilo
author: Matias Arriola
layout: post
permalink: /2011/10/cuando-no-es-solo-una-cuestion-de-estilo/
dsq_thread_id:
  - 529530439
categories:
  - Lenguaje
tags:
  - llaves
  - sintaxis
migration_issue: highlightline
---
El otro día estaba mirando una presentación de [douglas crockford][1] en la cual, como habitualmente lo hace, no sólo describía las partes buenas del lenguaje, sino también las malas. Cosas que tal vez pasaremos a ver en futuras publicaciones; pero hay una que particularmente me llamó mucho la atención y no me podía aguantar sin compartir.

### Las llaves, el return, y los puntos y comas

A veces traer las mañas y costumbres de otros lenguajes pueden jugar en contra. En este ejemplo, que cualquier desarrollador de C# podría haber escrito tranquilamente (vaya tradición en C#, medio obligada, la de arrancar con las llaves en una nueva linea), se deja esto en evidencia.

{% highlight js %}
function obtenerFernet(){
    return
        ({    marca: 'censored',
            precio: 46.99
        });
}
 {% endhighlight %}

Ahora que podemos obtener un poco de fernet, vamos a servirlo..

<pre>&gt;&gt;&gt; obtenerFernet()
undefined</pre>

<div>
  <strong><span style="color: #8b008b;">WTF???</span></strong>
</div>

<div>
  obtenerFernet() nos devuelve undefined. Interesante eh!?
</div>

<div>
  La explicación a todo esto es que javascript va a estar insertando por nosotros un punto y coma (;) luego del return, en el salto de línea.. Y así ignorando el resto de la función:
</div>

<div>
  <!--more--></p> 
  
  <!--highlight:[2]-->
{% highlight js %}

function obtenerFernet(){
    return;
        ({    marca: 'censored',
            precio: 46.99
        });
}
 {% endhighlight %}
</div>

<div>
  La inserción automática de puntos y comas está descripta como una de las <a title="strangest language feature" href="http://stackoverflow.com/questions/1995113/strangest-language-feature/2003277#2003277">características mas raras</a> alguna vez vistas en un lenguaje de programación.. Y no es para menos!! Uno puede estar horas y horas tratando de encontrar el problema en ese pequeño pedazo de código!
</div>

<div>
  Ahora sí, vamos a arreglar la función:
</div>

<div>
  {% highlight js %}

function obtenerFernet(){
    return ({
            marca: 'censored',
            precio: 46.99
        });
}
 {% endhighlight %}
  
  <p>
    Y ya estamos. Este es uno de los &#8220;pitfalls&#8221; que tenemos que evitar como desarrolladores de javascript. Algunos ejemplos más pueden encontrarse en <a title="automatic semicolon insertion" href="http://lucumr.pocoo.org/2011/2/6/automatic-semicolon-insertion/#update">http://lucumr.pocoo.org/2011/2/6/automatic-semicolon-insertion/#update (Inglés)</a> como así también existe una <a title="Discusión en barrapunto" href="http://preguntas.barrapunto.com/article.pl?sid=11/02/08/0638249">interesante discusión en español sobre el tema.</a>
  </p>
</div>

 [1]: http://www.crockford.com/ "Sitio del Douglas"