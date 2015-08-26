---
title: A pantalla completa
author: Matias Arriola
layout: post
permalink: /2012/05/a-pantalla-completa/
dsq_thread_id:
  - 701556924
categories:
  - Client Side
tags:
  - canvas
  - fullscreen
  - video
---
## Fullscreen API

La implementación y definición de esta API supone mejoras realmente necesarias dentro de lo que es el desarrollo web.  
La fullscreen API potencia muchos componentes ya existentes en HTML5. Por ejemplo, el tag video, está muy bueno y todo, pero la pantalla completa es una vuelta de rosca que  faltaba. De la misma manera, ahora se puede desarrollar juegos o crear visualizaciones impactantes en un canvas y mostrarlas en pantalla completa&#8230; Eso suma bastante en muchos casos!

Al momento de escribir este post, la API para fullscreen no está cerrada, y existen <a title="caniuse fullscreen" href="http://caniuse.com/#search=fullscreen" target="_blank">solo un par</a> de implementaciones tempranas accesibles usando prefijos del vendor.

Las especificaciones pueden ser encontradas en <a title="Estándar fullscreen" href="http://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html" target="_blank">el sitio de la W3C</a>.

## La posta

Para ilustrar un poco esto, tomé la página de 404 de fernetjs y la edité para que el invaders soporte pantalla completa:  
<a title="error 404" href="http://fernetjs.com/notfound" target="_blank">http://fernetjs.com/notfound</a> (para switchear a fullscreen, presionar ctrl+enter; para salir esc).

Los cambios relacionados que fueron necesarios pueden ser observados [en este commit][1] (ignorar los espacios, mi error jeje).

En este caso, el código del método que llevaría el elemento canvas a estar en pantalla completa sería:

{% highlight js %}
var canvas = this.canvas,
    requestFullscreen = canvas.requestFullscreen || canvas.mozRequestFullScreen || canvas.webkitRequestFullScreen;
if(requestFullscreen){
    requestFullscreen.call(canvas);
}
 {% endhighlight %}

De la misma manera, para cancelarlo:

{% highlight js %}
var cancelFullscreen = document.cancelFullscreen || document.mozCancelFullScreen || document.webkitCancelFullScreen;
if(cancelFullscreen){
	cancelFullscreen.call(document);
}
 {% endhighlight %}

Existe un evento que se dispara cada vez que se produce el switch hacia o desde fullscreen. Este es misteriosamente (?) llamado fullscreenchange, que también viene acompañado por sus hermanos mozfullscreenchange y webkitfullscreenchange.  
De la misma manera, existe un flag a nivel document que nos indica si actualmente se encuentra en pantalla completa, o no. Ejemplo:

{% highlight js %}
document.addEventListener("fullscreenchange", function () {
    // Aca podes reordenar todo el contenido, o hacer cosas copadas
    console.log((document.fullscreen)? "Ahora estoy en fullscreen" : "Ahora no");
}, false);

document.addEventListener("mozfullscreenchange", function () {
    console.log((document.mozFullScreen)? "estoy en fullscreen" : "ya no");
}, false);

document.addEventListener("webkitfullscreenchange", function () {
    console.log((document.webkitIsFullScreen)? "Ahora estoy en fullscreen" : "Ahora no");
}, false);
 {% endhighlight %}

Cabe aclarar que no sólo se puede aplicar a un video o a un canvas, sino que tambien a un div, u otros elementos del DOM.

## El día de hoy

Hay varias cosas, y comportamientos que tenemos que normalizar para que a esta altura ir a pantalla completa se comporte de la misma manera en distintos browsers.  
Evidentemente, en este caso aparecen los prefijos del vendor, en js y css. O sea que dependiendo del navegador, para hacer una misma cosa, tenemos que llamar a ciertas funciones.

Uno de los temas es que en firefox cuando pasas a fullscreen, todo el contenido se ajusta a la pantalla. En cambio, en browsers basados en webkit como el chrome, el contenido queda con el tamaño original, y si lo queremos ajustar, lo tenemos que hacer con CSS y los pseudo-selectores.

{% highlight css %}
:fullscreen {
                width: 100% !important;
                height: 100% !important;
        }
        :-webkit-full-screen {
                width: 100% !important;
                height: 100% !important;
        }
        -moz-full-screen {
                width: 100% !important;
                height: 100% !important;
        }
 {% endhighlight %}

Otra cosa, según mis pruebas, es que varía por browser cuando se puede disparar el fullscreen. En Chrome por ejemplo, no se va a poder pasar a fullscreen si la llamada a requestFullscreen no es consecuencia de una interacción de usuario. Por ejemplo, si tiras un requestFullscreen desde la consola, no se va a hacer el paso a fullscreen.

La última diferencia en comportamiento que observé, y no menor, es el input del usuario por teclado. En Chrome, para permitir a full el input del teclado en fullscreen usando chrome, hay que pasarle como parámetro Element.ALLOW\_KEYBOARD\_INPUT a la función requestFullscreen.

{% highlight js %}
elemento.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
 {% endhighlight %}

Existen algunas libraries que tratan de solucionar algunas de esas diferencias, una de las mas conocidas es  
<a href="https://github.com/sindresorhus/screenfull.js/" title="screenfull.js en github" target="_blank">screenfull.js</a>; aunque estoy seguro de que hay muchas más.

### Otros links

<a href="https://developer.mozilla.org/en/DOM/Using_full-screen_mode" title="DOM/Using_full-screen_mode" target="_blank">https://developer.mozilla.org/en/DOM/Using_full-screen_mode</a>  
<a href="http://hacks.mozilla.org/2012/01/using-the-fullscreen-api-in-web-browsers/" title="using-the-fullscreen-api-in-web-browsers" target="_blank">http://hacks.mozilla.org/2012/01/using-the-fullscreen-api-in-web-browsers/</a>  
<a href="http://updates.html5rocks.com/2011/10/Let-Your-Content-Do-the-Talking-Fullscreen-API" title="Let-Your-Content-Do-the-Talking-Fullscreen-API" target="_blank">http://updates.html5rocks.com/2011/10/Let-Your-Content-Do-the-Talking-Fullscreen-API</a>

 [1]: https://github.com/MatiasArriola/invaders404/commit/ddd9cbe83505d617ed007a876c8940e5690f812e