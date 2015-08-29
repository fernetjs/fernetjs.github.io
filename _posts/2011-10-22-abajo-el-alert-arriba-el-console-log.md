---
title: Abajo el alert, arriba el console.log!
author: pjnovas
layout: post
permalink: /2011/10/abajo-el-alert-arriba-el-console-log/
dsq_thread_id:
  - 505581222
categories:
  - Client Side
tags:
  - console
  - debugging
---
Hace ya un tiempo que venimos utilizando los add-ons de los explorers ya sea para inspeccionar el HTML, el CSS, debuggear javascript o hacer pruebas en la consola. Lo cierto es que tienen mucho mas poder del que, por lo menos yo, conozco.

Conocer el estado de variables o utilizar en modo &#8220;log&#8221; disparando alert() desde javascript puede ser bastante pesado.

Vamos a ver como utilizar el console.log(); y evitar el alert() &#8230;

Para los que no lo utilizan la consola, tenemos distintas opciones para abrirla:

  *     IE (desde el 7) presionar F12
  *     Mozilla, luego de agregar el Add-on <a title="FireBug" href="http://getfirebug.com/" target="_blank">FireBug</a>, presionar F12
  *    Chrome presionar F12

<!--more-->


Luego de tener abierta la consola es bastante simple &#8230; lo que hacemos es escribir en nuestro javascript console.log(&#8216;texto a la consola&#8217;);



Simplemente abran la consola, comprueben que esten parados en el tab **Console** y ejecuten el jsFiddle. Podrán ver que se logea el mensaje.
