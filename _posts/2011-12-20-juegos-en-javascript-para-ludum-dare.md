---
title: Juegos en javascript para el Ludum Dare 22
author: matiasarriola
layout: post
permalink: /2011/12/juegos-en-javascript-para-ludum-dare/
dsq_thread_id:
  - 510530794
categories:
  - Client Side
tags:
  - canvas
  - juegos
  - LD48
---
Como amante de los juegos, del arte, de la programación, de javascript, no pude resistirme a escribir sobre esto. Esperemos que haya gente que no se pueda resistir a leerlo, o al menos a saltar más abajo y probar alguno de los juegos.

<span class="Apple-style-span" style="font-size: 20px; font-weight: bold;">El concurso</span>

Para los que no lo conocen, Ludum Dare es un concurso internacional cuyo objetivo es desarrollar un juego en 48 horas. Se define una fecha, en esa fecha se define una temática para el juego, y los concursantes arrancan con el desarrollo del mismo. La competencia es individual, la tecnología es a libre elección. Premios? Cuanto dinero hay en el medio? &#8211; No, el ganador no gana plata. el objetivo principal de todo esto es incentivar a los desarrolladores a arrancar un juego y terminarlo. Más allá de eso, lo más valorable: la experiencia vivida, la oportunidad para aprender nuevas tecnologías, y la posibilidad de tener una idea armada que sirva como puntapié para seguir desarrollando luego del concurso. [existen casos de juegos que más tarde fueron distribuidos en las appstore, etc.]

El último concurso arrancó el día 16 y terminó el 18 de diciembre ( aunque hay variantes del concurso (el jam), para más info visiten <a title="Reglas Ludum Dare" href="http://www.ludumdare.com/compo/rules/" target="_blank">la página</a> ). Paréntesis anidados, qué bueno. Para darse una idea de la popularidad del concurso, hubieron más de 700 juegos que fueron submitidos, de todo tipo, respetando la temática que en esta ocasión fue &#8220;alone&#8221; (solo). Ya están [disponibles][1] para ser jugados y calificados por los participantes mismos.

## Los juegos

Hice una recopilación de los juegos basados en javascript / HTML / Canvas que se submitieron, algunos están más terminados que otros, pero tengan en cuenta que fueron hechos en menos de 48hs, incluyendo gráficos y sonidos. En número, no son muchos comparados con el total de juegos, pero claramente se vé el aumento del uso y del interés sobre la plataforma web para el desarrollo de juegos (pueden comprobarlo visitando concursos anteriores).

<!--more-->Aquí está la lista: [ el orden de los juegos se basa en una combinación de azar y gustos personales/cuestionables]

<ul style="list-style-type: none;">
  <li>
    <div style="display: block; height: 270px;">
      <h3>
        A ninja
      </h3>
      
      <p>
        <img class="alignleft size-full wp-image-1124" title="A Ninja" src="//fernetjs.com/wp-content/uploads/2011/12/aNinja.jpg" alt="A Ninja Screenshot" width="315" height="237" />
      </p>
      
      <p>
        Juego bastante entretenido, muy bien logrado para mi gusto, jugabilidad, las físicas, la sencillez.
      </p>
      
      <p style="text-align: right;">
        <a href="http://frozenfractal.com/play/ninja/">Jugar</a> – <a href="http://frozenfractal.com/play/ninja/main.js">Código</a> – <a href="http://www.ludumdare.com/compo/ludum-dare-22/?action=preview&uid=7882">Entrada original</a>
      </p>
    </div>
  </li>
  
  <li>
    <div style="display: block; height: 270px;">
      <h3>
        I was here
      </h3>
      
      <p>
        <img class="alignleft size-full wp-image-1125" title="IwasHere" src="//fernetjs.com/wp-content/uploads/2011/12/IwasHere.jpg" alt="I was here Screenshot" width="315" height="232" />
      </p>
      
      <p>
        Concepto bastante original!! Me enganchó como por media hora, excelente! Incluye una implementación de raycasting bastante interesante.
      </p>
      
      <p>
        <a href="http://dl.dropbox.com/u/4936312/LD22/index.html">Jugar</a> – <a href="https://github.com/cboissie/HTML5-JS-Stuff/">Código</a> – <a href="http://www.ludumdare.com/compo/ludum-dare-22/?action=preview&uid=6851">Entrada original</a>
      </p>
    </div>
  </li>
  
  <li>
    <div style="display: block; height: 280px;">
      <h3>
        Space Ghost
      </h3>
      
      <p>
        <img class="alignleft size-full wp-image-1127" title="SpaceGhost" src="//fernetjs.com/wp-content/uploads/2011/12/SpaceGhost.jpg" alt="Space ghost screenshot" width="315" height="236" />
      </p>
      
      <p>
        Juego donde disparas misiles para matar a un fantasma. Controles? La fórmula matemática que describe la trayectoria del misil. Se pueden usar variables temporales, o incluso acceder a funciones de Math como Math.tan(). Para ver el código del juego, basta con ver el codigo de fuente de la página en el navegador, no esta ofuscado ni minificado.
      </p>
      
      <p>
        <a href="http://madmaw.com/alone/index.html">Jugar</a> – <a href="http://www.ludumdare.com/compo/ludum-dare-22/?action=preview&uid=5068">Entrada original</a>
      </p>
    </div>
  </li>
  
  <li>
    <div style="display: block; height: 260px;">
      <h3>
        Lone Kitty
      </h3>
      
      <p>
        <img class="alignleft size-full wp-image-1126" title="LoneKytten" src="//fernetjs.com/wp-content/uploads/2011/12/LoneKytten.jpg" alt="Lone Kitty Screenshot" width="193" height="208" />
      </p>
      
      <p>
        Usa audio de HTML5 e implementa <a href="http://excanvas.sourceforge.net/">exCanvas</a>, que permite que el juego funcione bajo internet explorer.
      </p>
      
      <p>
        <a href="http://lorancou.free.fr/bulk/lonekitty/">Jugar</a> – <a href="https://github.com/lorancou/lonekitty/">Código</a> – <a href="http://www.ludumdare.com/compo/ludum-dare-22/?action=preview&uid=8588">Entrada original</a>
      </p>
    </div>
  </li>
  
  <li>
    <h3>
      The square<br /> <span class="Apple-style-span" style="font-size: 13px; font-weight: normal;">Juego inspirado en la película “El cubo”. Tiene puzzles y se deja jugar.<br /> </span><a style="font-size: 13px; font-weight: normal;" href="http://softwarebakery.com/frozencow/ludum22/">Jugar</a><span class="Apple-style-span" style="font-size: 13px; font-weight: normal;"> – </span><a style="font-size: 13px; font-weight: normal;" href="http://softwarebakery.com/frozencow/ludum22/source.tar.bz2">Código</a><span class="Apple-style-span" style="font-size: 13px; font-weight: normal;"> – </span><a style="font-size: 13px; font-weight: normal;" href="http://www.ludumdare.com/compo/ludum-dare-22/?action=preview&uid=8588">Entrada original</a>
    </h3>
  </li>
  
  <li>
    <h3>
      Iron santa<br /> <span class="Apple-style-span" style="font-size: 13px; font-weight: normal;">Bastante sencillo, muy corto, con un toque humorístico, pero bueno, capaz sirve para ver como implementa </span><a style="font-size: 13px; font-weight: normal;" href="http://jawsjs.com/">jawjs<br /> </a><a style="font-size: 13px; font-weight: normal;" href="http://memetika.com/iron_santa/ludum-dare-22/">Jugar</a><span class="Apple-style-span" style="font-size: 13px; font-weight: normal;"> – </span><a style="font-size: 13px; font-weight: normal;" href="https://github.com/dmitrizagidulin/IronSanta/tree/0e7cc41b96c755bab8e2ae341cc19f963395f6ba">Código</a><span class="Apple-style-span" style="font-size: 13px; font-weight: normal;"> – </span><a style="font-size: 13px; font-weight: normal;" href="http://www.ludumdare.com/compo/ludum-dare-22/?action=preview&uid=7625">Entrada original</a>
    </h3>
  </li>
  
  <li>
    <h3>
      No mother alone<br /> <span class="Apple-style-span" style="font-size: 13px; font-weight: normal;">Prototipo bastante sencillo donde te perdés en el supermercado y tenés que buscar a tu mamá. (para jugarlo bajar el código)<br /> </span><a style="font-size: 13px; font-weight: normal;" href="https://github.com/brodavi/No-Mother-Alone">Código</a><span class="Apple-style-span" style="font-size: 13px; font-weight: normal;"> – </span><a style="font-size: 13px; font-weight: normal;" href="http://www.ludumdare.com/compo/ludum-dare-22/?action=preview&uid=8067">Entrada original</a>
    </h3>
  </li>
  
  <li>
    <h3>
      Midnight Runner<br /> <span class="Apple-style-span" style="font-size: 13px; font-weight: normal;">Tambien usa jawjs. No me funcionó bajo chromium 15, aparentemente hay algun problema en el código al crear el menú; pero creo que merece su lugar por incluir el código.<br /> </span><a style="font-size: 13px; font-weight: normal;" href="http://www.ludumdare.com/compo/ludum-dare-22/?action=preview&uid=3407">http://www.ludumdare.com/compo/ludum-dare-22/?action=preview&uid=3407</a>
    </h3>
  </li>
</ul>

### Otros  
<span class="Apple-style-span" style="font-size: 13px; font-weight: normal;">Por otro lado, no pude probar </span><a style="font-size: 13px; font-weight: normal;" href="http://www.ludumdare.com/compo/ludum-dare-22/?action=preview&uid=8158">Forgotten Memories</a><span class="Apple-style-span" style="font-size: 13px; font-weight: normal;">, pero promete bastante. Usa WebGl y PHP y MySQL como backend. Todos los juegos incluídos en este artículo fueron obtenidos de <a href="http://www.ludumdare.com/compo/ludum-dare-22/?action=preview&q=javascript">http://www.ludumdare.com/compo/ludum-dare-22/?action=preview&q=javascript</a> (hay un par mas que no están incluídos acá). </span>

## Cerrando

Dentro de la página de Ludum Dare se pueden ver montones de relatos de distintas personas, retrospectivas, comentarios técnicos, screencasts que son muy interesantes, tal vez no acerca de javascript, pero del proceso de desarrollo en sí mismo.

Al leer los comentarios de la gente que trabajó en los juegos presentados antes, muchos de ellos hicieron por primera vez un juego en javascript, pero lo lograron dentro del plazo establecido. Esto es algo muy valorable, y que nos deja pensando: &#8220;Si esto se puede hacer en menos de dos diías, ¿Qué se puede hacer con más tiempo?¿Y conociendo de antemano las tecnologías? ¿webgl?&#8221;.

El ecosistema que existe dentro de un browser, ya sin la necesidad de nombrar plugins (llámese flash, silverlight, etc.), demuestra cierto grado de madurez como plataforma para gaming. Ni pensar en un futuro cercano, con cosas que están tocando la puerta, como son la [fullscreen API][2] y la [gamepad API][3].

En mi caso, esto me trajo toda la motivación para prepararme para el Ludum Dare de Abril del 2012; lo mejor es que hay muchas cosas para aprender, desde el manejo avanzado de canvas, pasando por [animaciones][4], hasta cómo implementar físicas!

 [1]: http://www.ludumdare.com/compo/ludum-dare-22/ "Catálogo de juegos Ludum Dare 22"
 [2]: http://www.google.com.ar/search?q=fullscreen+api "Buscar fullscreen api"
 [3]: http://www.google.com.ar/search?q=gamepad+API "buscar gamepad api"
 [4]: http://fernetjs.com/2011/12/animando-en-canvas-html5/ "Animando en CANVAS – HTML5"