---
title: Space Invaders 404
author: Pablo Novas
layout: post
permalink: /2012/01/space-invaders-404/
dsq_thread_id:
  - 553239025
categories:
  - Client Side
  - Performance
  - WTF
tags:
  - animaciones
  - array
  - canvas
  - json
  - performance
---
FernetJS tiene ahora un error 404 personalizado en canvas! &#8230; claro, no podía faltar!

El clasico juego Space Invaders en javascript usando el amado CANVAS para mostrar algo mas divertido que un *404 &#8211; Not Found*. 

<a href="http://fernetjs.com/notfound" title="404 - Not Found" target="_blank">Jugar Invaders 404</a>

El objetivo era, aparte de ser un *code for fun*, que sea muy configurable y que no use ni media imagen! &#8230; todo lo que se dibuja en el CANVAS es a partir de arreglos JSON de números. Por ejemplo:  
<!--more-->

#### Disposición de la invasión alienígena

<pre class="brush: jscript; title: ; notranslate" title="">// formando el "404" con los aliens
// 1 = Alien Cangrejo | 2 = Alien Calamar
ImageMapper.Invasion = function(){
    return [
        [2,2,2,2,2,2,2,2,2,2,2,2,2],
        [2,2,2,1,2,1,1,1,2,2,2,1,2],
        [2,2,1,1,2,1,2,1,2,2,1,1,2],
        [2,1,2,1,2,1,2,1,2,1,2,1,2],
        [2,1,1,1,2,1,2,1,2,1,1,1,2],
        [2,2,2,1,2,1,1,1,2,2,2,1,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2]
    ];
};
</pre>

#### Disposición de los ladrillos para el escudo

<pre class="brush: jscript; title: ; notranslate" title="">// formando el "NOT FOUND" del escudo
// 1 = Ladrillo de Escudo
ImageMapper.Shield = function(){
    return [ 
        [1,0,0,1,0,1,1,1,0,1,1,1,0,0,0,0,1,1,1,0,1,1,1,0,1,0,1,0,1,0,0,1,0,1,1,0],
        [1,1,0,1,0,1,0,1,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,1,0,1,0,1,0,1],
        [1,1,1,1,0,1,0,1,0,0,1,0,0,0,0,0,1,1,0,0,1,0,1,0,1,0,1,0,1,1,1,1,0,1,0,1],
        [1,0,1,1,0,1,0,1,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1,0,1],
        [1,0,0,1,0,1,1,1,0,0,1,0,0,0,0,0,1,0,0,0,1,1,1,0,1,1,1,0,1,0,0,1,0,1,1,0]
    ];
};
</pre>

Los aliens, cada ladrillo del escudo, la nave y los disparos también son arreglos &#8230; 

<pre class="brush: jscript; title: ; notranslate" title="">// JSON array para el Alien Cangrejo
// 0 = transparente | 1 = estático | 2 y 3 = estados de animación
ImageMapper.AlienCrab = function(){
    return [
        [0,0,1,0,0,0,0,0,1,0,0],
        [3,0,0,1,0,0,0,1,0,0,3],
        [3,0,0,1,0,0,0,1,0,0,3],
        [3,0,1,1,1,1,1,1,1,0,3],
        [3,0,1,0,1,1,1,0,1,0,3],
        [3,1,1,1,1,1,1,1,1,1,3],
        [2,1,1,1,1,1,1,1,1,1,2],
        [2,0,1,1,1,1,1,1,1,0,2],
        [2,0,1,1,1,1,1,1,1,0,2],
        [2,0,1,0,0,0,0,0,1,0,2],
        [2,0,1,0,0,0,0,0,1,0,2],
        [0,3,0,2,2,0,2,2,0,3,0]
    ];
};
</pre>

&#8230; pero claro, todo iba muy bien hasta que empecé a tener muchas instancias *volando* por cada objeto dibujable. Digamos que tenia que dibujar bloque por bloque por cada elemento y rápidamente la performance se me fue al pozo.

Es ahí cuando empecé a investigar como podría mejorar eso sin tener que crearme los sprites (imágenes por cada elemento) y descubrí el ***canvas.toDataURL(&#8220;image/png&#8221;)***. Para mi magia personal, eso nos devuelve un data con toda la imagen en texto, por lo que entonces solucioné la performance generando las imagenes antes de comenzar el juego y despues simplemente usandolas.

Una cosa llevó a la otra y terminé armando una pequeña librería para hacer lo mismo mas simple. En estos días voy a postearla &#8230;. pero mientras tanto &#8230; a matar aliens! 

Les dejo los fuentes y como usarlo en <a href="https://github.com/pjnovas/invaders404" title="Fuente" target="_blank">github</a>, está de más decir que son libres de hacer un FORK, modificarlo a su gusto y usarlo <img src="http://fernetjs.com/wp-includes/images/smilies/simple-smile.png" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" />