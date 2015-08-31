---
layout: post
title: "Y un día el sitio se renovó"
date: "2015-08-31 18:19"
description: |
  Nuevo sitio para fernetjs!
author: matiasarriola
categories:
  - General
tags:
  - fernetjs
  - meta
---
Desde hace bastante teníamos ganas de mover el sitio. De tanto en tanto alguien recordaba o descubría fernetjs y nos preguntaba si murió. La respuesta era más que nada que no, pero que *colgamos* y *no tenemos tiempo*.
Si hay algo que siempre seguimos haciendo y nos gusta es el javascript (y también el fernet), así que este es un intento por dejar de *colgar* y arrancar a *escribir-aprender-compartir-etc* un poco más.

La migración fué desde wordpress (estaba alojado en dreamhost en un shared hosting) a [jekyll][1] (corriendo directo [sobre github pages][2]). La idea no es contar sobre cómo fue el proceso de migración (*tal vez* lo hagamos más adelante), ya que hay bocha de artículos sobre el tema dando vueltas por ahí. Lo que quería con este post era por un lado avisar que el sitio había cambiado y seguía vivo; y por otro comentar los motivos y cómo nos afecta este cambio:

### Pros
  * **Colaboración!!** : Todo el código está [disponible en github][3]. Quien quiera puede colaborar con posts o fixes en el sitio via pull requests, tener/dar feedback a través de los issues, etc.. Sin dudas esta es la ventaja más grosa de todas!
  * Simplicidad: Acá no hay versiones o plugins vulnerables que actualizar, bases de datos que mantener, manejar registro de usuarios, etc.
  * $$$: Usar github pages es totalmente gratis, así que esto nos permite prescindir de cualquier gasto que el shared hosting generaba.
  * Performance: nuestro wordpress estaba lleno de cosas innecesarias. Todo eso corriendo en un plan de shared hosting medio pelo, obviamente iba a ser mucho más lento que servir contenido estático a través de github pages.
  * Escribir en [markdown][4]
  * Lavada de cara. Está un poco mejor que antes. no? ¡no?

### Contras (aunque no tanto)
  * No hay server. De todas maneras, en fernetjs no era totalmente necesario, ya que estábamos con disqus en los comentarios, y no más procesamiento del lado del servidor.
  * Todo más "a mano": Lo que querramos agregar, tiene que ser desarrollado, mientras que en wordpress puede ser buscar un plugin y darle install. Y como usamos gh pages, no se pueden usar plugins de jekyll fuera de [los permitidos][5].
  * No es js: Hubiera quedado "épico" si la plataforma a la que nos movíamos corría sobre nodejs directamente. En un princio la idea era moverse a [ghost][6], pero luego desistí porque iba a incurrir en nuevos gastos de mantenimiento, le faltaba funcionalidad para facilitar la colaboración, etc..
  Después hay [varios][7], [y muy buenos][8] [generadores][9] [de contenido estático][10] en node, aunque terminamos optando por no usarlos para evitar tener que hacer los builds a mano (github pages puede funcionar automáticamente con jekyll, el contenido se buildea en cada push).

Obviamente todo esto es un análisis de nuestro caso en particular y no se trata de *`x` es mejor que `y`*.

El mundo de javascript cambió bastante desde el momento en el que posteábamos regularmente, ahora hay millones de cosas de las que hablar, así que ojalá todos estos cambios funcionen y vengan bien de cara a futuro.

  [1]: http://jekyllrb.com/
  [2]: https://help.github.com/articles/using-jekyll-with-pages/
  [3]: https://github.com/fernetjs/fernetjs.github.io
  [4]: https://daringfireball.net/projects/markdown/syntax
  [5]: https://help.github.com/articles/using-jekyll-plugins-with-github-pages/
  [6]: https://github.com/tryghost/Ghost
  [7]: http://assemble.io/
  [8]: http://wintersmith.io/
  [9]: https://hexo.io/
  [10]: https://docpad.org/
