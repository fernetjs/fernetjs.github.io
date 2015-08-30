---
title: 'Animando sprites con HTML5: Canvas'
author: pjnovas
layout: post
permalink: /2013/06/animando-sprites-con-html5-canvas/
dsq_thread_id:
  - 1438355856
categories:
  - Client Side
tags:
  - animaciones
  - canvas
---
Siguiendo con la serie de posts de juegos en canvas, voy a continuar los posts anteriores (si no los viste: [Dibujando en CANVAS][1], [Animando en CANVAS][2], [Construyendo un Game Loop][3]).

Vamos a armar una animación utilizando Sprites. Que es un Sprite?, simplemente una imagen con distintos estados de un objeto en el cual mostrar de a uno y en orden se ve el objeto animado. Es decir, vamos &#8220;cortando&#8221; la imagen con cada objeto y al mostrar y ocultar en un muy corto tiempo se genera una animación.

Para el caso de este ejemplo me descargué un Sprite del ActionDoom desde [acá][4], que luego organicé un poco para que me sea mas simple manejarlo desde el javascript, quedando en lo siguiente:

[<img src="http://fernetjs.com/wp-content/uploads/2013/06/sprites-300x250.png" alt="sprites" width="300" height="250" class="size-medium wp-image-3688" />][5]

#### Seccionando el sprite

Para poder usarlo desde javascript, tenemos que pensar en una grilla virtual, lo que podemos traducir a una matriz de posiciones, mientras que cada celda tenga el mismo ancho y alto:

[<img src="http://fernetjs.com/wp-content/uploads/2013/06/sprites_grid1-300x250.png" alt="sprites_grid" width="300" height="250" class="size-medium wp-image-3700" />][6]

Ahora que tenemos nuestra grilla imaginaria, vamos a definir que celdas corresponden a cada estado, en este caso la separe que colores para que sea visible, siendo:

<div style="width:20px; height:20px; background:#a1a615; float: left; margin: 0 20px 0 0">
</div>

Libre

<div style="width:20px; height:20px; background:#a10000; float: left; margin: 0 20px 0 0">
</div>

Acción

<div style="width:20px; height:20px; background:#2a9811; float: left; margin: 0 20px 0 0">
</div>

Recarga

[<img src="http://fernetjs.com/wp-content/uploads/2013/06/sprites_grid_colors1-300x251.png" alt="sprites_grid_colors" width="300" height="251" class="size-medium wp-image-3709" />][7]

Todo listo, ahora armemos la matriz de referencia y animaciones en el código:

{% highlight js %}
// defino los tipos de armas que voy a tener
var armas = ['cuchillo', 'pistola', 'escopeta', 'grosa'];

// defino para cada arma donde están sus estados en la matriz
var sprites = {
    dimension: {
        ancho: 200,
        alto: 200
    },
    cuchillo: {
        libre: [0,0],
        accion: [[1,0],[2,0],[1,0]]
    },
    pistola: {
        libre: [0,2],
        accion: [[0,2],[1,2],[2,2],[3,2],[4,2],[5,2]],
        recarga: [[0,1],[1,1],[2,1],[3,1],[4,1],[0,1]]
    },
    escopeta: {
        libre: [0,3],
        accion: [[3,0],[4,0],[5,0]],
        recarga: [[1,3],[2,3],[3,3],[4,3],[5,3]]
    },
    grosa: {
        libre: [0,4],
        accion: [[1,4],[2,4],[3,4],[4,4],[5,4]]
    }
};
 {% endhighlight %}

Como se puede ver, hay celdas que se repiten y es la idea, es común que usemos una &#8220;celda&#8221; varias veces en la misma animación.

#### Animando en el Game Loop

La animación se produce sola, simplemente por cada paso del game loop (actualizar y dibujar), actualizamos las coordenadas en la imagen, borramos lo que hay y dibujamos uno nuevo.

Lo que hacemos primero es dejar el game loop corriendo, cuando el usuario presiona una tecla, guardamos que arma seleccionó y su estado:

{% highlight js %}
// Asignamos el callback al evento keypress
document.addEventListener('keypress', asignarArmaYEstado);

// estadoAnterior, estado y arma son variables globales 
// del módulo en el game loop.

function asignarArmaYEstado(evento){
  var codigo = evento.keyCode;
  // dependiendo del codigo asignamos el arma y el estado

  switch(codigo){
    case 97: // Letra A
        estadoAnterior = estado;
        estado = 'accion';
        break;
    case 114: // Letra R
        estado = 'recarga';
        break;

    // Números del 1 al 4
    case 49:
    case 50:
    case 51:
    case 52:
        arma = armas[codigo-49]; 
        break;
  }
}
 {% endhighlight %}

En la próxima corrida del actualizar en el game loop, nos fijamos cual es el arma y su estado actual, para actualizar la posición de la matriz:

{% highlight js %}
// la variable pos mantiene la posición a dibujar
// y es otra variable global del modulo en el game loop

function actualizar(){
  var x, y,
    sprite = sprites[arma][estado]; //la celda en la matriz

  // si recién cambio de estado, volvemos el índice a 0
  if (estado !== estadoAnterior){
    animContador = 0;
  }
  
  // si el índice es es el último no hay mas para animar,
  // así que volvemos el estado a "libre"
  if(animContador === sprite.length-1){
    estado = 'libre';
    sprite = sprites[arma][estado];
  }

  // si no es "libre", hay que seguir con la animación,
  // así que incrementamos el índice de la animación
  else if(estado !== 'libre') {
    sprite =  sprite[animContador];
    animContador++;
  }
  
  // calculamos cual es la x e y real en la imagen
  // partiendo de la posición de la "celda" y la dimensión de cada sprite
  x = sprite[0] * sprites.dimension.ancho;
  y = sprite[1] * sprites.dimension.alto;
  
  // asignamos las coordenadas para dibujar
  pos = {
    x: x,
    y: y,
    w: sprites.dimension.ancho,
    h: sprites.dimension.alto
  };   
}
 {% endhighlight %}

Por último al dispararse el dibujar, utilizamos el drawImage de canvas, pero con unas cuantas opciones mas para poder dibujar **sólo** la &#8220;celda&#8221; del estado y arma que queremos:

Para información sobre el drawImage, está muy bien explicado [acá][8]

{% highlight js %}
function dibujar(){
  //context.drawImage(<Objeto Image>, <X Sprite>, <Y Sprite>, <Ancho Sprite>, <Alto Sprite>, <X en Canvas>, <Y en Canvas>, <Ancho en Canvas>, <Alto en Canvas>);
  contexto.drawImage(imgSprites, pos.x, pos.y, pos.w, pos.h, 0, 0, pos.w, pos.h);
}
 {% endhighlight %}

Les dejo un Fiddle con el resultado (click adentro del fiddle para usar): <http://jsfiddle.net/pjnovas/4PvSm>

 [1]: http://fernetjs.com/2011/11/dibujando-en-canvas-html5/ "Dibujando en CANVAS – HTML5"
 [2]: http://fernetjs.com/2011/12/animando-en-canvas-html5/ "Animando en CANVAS – HTML5"
 [3]: http://fernetjs.com/2012/09/construyendo-un-game-loop/ "Construyendo un Game Loop"
 [4]: http://spriters-resource.com/pc_computer/actiondoom/sheet/30570
 [5]: http://fernetjs.com/wp-content/uploads/2013/06/sprites.png
 [6]: http://fernetjs.com/wp-content/uploads/2013/06/sprites_grid1.png
 [7]: http://fernetjs.com/wp-content/uploads/2013/06/sprites_grid_colors1.png
 [8]: http://www.html5canvastutorials.com/tutorials/html5-canvas-image-crop/