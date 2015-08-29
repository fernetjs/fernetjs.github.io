---
title: El juego de la vida en JS
author: lucasromero
layout: post
permalink: /2012/03/el-juego-de-la-vida-en-js/
dsq_thread_id:
  - 628146529
categories:
  - Client Side
  - General
tags:
  - gameoflife
  - gameoflifejs
  - johnConway
---
El juego de la vida no es un juego en donde hay jugadores, ganadores ni perdedores al menos desde su forma más básica. Es un ejemplo de un [autómata celular][1] diseñado por **[John Conway][2]** que se desenvuelve en una grilla de celdas cuadradas que se extiende hacia el infinito en todas las direcciones. Una celda puede estar &#8216;viva&#8217; o &#8216;muerta&#8217;. La evolución del juego va a estar dada por las celdas que se establezcan como &#8216;vivas&#8217; en la transición &#8216;cero&#8217;, lo que sería el estado inicial del juego. En las transiciones posteriores la evolución se da por un conjunto de reglas en donde cada estado depende del número de celdas vivas, las reglas son:

&#8211; Una celda &#8216;muerta&#8217; con exactamente 3 celdas vecinas &#8216;vivas&#8217; &#8220;nace&#8221; (al turno siguiente estará viva).  
&#8211; Una celda &#8216;viva&#8217; con 2 ó 3 celdas vecinas &#8216;vivas&#8217; sigue viva, en otro caso muere o permanece muerta ya sea por soledad o sobrepoblación.

El estado de todas las células se tiene en cuenta para calcular el estado de las mismas al turno siguiente. Todas las células se actualizan simultáneamente. El hecho de que todas las celdas se actualicen simultáneamente hace que el desarrollo del juego se haya convertido en un desafío de programación para muchos y que otros adopten el patrón llamado &#8216;glider&#8217; del juego de la vida como un [emblema][3], tal es el caso de la cultura hacker.

Una expliación más detallada del juego de la vida y sus patrones la pueden encontrar acá en [inglés][4] y en [español ][5]siendo la que es en inglés más completa.

Acá les dejo un par de ejemplos del juego de la vida hecho en JS así como también una versión colaborativa hecha en node.js:

&#8211; <a href="http://www.granvino.com/jam/stuff/juegos/gamoliyas/spanish/index.htm?world=00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000110000000000000000000000000000000000000101000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000&width=40&height=20&speed=300&cellwidth=15&cellheight=15&cellpadding=2" width="382" height="378" scrolling="no" frameborder="0"">Juego en JS con ejemplo de glider </a>

&#8211; [Juego colaborativo en node.js][6]

&#8211; [Juego en JS con un universo más grande][7]

 [1]: http://es.wikipedia.org/wiki/Aut%C3%B3mata_celular "Qué es?"
 [2]: http://es.wikipedia.org/wiki/John_Conway "Mini Biografía"
 [3]: http://es.wikipedia.org/wiki/Emblema_hacker "Emblema Hacker"
 [4]: http://www.math.com/students/wonders/life/life.html "Explicación en inglés"
 [5]: http://es.wikipedia.org/wiki/Juego_de_la_vida "Explicación en Español"
 [6]: http://conwaymmo.com/ "Juego colaborativo"
 [7]: http://gmlive.narod.ru/download/live/version_0_3/gamelive.html "Super universo para probar patrones"