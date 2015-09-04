---
title: Feliz Navidad!
author: pjnovas
layout: post
permalink: /2013/12/feliz-navidad/
dsq_thread_id:
  - 2074309037
categories:
  - Client Side
  - WTF
tags:
  - canvas
  - html5
---
**Felicidades a todos los Ferneteos+Javascripteros!, les dejo una locura navideña y les cuento un poco como lo hice:**

<iframe style="width: 100%; height: 700px;" src="//jsfiddle.net/pjnovas/qJ585/embedded/result,js,html,css/" frameborder="1" width="600" height="700"></iframe>

[<img src="//fernetjs.com/wp-content/uploads/2013/12/santa_layers1.png" alt="santa_layers" width="800" height="600" class="size-full wp-image-3903" />][1]

Dividí las partículas (nieve) en 3 capas, entonces dibujo primero la capa de fondo, luego el santa, pero intercalando con una capa de nieve para darle mas realismo. De esas 3 capas de nieve una es la que tiene partículas con colisión, es decir, la capa amarilla dibuja las partículas que se quedan en el santa.

La animación trabaja con un loop como [este][2].  
La nieve son circulos con valores aleatorios, como su tamaño, velocidad en x e y, posición de inicio, radio, opacidad, etc. Todos los ciculos inician fuera del canvas y van teniendo una velocidad en y que los hace bajar hasta el fondo, cuando llegan simplemente los destruyo y los vuelvo a crear.

Para el efecto de la nieve que se queda en santa, lo que hice fue utilizar una colisión entre segmentos (también se puede usar con un polígono) y círculos, en este caso cada copo de nieve. Entonces, por cada actualización que hay en las partículas de esa capa, me fijo si colisiona con algun segmento de santa, si es así les pongo un tiempo y no las actualizo mas en posición, dando ese efecto de que se quedan en el lugar y luego de unos segundos siguen cayendo.

** Pueden ver los segmentos haciendo click en &#8220;mostrar/ocultar segmentos&#8221; en el fiddle.

Felicidades!

 [1]: http://fernetjs.com/wp-content/uploads/2013/12/santa_layers1.png
 [2]: http://fernetjs.com/2012/09/construyendo-un-game-loop/ "Construyendo un Game Loop"
