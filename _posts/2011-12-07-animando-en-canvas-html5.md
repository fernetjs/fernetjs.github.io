---
title: 'Animando en CANVAS &#8211; HTML5'
author: pjnovas
layout: post
permalink: /2011/12/animando-en-canvas-html5/
dsq_thread_id:
  - 497142912
categories:
  - Client Side
  - Performance
tags:
  - animaciones
  - asincronismo
  - canvas
  - setTimeout
migration_issue: highlightline
---
Continuando con el post de [Dibujando en Canvas &#8211; HTML5][1] vamos a ver como animar lo que dibujamos.

Animar el DOM no es tan difícil, podemos utilizar librerías como jQuery ([jQuery .animate() y .stop()][2]) o simplemente modificando las propiedades CSS, como ser top, left, width, height, etc. Pero en Canvas es distinto, ya que no poseemos de DOM para lo que dibujemos y, por lo tanto, tampoco de CSS. Tenemos que pensarlo como una secuencia de dibujar, limpiar y volver a dibujar: dibujamos un objeto en una posición Y, limpiamos el contexto y lo volvemos a dibujar en la posición Y+1, pero nos falta algo mas &#8230; tenemos que hacerlo asincrónicamente, realizar esos pasos cada X tiempo, así el usuario puede apreciar la animación.

Ya que tenemos el logo de FernetJS en Canvas, vamos a animarlo.  
<!--more-->

  
Primero necesitamos un loop de animación, es decir una función recursiva que se ejecute cada x tiempo realizando los cambios necesarios para animar (como ser una disminución de posiciones x, y de la imagen del vaso):

<!--highlight:[1,8,16,23]-->
{% highlight js %}
function loop(posX, posY) {
    //limpio el contexto
    contexto.clearRect(0, 0, 145, 145);

    dibujarFondo();

    //dibujo la imagen del vaso
    contexto.drawImage(vaso, posX, posY);

    dibujarContorno();

    if (posX &gt; 0 || posY &gt; 0) {

        setTimeout(function(){
            //llamada a sí misma restando 10 pixeles
            loop(posX-10, posY-10);
        }, 40);

    }
    else dibujarEnfasis();
}

loop(150, 150);
 {% endhighlight %}

Ese es mi loop para animar el vaso, la idea es que llamando a la función loop enviándole las coordenadas iniciales x, y se va a llamar a sí misma cada 40 milisegundos con un [setTimeout()][3] restándole 10 pixeles a cada coordenada hasta que llegue a 0.

[<img class="alignnone size-full wp-image-890" title="ref7" src="http://www.fernetjs.com/wp-content/uploads/2011/12/logo_canvas7.png" alt="" width="270" height="280" />][4]

De esta manera podríamos encadenar animaciones y realizar de a una a medida que van terminando. Ahora podríamos hacer un [callback  
][5] cuando termine esa animación para disparar otra:

<!--highlight:[1,17,21]-->
{% highlight js %}
function animar(termino){

    function loop(posX, posY) {
        contexto.clearRect(0, 0, 145, 145);

        dibujarFondo();

        contexto.drawImage(vaso, posX, posY);

        dibujarContorno();

        if (posX &gt; 0 || posY &gt; 0) {
            setTimeout(function(){
                loop(posX-10, posY-10);
            }, 40);
        }
        else termino();
    }
}

animar(function() {
    dibujarEnfasis();
    //realizo otra animacion o algo mas
});

 {% endhighlight %}

Como se puede ver es bastante diferente a un .animate() de jQuery o a modificar propiedades del DOM. Si tuviéramos que hacer todo esto con imágenes?, funciona bien, pero es mas carga y si queremos cambiar algo tenemos que hacer las imágenes de nuevo. De esta manera vamos a tener una buena experiencia de animación, mantenible y con performance &#8230; aparte de poder realizar animaciones dibujando lo cual le da un toque mas interesante a crear imágenes.

Les dejo un jsFiddle con toda la animación terminada y un evento on-click en el canvas.

 [1]: http://www.fernetjs.com/2011/11/dibujando-en-canvas-html5/ "Dibujando en CANVAS – HTML5"
 [2]: http://www.fernetjs.com/2011/11/jquery-animate-y-stop/ "jQuery .animate y .stop"
 [3]: http://www.fernetjs.com/2011/11/ejecuciones-asincronicas-de-funciones/ "Ejecuciones Asincrónicas de funciones"
 [4]: http://www.fernetjs.com/wp-content/uploads/2011/12/logo_canvas7.png
 [5]: http://www.fernetjs.com/2011/12/creando-y-utilizando-callbacks/ "Creando y utilizando callbacks"