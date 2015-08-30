---
title: Del ofuscador al konami code
author: matiasarriola
layout: post
permalink: /2012/06/del-ofuscador-al-konami-code/
dsq_thread_id:
  - 731162577
categories:
  - Bibliotecas
  - Client Side
  - WTF
tags:
  - konami
  - ofuscadores
  - poco serio
---
Cuenta la historia que durante una juntada de fernetjs, estaba tratando de probar <a href="https://github.com/TShadwell/Nice.js" title="nice.js" target="_blank">nice.js</a>.  
Nice.js supuestamente ofusca el código javascript, y lo transforma a ascii art en base a una imagen. Me pareció divertido, y lo quise probar. Más allá de que fui cuidadoso eligiendo la imagen y le dediqué varios minutos, a la hora de elegir el script no quise perder el tiempo, entonces fuí al azar a un tab que tenía abierto, abrí las developer tools de chrome, agarré un script, y lo copié todo. El tab era jquery.com, y me quedé sorprendido cuando ví el siguiente comentario:

{% highlight js %}
// Hehe.
 {% endhighlight %}

Seguido a eso, el siguiente código (el archivo es <a href="http://jquery.com/files/rocker/scripts/custom.js" target="_blank">custom.js</a>):

{% highlight js %}
if ( window.addEventListener ) {
        var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
        window.addEventListener("keydown", function(e){
                kkeys.push( e.keyCode );
                if ( kkeys.toString().indexOf( konami ) >= 0 )
                        window.location = "http://ejohn.org/apps/hero/";
        }, true);
}
 {% endhighlight %}

Qué fue lo que hice? Probar la combinación de teclas de esos códigos :38, etc. (arriba, arriba, abajo, abajo, izquierda, derecha, izquierda, derecha, b, a).

Muy buena onda! Por un momento pensé que había descubierto un huevo de pascua en el sitio oficial de jQuery, hasta que lo *guglié*, y me dí cuenta que Paul Irish <a href="http://paulirish.com/2009/cornify-easter-egg-with-jquery/" title="jQuery easter egg by paul irish" target="_blank">ya había hablado de eso 3 años atrás</a>. 

Pero bueno, fué muy satisfactorio haber encontrado eso, y el haber tenido la oportunidad de jugar a ese &#8220;guitar hero&#8221;. La ivestigación continuó.

### Konami codes

jQuery no fué ni el último ni el primer sitio en implementar ese &#8220;truquito&#8221;, más bien conocido como konami code. Un poco de contexto e historia pueden ser encontrados en la <a href="http://es.wikipedia.org/wiki/C%C3%B3digo_Konami" title="Código konami - wikipedia" target="_blank">wikipedia</a>.  
Hay <a href="http://konamicodesites.com/" title="konamicodesites.com" target="_blank">una página que lista sitios implementando konami codes</a>, e inclusive existen bastantes <a href="http://snaptortoise.com/konami-js/" title="konami-js" target="_blank">utilidades</a>, <a href="https://github.com/davidcoallier/jquery-konami" title="jquery-konami" target="_blank">plugins de jQuery</a>, y demás.

[Konami-js][1] soporta gestures para dispositivos móviles, e incluso existe un plugin de wordpress basado en el mismo. 

Gente se preguntará: Qué *utilidad* tienen estos proyectos? NINGUNA!!!  
Muchas veces, solo el hecho de hacer de algo divertido, y de divertirse mientras se lo desarrolla y aprender, justifica los medios.

PD: Cuidado con dónde ejecutan la combinación de teclas ;).

 [1]: https://github.com/snaptortoise/konami-js "konami-js en github"