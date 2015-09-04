---
title: 'Dibujando en CANVAS &#8211; HTML5'
author: pjnovas
layout: post
permalink: /2011/11/dibujando-en-canvas-html5/
dsq_thread_id:
  - 497142013
categories:
  - Client Side
  - Performance
tags:
  - canvas
migration_issue: highlightline
---
Canvas de HTML5 es simplemente un TAG, un contenedor en donde vamos a dibujar ya sea desde líneas, cuadrados y círculos hasta imágenes y texto. Aparte de tener el poder de dibujar tenemos otra ventaja &#8230; no utilizamos el DOM, es decir, si tuviéramos que realizar lo mismo con divs, spans, etc. por cada elemento vamos a estar utilizando el DOM y re-flows del explorador, pero dentro de canvas no se va a crear un elemento DOM para lo que dibujemos (ojo que al no tener DOM tampoco tenemos eventos como mouseover, click, etc. por cada elemento que dibujemos, pero si por todo el tag canvas).

### Compatibilidad

Hay que tener en cuenta que al ser HTML 5 no va a funcionar en cualquier explorador viejo:

<div id="attachment_692" style="width: 936px" class="wp-caption alignnone">
  [fuente: <a href="http://caniuse.com">Can I Use</a>]<a href="http://www.fernetjs.com/wp-content/uploads/2011/11/canvas_table.jpg"><img class="size-full wp-image-692" title="Compatibilidad de CANVAS - HTML5" src="//www.fernetjs.com/wp-content/uploads/2011/11/canvas_table.jpg" alt="Compatibilidad de CANVAS - HTML5" width="926" height="161" /></a>
  
  <p class="wp-caption-text">
    Compatibilidad de funciones básicas con exploradores
  </p>
</div>

> Si necesitamos que funcione en IE, hay algunas opciones para lograr el soporte, les dejo la de Google: <a title="Explore Canvas" href="http://code.google.com/p/explorercanvas/" target="_blank">Explore Canvas</a> 

### Configurando

{% highlight xml %}
<canvas id="miCanvas" width="145px" height="145px">
 <span>Tu explorador es anciano, renovalo si queres ver la magia</span>
</canvas>
 {% endhighlight %}

Tan simple como eso, agregamos al html el tag *<canvas>* y seteamos el tamaño. Noten que ingrese el tamaño como atributo del tag y no como CSS, es importante hacerlo así ya que en algunos exploradores no funciona bien si lo hacemos por CSS. 

> Si no asignamos el *width* o *height*, por default cada uno es 160px. 

El contenido dentro de los tags se va a mostrar si el explorador desconoce lo que significa el tag canvas (tambien se puede poner html, no solo texto).

Para comenzar a dibujar obtenemos el contexto del canvas en javascript:  
<!--more-->

<!--highlight:[2]-->
{% highlight js %}
var canvas = document.getElementById('miCanvas');
var contexto = canvas.getContext('2d');
 {% endhighlight %}

### Dibujando

Para hacerlo más divertido, vamos a recrear el logo de FernetJS en canvas:

Comencemos por dibujar el cuadrado amarillo del fondo:

{% highlight js %}
var canvas = document.getElementById('miCanvas');
var contexto = canvas.getContext('2d');

// le damos un color de llenado al contexto
contexto.fillStyle = '#F0DB4F';

// dibujamos un cuadrado con el color de llenado
contexto.fillRect(0, 10, 145, 145); // fillRect(x, y, largo, alto)

// le damos al contexto un tamaño y color de linea
contexto.lineWidth = 3;
contexto.strokeStyle = 'black';

// dibujamos un cuadrado pero solo de contorno
contexto.strokeRect(1, 10, 143, 134); // strokeRect(x, y, largo, alto)
 {% endhighlight %}

[<img class="alignnone size-full wp-image-742" title="ref 1" src="//www.fernetjs.com/wp-content/uploads/2011/11/logo_canvas1.png" alt="" width="145" height="145" />][1]

Ahora dibujemos el &#8216;JS&#8217;, lo voy a escribir en el canvas para mostrarles que se puede, pero el método que voy a utilizar de dibujar texto tiene graves problemas de performance, es preferible hacer una imagen o una imagen por letra y dibujar la/s imagen/es (como en los viejos, pero muy viejos tiempos).

{% highlight js %}
// cambiamos el color de llenado del contexto
contexto.fillStyle = '#333';

// asignamos al contexto el tipo de letra, tamaño y posicion inicial
contexto.font = 'bold 64px sans-serif';
contexto.textBaseline = 'top';

// dibujamos el texto
contexto.fillText('JS', 2, 5); // fillText(texto, x, y);
 {% endhighlight %}

[<img class="alignnone size-full wp-image-743" title="ref 2" src="//www.fernetjs.com/wp-content/uploads/2011/11/logo_canvas2.png" alt="" width="145" height="145" />][2]

Como se darán cuenta a esta altura, el contexto tiene propiedades que son aplicadas al momento de dibujar un elemento. Por ejemplo *contexto.fillStyle*, ese valor lo podríamos asignar al principio de un set de dibujos y todos van a ser aplicados con el mismo color de fondo. Esto pasa con varias propiedades, *.font*, *.strokeStyle*, *.lineWidth*, etc.

Pero qué pasa si tenemos el siguiente escenario?:

  1. Seteo un estilo
  2. Dibujo con ese estilo
  3. Seteo otro estilo
  4. Dibujo con el nuevo estilo
  5. Necesito el primer estilo para dibujar algo nuevo

En el último paso deberíamos volver a ejecutar el código (repetirnos) para setearle al contexto el estilo que teníamos antes. Bueno, hay dos funciones que nos ayudan en eso:

<!--highlight:[4,9]-->
{% highlight js %}
contexto.fillStyle = 'blue';
contexto.fillRect(10, 10, 10, 10);  // Dibujo cuadrado azul

contexto.save(); //Guardo el fillStyle = 'blue'

contexto.fillStyle = 'red'; // Lo cambio a rojo
contexto.fillRect(20, 20, 10, 10); // Dibujo cuadrado rojo

contexto.restore(); //Recupero el fillStyle = 'blue'

contexto.fillRect(30, 30, 10, 10);  // Dibujo cuadrado azul
 {% endhighlight %}

Con las functiones *.save()* y *.restore()* podemos guardar y recuperar configuraciones de nuestro contexto y sí, se pueden anidar, es decir con 2 veces *.save()* y 2 veces *.restore()* vuelvo al primer estado.

Volviendo con el dibujo del logo, vamos a *estirar* la palabra JS, pero para esto vamos a tener que escalar el contexto y en este momento sería útil guardar la configuración de contexto actual, así que vamos a editar donde dibujamos la palabra:

<!--highlight:[2,5,14]-->
{% highlight js %}
// me guardo la configuración de contexto actual
contexto.save();

// escalo el contexto (amplío)
contexto.scale(1.8, 2.4);  //.scale(ancho, alto)

// dibujo la palabra JS, pero ahora con la escala
contexto.fillStyle = '#333';
contexto.font = 'bold 64px sans-serif';
contexto.textBaseline = 'top';
contexto.fillText('JS', 2, 5);

// recupero la configuracion del contexto guardada con .save()
contexto.restore();
 {% endhighlight %}

[<img class="alignnone size-full wp-image-744" title="ref 3" src="//www.fernetjs.com/wp-content/uploads/2011/11/logo_canvas3.png" alt="" width="145" height="145" />][3]

De esta forma continuamos dibujando después del *.restore()* y la configuración del contexto que aplicamos para la palabra JS se eliminó.

Ahora vamos a dibujar la imagen del vaso en el canvas, esta es nuestra imagen:  
[<img class="alignnone size-full wp-image-739" title="ref " src="//www.fernetjs.com/wp-content/uploads/2011/11/glassup.png" alt="" width="145" height="145" />][4]

<!--highlight:[5]-->
{% highlight js %}
var vaso = new Image();
vaso.onload = function() {

    //.drawImage(imagen, x, y);
    contexto.drawImage(vaso, 0, 0);
};
vaso.src = "[URL DE LA IMAGEN]";
 {% endhighlight %}

[<img class="alignnone size-full wp-image-745" title="ref 4" src="//www.fernetjs.com/wp-content/uploads/2011/11/logo_canvas4.png" alt="" width="145" height="145" />][5]

Primero creamos un objeto *Image()* de javascript, que es básicamente DOM, como lo genera el explorador cuando agregamos un tag *<img>* en el HTML. Luego me suscribo al evento *onload* para asegurarme que la imagen esté cargada antes de dibujarla en el canvas.  
La función .drawImage() tiene muchas &#8220;sobrecargas&#8221;, use las más simple de todas.  
El parámetro de imagen también puede recibir una imagen embebida del tipo: &#8216;data:image/gif;base64,R0lGODlhCwA &#8230;&#8217;, lo cual nos viene genial ya que no necesitamos esperar a que se descargue porque al ser texto ya lo bajamos junto con el archivo js.

Lo último que nos quedaría es dibujar las líneas para enfatizar el vaso. Esas líneas las podemos pensar como triángulos, y para dibujarlos tenemos que armar un *path*:

<!--highlight:[5,17,20]-->
{% highlight js %}
// seteo el estilo de llenado del contexto a negro.
contexto.fillStyle = 'black';

// comienzo un path
contexto.beginPath();

// muevo el puntero para empezar en (80,25)
contexto.moveTo(80,25);  // [1] en la imagen

// dibujo una línea hasta (115,10)
contexto.lineTo(115,10); // [2] en la imagen

// dibujo otra línea desde el último punto hasta (125,10)
contexto.lineTo(125,10);  // [3] en la imagen

// cierro el path, lo cual genera la última línea
contexto.closePath();

// lleno el path con el color negro
contexto.fill();
 {% endhighlight %}

[<img class="alignnone size-full wp-image-746" title="ref 5" src="//www.fernetjs.com/wp-content/uploads/2011/11/logo_canvas5.png" alt="" width="445" height="165" />][6]

Bastante bien, no?, bueno después simplemente realizamos los otros triángulos y nos queda el logo terminado:

[<img class="alignnone size-full wp-image-747" title="ref 6" src="//www.fernetjs.com/wp-content/uploads/2011/11/logo_canvas6.png" alt="" width="145" height="145" />][7]

Les dejo un jsFiddle con el código completo por si quieren modificarlo y hacer pruebas  


Hay muchísimo más por explorar en lo que respecta a CANVAS, pero es un buen punto de partida conocer de que se trata y sus funciones básicas.

 [1]: http://www.fernetjs.com/wp-content/uploads/2011/11/logo_canvas1.png
 [2]: http://www.fernetjs.com/wp-content/uploads/2011/11/logo_canvas2.png
 [3]: http://www.fernetjs.com/wp-content/uploads/2011/11/logo_canvas3.png
 [4]: http://www.fernetjs.com/wp-content/uploads/2011/11/glassup.png
 [5]: http://www.fernetjs.com/wp-content/uploads/2011/11/logo_canvas4.png
 [6]: http://www.fernetjs.com/wp-content/uploads/2011/11/logo_canvas5.png
 [7]: http://www.fernetjs.com/wp-content/uploads/2011/11/logo_canvas6.png