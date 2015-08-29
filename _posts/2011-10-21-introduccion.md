---
title: Introducción
author: pjnovas
layout: post
permalink: /2011/10/introduccion/
dsq_thread_id:
  - 505448654
categories:
  - Lenguaje
tags:
  - DOM
---
***Que es el DOM?***  
*Document Object Model: Modelo de Objetos del Documento HTML, piensenlo como que cada tag de HTML se encuentra como una instancia en memoria del explorador. Es la representacion de todo nuestro HTML en objetos en memoria, asi es como los podemos utilizar y modificarles el estado desde javascript. De ahi vienen las clasicas malas experiencias con javascript, lo usamos para modificar el estado del DOM, haciendo &#8220;scripting&#8221; (pequeños algoritmos) para animar algo o darle mejor experiencia al usuario. El problema de esto es que el explorador necesita &#8220;refrescar&#8221; la representacion de nuestro DOM, cada vez que cambiamos un estado causamos lo que se llama un Re-Flow y todo esto lleva tiempo de ejecucion, uso de memoria y malas experiencias.*

&nbsp;