---
title: Construyendo un Game Loop
author: pjnovas
layout: post
permalink: /2012/09/construyendo-un-game-loop/
dsq_thread_id:
  - 833245352
categories:
  - Client Side
  - Utilidades
tags:
  - animaciones
  - canvas
  - modulos
  - requestAnimationFrame
migration_issue: highlightline
---
Hace tiempo que tengo ganas de armar este post, hay muchas formas de hacerlo, seguramente hay mejores. Está es una forma a la que llegué yo probando varias cosas y la queria compartir.  
Antes que nada, el propósito de este post es ir creando un Game Loop paso por paso intentando ver detalladamente cada aspecto para llegar al código final, lo que puede ser el alma de un juego en HTML5.

#### Temas

  1. [Que es el Game Loop?][1]
  2. [Encapsulando el juego][2]
  3. [Agregando Canvas de HTML5][3]
  4. [Actualizando y Dibujando][4]
  5. [Optimizando][5]
  1. [Canvas Buffer][6]
  2. [Request Animation Frame][7]

  6. [Conclusión][8]

* * *

#### <a name="1.1" style="text-decoration: none;">Que es el Game Loop?</a>

Dentro de la jerga gamer se le llama asi al ciclo en el que se basa todo el juego, un ciclo &#8220;cuasi&#8221; infinito por el cual el juego actualiza sus estados y se dibuja una y otra vez mientras este vive.

{% highlight js %}
var velocidad = 20;
function loop(){

  actualizar();
  dibujar();

  setTimeout(loop, velocidad);
}

loop();
 {% endhighlight %}

Lo anterior es una versión extremadamente reducida del game loop, básicamente tengo una funcion *loop* a la que se llama a sí misma cada 20 mili-segundos y es la encargada de primero actualizar los estados del juego y después dibujar.

> Para una explicación detallada del setTimeout te dejo [este post][9]

#### <a name="1.2" style="text-decoration: none;">Encapsulando el juego</a>

Para empezar a darle forma vamos a usar el [Patrón Módulo][10] y a mejorarlo.

{% highlight js %}
var juego = (function(){
  var timer,
    velocidad = 20;

  function actualizar() {
    //actualizo el estado
  }

  function dibujar() {
    //dibujo el estado
  }

  function loop(){
    actualizar();
    dibujar();

    timer = setTimeout(loop, velocidad);
  }

  return {
    iniciar: function() {
      loop();
    },
    detener: function() {
      clearTimeout(timer);
    }
  }

})();

juego.iniciar();
//juego.detener();

 {% endhighlight %}

La idea de usar este patrón es encapsular la funcionalidad del juego en un módulo, de esta manera cerrar el alcance y dejar lo que debería ser privado, como privado (en este caso el loop, actualizar y dibujar)  
Como se vé retornamos un objeto con el acceso a nuestro módulo, para poder iniciar o detener el juego.

#### <a name="1.3" style="text-decoration: none;">Agregando Canvas de HTML5</a>

Ahora, para hacerlo un poco mas *real*, vamos a meter un canvas, ya que es una excelente opción hoy en día al momento de desarrollar un juego con HTML5.

{% highlight xml %}
<canvas id="canvas" width="600px" height="600px">
  Tu explorador no soporta Canvas
</canvas>
 {% endhighlight %}

<!--highlight:[4,5,22,23,24,25,26,27,28,32]-->
{% highlight js %}
var juego = (function(){
  var timer,
    velocidad = 20,
    canvas,
    contexto;

  function actualizar() {
    //actualizo el estado
  }

  function dibujar() {
    //dibujo el estado
  }

  function loop(){
    actualizar();
    dibujar();

    timer = setTimeout(loop, velocidad);
  }

  function iniciarCanvas() {
      canvas = document.getElementById('canvas');
      if (canvas.getContext){
        contexto = canvas.getContext('2d');
      }
      else throw "canvas no soportado!";
  }

  return {
    iniciar: function() {
      iniciarCanvas();
      loop();
    },
    detener: function() {
      clearTimeout(timer);
    }
  }

})();
 {% endhighlight %}

Lo que hicimos fue agregar 2 variables dentro del alcance del módulo, uno para el canvas y otro para el contexto para poder referenciarlo desde la función dibujar. Creamos una función para iniciar y asignar las variables, y agregamos la llamada a esa función al momento de iniciar el juego.

> Te recomiendo unos posts si no estas familiarizado con Canvas: [Dibujando][11] y [Animando][12]

#### <a name="1.4" style="text-decoration: none;">Actualizando y Dibujando</a>

Para completarlo vamos a hacer que realmente funcione con algo, como ejemplo hacer que dibuje y mueva un cuadrado cuando el usuario presiona las flechas.

Primero agregamos las 2 variables que vamos a usar para conocer la tecla presionada y el estado del cuadrado actual:

<!--highlight:[6,7,8,9,10,11,12]-->
{% highlight js %}
var juego = (function(){
  var timer,
    velocidad = 20,
    canvas,
    contexto,
    presionada,
    cuadrado: {
      x: 100,
      y: 25,
      width: 50,
      height: 150
    };

// aca sigue el mismo código ...
 {% endhighlight %}

Implementamos el manejo de los eventos keydown y keyup para saber la tecla presionada:

<!--highlight:[3,6]-->
{% highlight js %}
function agregarManejador() {
   document.addEventListener('keydown', function(evento) {
     presionada = evento.keyCode;
   });
   document.addEventListener('keyup', function(evento) {
     presionada = null;
   });
}
 {% endhighlight %}

Luego implementamos el actualizar() con el cambio de estado del cuadrado (cuadrado.x) dependendiendo de la tecla presionada:

{% highlight js %}
function actualizar() {
  switch(presionada){
    case '37': //izquierda
      cuadrado.x -= 20;
      //para que no se pase del inicio del canvas
      if (cuadrado.x < 0)
        cuadrado.x = 0;
    break;
    case '39': //derecha
      cuadrado.x += 20;
      //para que no se pase del largo del canvas
      if (cuadrado.x + cuadrado.width > canvas.width)
        cuadrado.x = canvas.width - cuadrado.width;
    break;
  }
}
 {% endhighlight %}

Entonces cada vez que se ejecute la función comprueba la flecha presionada y actualiza la x del cuadrado.

Ahora nos queda dibujar el estado del cuadrado en cada momento que se ejecute dibujar():

{% highlight js %}
function dibujar() {
  contexto.clearRect(0, 0, canvas.width, canvas.height);

  //fillRect(x,y,width,height);
  contexto.fillRect(cuadrado.x, cuadrado.y, cuadrado.width, cuadrado.height);
}
 {% endhighlight %}

En la primer linea limpiamos todo el canvas, y despues dibujamos el cuadrado en la posición actual.

Nos queda algo asi:  

<iframe style="width: 100%; height: 300px" src="//jsfiddle.net/pjnovas/7F26V/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

#### <a name="1.5" style="text-decoration: none;">Optimizando</a>

Hay muchas optimizaciones para tener en cuenta al hacer un juego en javascript, quiero centrarme en 2 que considero importantes y principales, más adelante veremos otras.

##### <a name="1.5.1" style="text-decoration: none;">Canvas Buffer</a>

Como suena, tener un canvas que funcione como un buffer para el redibujo continuo, básicamente la idea es dibujar sobre otro canvas *oculto* y cuando esté todo listo dibujarlo completo sobre el *real*, porque esto?, si bien la mejora no es increible, logramos evitar el famoso &#8220;flickering&#8221; y es esa sensación de que medio se traba la animación.

Para explicarlo mejor: suponiendo que tenemos 30 elementos que se dibujan de a uno sobre el canvas, y a medida que se van dibujando y armando la escena de una secuencia de animación puede tardar un mínimo de tiempo en el cual el ojo llega a percibirlo y nos queda un efecto no muy feliz. Bueno, para evitar ese &#8220;efecto&#8221;, dibujamos todos en un canvas &#8220;falso&#8221; y después aplicamos el dibujo completo de la escena en el canvas &#8220;real&#8221;.

Genial, vamos a agregar esta optimización al game loop volviendo a nuestro código, empezando por la función donde iniciamos el canvas:

<!--highlight:[11,12,13,17]-->
{% highlight js %}
//Nos creamos las variables de buffer al inicio del modulo
  // ... otras variables que teníamos
  canvas,
  contexto,
  canvasBuffer,
  contextoBuffer;  

  function iniciarCanvas() {
      canvas = document.getElementById('canvas');

      canvasBuffer = document.createElement('canvas');
      canvasBuffer.width = canvas.width;
      canvasBuffer.height = canvas.height;

      if (canvas.getContext){
        contexto = canvas.getContext('2d');
        contextoBuffer = canvasBuffer.getContext('2d');
      }
      else throw "canvas no soportado!";
  }
 {% endhighlight %}

Lo que hicimos ahi es crearnos el &#8220;falso&#8221; canvas y su contexto partiendo como base del tamaño del canvas real, ahora lo que necesitamos es, al momento de dibujar, hacerlo sobre el falso y después aplicarlo en el real, entonces nuestra funcion dibujar() quedaría así:

<!--highlight:[2,3,10]-->
{% highlight js %}
function dibujar() {
  contextoBuffer.clearRect(0, 0, canvas.width, canvas.height);
  contextoBuffer.fillRect(cuadrado.x, cuadrado.y, cuadrado.width, cuadrado.height);

  //dibujamos sobre el contexto del buffer todo lo que necesitemos

  //limpiamos el real
  contexto.clearRect(0, 0, canvas.width, canvas.height);  
  //aplicamos el buffer
  contexto.drawImage(canvasBuffer, 0, 0);
}
 {% endhighlight %}

##### <a name="1.5.2" style="text-decoration: none;">Request Animation Frame</a>

Nuestro setTimeout() para realizar el loop es genial, pero no sería mejor avisarle al explorador que vamos a correr una animación y queremos que se prepare y lo haga lo mejor que pueda?, bueno eso es el requestAnimationFrame(). Fue creado con ese propósito, que el explorador sepa cuando vamos a hacer este tipo de cosas, como por ejemplo: un loop con muchos &#8220;frames&#8221; para realizar una animación.

El cambio es bastante simple para nuestro game loop, ya que es &#8220;casi&#8221; reemplazar el setTimeout() por el pedido de animaciones por frames así que cambiemos el loop:

<!--highlight:[6,12,16]-->
{% highlight js %}
function loop(){
    actualizar();
    dibujar();

    //timer = setTimeout(loop, velocidad);
    timer = window.requestAnimationFrame(loop);
  }

  return {
    iniciar: function() {
      iniciarCanvas();
      loop();
    },
    detener: function() {
      //clearTimeout(timer);
      window.cancelAnimationFrame(timer);
    }
  }
 {% endhighlight %}

Como se vé el cambio fue bastante simple, pero no se si notaste que ya no tenemos velocidad, bueno, es mejor no tenerla jeje, personalmente prefiero que el requestAnimationFrame la maneje por mi, por el hecho de que es bastante complicado calcular un buen &#8220;frame rate&#8221; no siendo un experto en el tema y sobretodo pensando que ese frame rate es el tiempo que tenemos para dibujar tooodo el estado de la escena (suena complicado para mi :P)

Y si el explorador no lo soporta?, bueno para ese caso les recomiendo utilizar el [requestAnimationFrame polyfill de Erik Möller][13], en el cual se armó un script buenisimo con todo ese problema resuelto, dejandonos el *window.requestAnimationFrame* listo para usar esté o no soportado (esto lo hace llevandolo a un setTimeout como última medida)

#### <a name="1.6" style="text-decoration: none;">Conclusión</a>

**Que sigue ahora?, bueno primero que nada este código que construimos es a modo de ejemplo, las funciones de actualizar() y dibujar() deberían encargarse de llamar a otros módulos o clases y delegar totalmente las funcionalidades, con esto quiero decir que no debería crecer mas el módulo de lo que está y mantenerse sólo en la lógica del game loop, no queremos que se vuelva un mounstro gigante <img src="//fernetjs.com/wp-includes/images/smilies/simple-smile.png" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" />**

Les dejo el Game Loop terminado con el ejemplo:  

<iframe style="width: 100%; height: 300px" src="//jsfiddle.net/pjnovas/SB8Pn/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Y un [Gist][14] con el Game Loop completo como template para que hagan cosas locas:

{% highlight js %}
var fernetjs = fernetjs || {};
fernetjs.juego = (function(){
  var reqAnimId,
    canvas,
    contexto,
    canvasBuffer,
    contextoBuffer;

  function actualizar() {
    //actualizaciones del estado
  }

  function dibujar() {
    contextoBuffer.clearRect(0, 0, canvas.width, canvas.height);

    //dibujos en el contextoBuffer

    contexto.clearRect(0, 0, canvas.width, canvas.height);  
    contexto.drawImage(canvasBuffer, 0, 0);
  }

  function iniciarCanvas() {
    canvas = document.getElementById('canvas');

    canvasBuffer = document.createElement('canvas');
    canvasBuffer.width = canvas.width;
    canvasBuffer.height = canvas.height;

    if (canvas.getContext){
      contexto = canvas.getContext('2d');
      contextoBuffer = canvasBuffer.getContext('2d');
    }
    else throw "canvas no soportado!";
  }

  function loop(){
   actualizar();
   dibujar();

   reqAnimId = window.requestAnimationFrame(loop);
  }

 return {

   iniciar: function() {
     if (!canvas)
       iniciarCanvas();

     if(reqAnimId)
       this.detener();

     loop();
   },

   detener: function() {
      window.cancelAnimationFrame(reqAnimId);
      reqAnimId = 0;
   }
 }

})();

//iniciar:
//fernetjs.juego.iniciar();
//detener:
//fernetjs.juego.detener();

 {% endhighlight %}

 [1]: #1.1
 [2]: #1.2
 [3]: #1.3
 [4]: #1.4
 [5]: #1.5
 [6]: #1.5.1
 [7]: #1.5.2
 [8]: #1.6
 [9]: http://fernetjs.com/2011/11/ejecuciones-asincronicas-de-funciones/ "Ejecuciones Asincrónicas de funciones"
 [10]: http://fernetjs.com/2012/05/patrones-module-y-namespace/ "Patrones: Module y Namespace"
 [11]: http://fernetjs.com/2011/11/dibujando-en-canvas-html5/ "Dibujando en CANVAS – HTML5"
 [12]: http://fernetjs.com/2011/12/animando-en-canvas-html5/ "Animando en CANVAS – HTML5"
 [13]: http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 [14]: http://gist.github.com/3649399
