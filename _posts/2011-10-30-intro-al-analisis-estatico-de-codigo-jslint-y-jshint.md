---
title: Intro al análisis estatico de código. jslint y jshint
author: Matias Arriola
layout: post
permalink: /2011/10/intro-al-analisis-estatico-de-codigo-jslint-y-jshint/
dsq_thread_id:
  - 497917152
categories:
  - Bibliotecas
tags:
  - calidad de código
  - sintaxis
---
Al igual que para otros lenguajes, en javascript existen también herramientas para el análisis estático de código. A los desarrolladores de la plataforma .net les será conocido [fxcop][1],  bueno, el objetivo es el mismo: aumentar la calidad de código.

Este tipo de herramientas toman el código de fuente, y dependendiendo de un set de reglas, nos indican cuáles de éstas estamos rompiendo, de forma que podamos identificar más fácilemente esas &#8216;cosas raras&#8217; que uno escribe y que potencialmente están atentando contra la calidad del código.

> JSLint will hurt your feelings

Si, es cierto. Su misma página, y su propio creador lo proclaman. JSLint ( http://www.jslint.com ) es una herramienta desarrollada por [douglas crockford][2] (escribí dos posts y en los dos lo referencié.. Y?? CUAL HAY??) que está escrita en javascript.

Para hacer nuestra primera prueba, todo lo que hay que hacer es dirigirse a[ la página][3] y pegar allí el código, hacer los cambios necesarios en la configuración y presionar el botón JSLint. Luego de eso se produce el momento en el que se muestran los resultados y usted comienza a maldecir a crockford, a este blog y a javascript.

<div id="attachment_247" style="width: 394px" class="wp-caption aligncenter">
  <img class="size-full wp-image-247" title="bart-laura" src="http://www.fernetjs.com/wp-content/uploads/2011/10/bart-laura.jpg" alt="Bart en la casa del arbol." width="384" height="288" />
  
  <p class="wp-caption-text">
    Este soy yo momentos antes de correr jslint por primera vez. NOTA: acto seguido la mina le saca el corazón.
  </p>
</div>

  
<!--more-->

  
La realidad es que hay que tomarlo con calma y empezar a analizar los mensajes. JSLint está diseñado para evitar que utilicemos las cosas malas del lenguaje. Con cosas malas hablamos de cosas como variable globales, uso de eval, mal uso de operadores, y [demás yerbas][4] ..

Este es un ejemplito de algo del output para el [monthpicker plugin][5] posteado unos días atrás:  
`<br />
Problem at line 10 character 17: 'myParams' was used before it was defined.<br />
myParams = jQuery.extend({`  
`<br />
Problem at line 37 character 22: Unexpected ';'.<br />
};`

`Problem at line 50 character 43: Expected '===' and instead saw '=='.<br />
if ($container.length == 0) {`

Bueno, hay muchos más mensajes&#8230;.En fin, el código del mismo jslint se puede[ encontrar en github][6] y forkearlo.

Así fue como nació [JSHint][7], cuyo objetivo es el mismo, pero que basa esas &#8216;cosas malas del lenguaje&#8217; no solo en la opinión de una persona, sino en  la comunidad. La herramienta es mucho más configurable que la anterior, y también [está en github][8]. Ahí se pueden crear issues si se encuentra que hay alguna regla que falta o que debería ser modificada, proponer incluir mejoras,  y palpar un poco más todo este sentido de comunidad.

JSHint también está disponible como un paquete de node, se puede agregar a nuestros scripts de integración continua, pero eso lo dejamos para más adelante.

 [1]: http://es.wikipedia.org/wiki/FxCop "FxCop"
 [2]: https://twitter.com/#!/crockfordfacts "Crockford Facts"
 [3]: http://www.jslint.com "jslint"
 [4]: http://www.jslint.com/lint.html "reglas de jslint"
 [5]: http://www.fernetjs.com/2011/10/jquery-plugin-month-picker/ "jQuery Plugin – Month Picker"
 [6]: https://github.com/douglascrockford/JSLint "jslint en github"
 [7]: http://www.jshint.com "JSHint"
 [8]: https://github.com/jshint/jshint "JSHint en github"