---
title: 'Fernet Volador: detrás de escena'
author: pjnovas
layout: post
permalink: /2012/06/fernet-volador-detras-de-escena/
dsq_thread_id:
  - 740153208
categories:
  - Client Side
  - Utilidades
  - WTF
tags:
  - animaciones
  - array
  - closures
  - eventos
  - keydown
  - keyup
---
A pedido del público (mentira, lo queria compartir :P), el código del Fernet Volador explicado:

Antes que nada, si no lo viste en funcionamiento, abri tu consola y pone konamiFernetJS.run(), para terminarlo ingresa konamiFernetJS.stop(). Todo nace desde [este post de Matias][1]

El objetivo del fernet volador es basicamente lo que se vé, una botella de fernet con una capita y que pudieramos volar por la pantalla.

### Un poco de como armarlo

Primero nuestra imagen de la botella, hacemos los movimientos de la capa en la misma imagen, la cual va a estar cambiando continuamente (el background-position en CSS) dando el efecto de que se mueve la capa:

[<img src="http://fernetjs.com/wp-content/uploads/2012/06/fernet-capita.png" alt="" title="fernet-capita" width="160" height="80" class="alignnone size-full wp-image-2306" />][2]

Vamos a tener que mover la botella en angulos dependiendo de *hacia donde este yendo*, por lo que usamos CSS3 y el copado *rotate*, pero también vamos a tener que mover la posición de la botella en la pantalla para simular el movimiento, asi que armamos 2 divs, uno con la imagen del fernet (en posición absoluta), en el cual vamos a ir modificando el rotate (verde) y otro que contiene a este con posicion absoluta al documento (rojo), al cual le vamos a cambiar el top y left para ir posicionandolo. 

[<img src="http://fernetjs.com/wp-content/uploads/2012/06/fernetvolador_ctn1.png" alt="" title="fernetvolador_ctn" width="150" height="150" class="alignnone size-full wp-image-2314" />][3]

Y todo esto va a depender de las flechas presionadas, asi que diría de mantenerlas en un array para que el loop se encargue de verificar cual está y aplicar los CSS. 

### Estructurando el codigo

Vamos a estructurar nuestro código armando una función para iniciar, 2 funciones para cuando presiona una flecha en el teclado y cuando la suelta, una función para mover la botella (la que va a estar en un loop) y por último una función para limpiar el dom cuando termina.

Principalmente el fernet volador tiene 2 entradas públicas, una para iniciar y otra para terminar, asi que vamos a dejar solo eso público utilizando lo que vimos en [este post][4]

Arranquemos por el objeto konamiFernetJS:

{% highlight js %}
var konamiFernetJS = (function($){
  //variables privadas
  var running = false, //si está en ejecución
    timerMove, //timer para movimiento
    timerCapa, //timer para la capa
    bottleWrap, // div de posicion para la botella
    bottle, //div de imagen y rotacion de la botella
    legend, //leyenda inicial
    vel = 10, //velocidad
    cls = 0, //angulo a aplicar
    $window = $(window), //el jquery wrapper del window 
    keys = [], // array con las flechas presionadas
    key = { //keyCodes de las flechas del teclado
      up: 38,
      down: 40,
      left: 37,
      right: 39
    };

  //function para la animacion de la botella
  //se va a llamar en un loop cada x segundos
  var moveBottle = function(){};  

  //eventos de keyup y keydown
  var konamiKeyDown = function(e){};
  var konamiKeyUp = function(e){};

  //funcion para iniciar dom, eventos y loops
  var runKonami = function(){};

  //funcion para  limpiar todo, dom, eventos y detener loops
  var reset = function(){};
 
  //acceso publico para iniciar y detener
  return {
    run: function(){
      if (!running){
        running = true;
        runKonami();
      }
    },
    stop: reset
  }; 
})(jQuery);
 {% endhighlight %}

De esta manera dejamos toda funcionalidad, variables, etc. dentro de una sola variable global *konamiFernetJS*.

#### iniciando: runKonami()

En esta funcion vamos a crear el dom, eventos e iniciar los loops de animacion:

{% highlight js %}
var runKonami = function(){
  //creamos los elementos del DOM
  //este es el div que rota con la imagen de la botella
  bottle = $("<div>").addClass('fernet-capita');
  //mensaje inicial 
  legend = $("<div>").addClass('legend').text("<- Fernet volador");

  //este va a ser el div que se mueve por la pantalla
  bottleWrap = $("<div>").addClass("bottle-wrap")
    .append(bottle) //agregamos la botella
    .append(legend) //agregamos el mensaje inicial
    //posicionamiento inicial de la botella
    .css('left', ($window.width()/3) + 'px')
    .css('top', (($window.height()/2) + $window.scrollTop()) + 'px')
    .appendTo('body'); //agregamos todo al body

  //hacemos desaparecer el scroll de la pagina, ya que lo vamos a manejar nosotros		
  $('body, html').css('overflow', 'hidden');

  //creamos una funcion para el array keys, simplificando el manejo de las flechas presionadas
  //vamos a usar mucho esta funcion dentro de moveBottle
  //el array keys es donde vamos a mantener las flechas presionadas
  keys.has = function(){
    for(var i=0;i<arguments.length;i++){
      if(keys.indexOf(arguments[i]) === -1) return false;
    }
    return true;
  };
  
  //bindeamos los eventos keyup y keydown del window a nuestras funciones
  $(document).bind('keydown', konamiKeyDown);
  $(document).bind('keyup', konamiKeyUp);

  //limpiamos todo interval que este dando vueltas (por si las dudas)
  clearInterval(timerMove);
  clearInterval(timerCapa);
  
  //creamos el loop para el movimiento de la botella
  //es decir, cada 50 milisegundos se va a llamar a la función moveBottle
  timerMove = setInterval(moveBottle, 50);

  //creamos el loop para el movimiento de la capa negra de la botella	
  //es el cambio continuo de la imagen, para animar la capa (background-position)	
  var toggle = false;
  timerCapa = setInterval(function(){
    toggle = !toggle;
    if (toggle) bottle.addClass('x');
    else bottle.removeClass('x');
  }, 200);
		
};
 {% endhighlight %}

#### eventos keyup y keydown

Manejando el array *keys* dependiendo de que esta presionado y que se dejó de presionar

{% highlight js %}
var konamiKeyDown = function(e){
  //comprobamos que la flecha presionada no esté en el array (sea nueva)
  if (keys.indexOf(e.which) === -1) {
    if (keys.length > 1) keys.shift(); // si el array ya tiene 2, sacamos la primera
    keys.push(e.which); //agregamos la flecha al array
  }

  //si todavia esta la leyenda, animamos para que se vaya
  if (legend){
    legend.animate({opacity: 0}, 1000, function(){
      legend.remove();
      legend = null;
    });
  }
};
	
var konamiKeyUp = function(e){
  var idx = keys.indexOf(e.which);
  if (idx !== -1)
    keys.splice(idx, 1); //si el array tiene la flecha que soltamos, la eliminamos
};
 {% endhighlight %}

#### loop de movimiento de la botella: moveBottle()

{% highlight js %}
var moveBottle = function(){
  //tomamos posiciones actuales y la altura de la ventana actual con su scroll
  var top = bottleWrap.position().top, 
    left = bottleWrap.position().left,
    half = $window.height()/2,
    hScroll = $window.scrollTop() + $window.height()/2;

  //comprobamos que flechas están en el array y asignamos angulo y posicion
  if(keys.has(key.up)){
    cls = 0;
    if(top > 0) top-=vel; 
  }
  if(keys.has(key.right)){
    cls = 90;
    if((left + bottleWrap.width()) < $window.width()) left+=vel;
  }
  if(keys.has(key.down)){
    cls = 180;
    if((top + bottleWrap.height() * 2) < $window.height() + $window.scrollTop()) top+=vel;
  }
  if(keys.has(key.left)){
    cls = 270;
    if(left > 0) left-=vel;
  }

  //este caso es para cuando tiene 2 flechas presionadas
  if(keys.length > 1){
    cls = 45;
			
    if (keys.has(key.up, key.right)) cls *= 1;
    else if (keys.has(key.right, key.down)) cls *= 3;
    else if (keys.has(key.down, key.left)) cls *= 5;
    else if (keys.has(key.left, key.up)) cls *= 7;
  }

  //creamos el CSS con la propiedad rotate
  var style = "transform:rotate([d]deg);"
    + "-ms-transform:rotate([d]deg);"
    + "-moz-transform:rotate([d]deg);"
    + "-webkit-transform:rotate([d]deg);"
    + "-o-transform:rotate([d]deg);";
					
  //reemplazamos [d] por el angulo calculado			
  style = style.replace(/\[d\]/g, cls); 

  //comprobamos si hay que mover el scroll de la ventana
  if(top > hScroll || top < hScroll){
    $window.scrollTop(top - half);
  }

  //asignamos la posicion nueva y el CSS rotate
  bottleWrap.css('top', top + 'px').css('left', left + 'px');
  bottle.attr('style', style);
};
 {% endhighlight %}

#### Limpiamos memoria cuando se detenga: reset()

{% highlight js %}
var reset = function(){
  //eliminamos eventos
  $(document).unbind('keydown', konamiKeyDown);
  $(document).unbind('keyup', konamiKeyUp);

  //volvemos el scroll a como estaba
  $('body, html').css('overflow', 'auto');

  //detenemos los loops
  clearInterval(timerMove);
  clearInterval(timerCapa);

  bottleWrap.empty().remove(); //eliminamos el DOM
  keys = []; //volvemos a cero el array de flechas
  running = false; //le avisamos que ya no está en ejecución
};
 {% endhighlight %}

Y eso es todo el fernet volador (sacando el css), estoy seguro que cambiarias varias cosas (con escribir el post yo cambiaría algunas :P) por eso te dejo un repo en github para que tengas todo el ejemplo completo y puedas modificarlo o reutilizarlo.

[Fernet Volador en GitHub][5]

 [1]: http://fernetjs.com/2012/06/del-ofuscador-al-konami-code/ "Del ofuscador al konami code"
 [2]: http://fernetjs.com/wp-content/uploads/2012/06/fernet-capita.png
 [3]: http://fernetjs.com/wp-content/uploads/2012/06/fernetvolador_ctn1.png
 [4]: http://fernetjs.com/2012/05/patrones-module-y-namespace/ "Patrones: Module y Namespace"
 [5]: https://github.com/fernetjs/fernetvolador