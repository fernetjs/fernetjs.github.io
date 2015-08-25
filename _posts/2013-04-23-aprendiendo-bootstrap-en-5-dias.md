---
title: Aprendiendo Bootstrap en 5 días
author: Claudia Blatter
layout: post
permalink: /2013/04/aprendiendo-bootstrap-en-5-dias/
dsq_thread_id:
  - 1231183862
categories:
  - Utilidades
tags:
  - bootstrap
---
Hola comunidad !

Somos un equipo de desarrollo que estos días tuvo el desafío de aprender bootstrap en 5 días. Qué resultó? Acá va nuestra experiencia:

**El primer día**

  1. Entendimos que nuestro cliente nos pedía que las pantallas web empiecen a ser responsive y hoy no lo son. Así que el desafío fue tomar la maqueta del cliente (maqueta.png) y hacer la pantalla desde cero y responsive!
  2. Aprendimos que responsive significa que la página se adapta al ancho del dispositivo (monitor, ipad, iphone, etc).
  3. Y que [Bootstrap][1] es un framework que con HTML y CSS, facilita la definición de un layout de páginas web, y además, te da la posibilidad de que tus páginas sean responsive.
  4. Empezamos a armar la estructura de la página con el concepto que, por defecto, Bootstrap usa 12 columnas imaginarias en un ancho de 940 pixeles.
  5. Usamos [Collorzilla][2] para obtener los colores de la maqueta y MeasureIt para obtener las medidas.
  6. Conseguimos un html con un montón de div porque la maqueta tiene unas cuantas divisiones!

**El segundo día**

  1. La página que tenemos ya es responsive.
  2. Discutimos un poco acerca de las nomenclaturas para los nombres de las clases de estilo y acordamos que tengan el prefijo del proyecto cuando son clases propias (p.e. pnt-home).
  3. Nos organizamos para trabajar en 2 parejas de trabajo.
  4. Una pareja decidió avanzar de a bloques y otra decidió armar primero la página y luego estilarla.
  5. Bootstrap no nos ayudó en el diseño y si nos facilitó para que sea responsive.
  6. Fundamental que cada bloque que usamos para el layout de la página tiene que tener row y/o span, y los estilos se aplican al contenido, no antes!

**El tercer día**

  1. Bootstrap significa autosuficiente, nada, para saber de dónde el nombre.
  2. Empezamos a paralelizar el laburo de diseño.
  3. Y a usar componentes propios de Bootstrap como dropdown, tabs, pills.
  4. Vemos que Bootstrap va bien para páginas con pocas secciones y con muchas subdivisiones se complican los márgenes predefinidos de la página.

**El cuarto día**

  1. Bootstrap nos ayuda a utilizar los elementos HTML para lo que fueron creados.
  2. Se nos complica imitar formatos de la maqueta inicial.

**El quinto día**

  1. Incorporamos [Font Awesome][3] para que los íconos y letras sean escalables y de calidad, altamente recomendable!
  2. Usamos responsive navbar para que la página convierta una fila de títulos en opciones de menú cuando achicas la pantalla.
  3. Terminamos el desafío haciendo una demo de lo logrado.

Una forma simpática de aprender en equipo.

 [1]: http://twitter.github.io/bootstrap/
 [2]: http://www.colorzilla.com/
 [3]: http://fortawesome.github.io/Font-Awesome/