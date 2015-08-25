---
title: Terremoto Web
author: Pablo Novas
layout: post
permalink: /2012/01/terremoto-web/
dsq_thread_id:
  - 550803460
categories:
  - WTF
tags:
  - poco serio
---
Desde que vi el tilt de google, el snow, etc &#8230; vengo con ganas de jugar con el poder que trae Canvas y CSS 3 combinados. Asi que les dejo un script divertido que hice para causar un &#8220;terremoto&#8221; en alguna pagina web usando Rotate y Translate de CSS3.

Simplemente entren a una web, abran la consola con F12 (Firefox o Chrome), en el tab scripts peguen el siguiente codigo y EJECUTAR

<pre class="brush: jscript; title: ; notranslate" title="">function terremoto() {
    var ele = document.getElementsByTagName('body')[0],
         vel = 80,
         m = 1,
         tInterval,
         x = 0,
         tiempo = 20000; //20 segs

    ele.style["overflow-x"] = "hidden";

    tInterval = setInterval(function() {
        m *= -1;
        x = x + (0.1 * m);
        aplicarEstilos(ele, x);
    }, vel);

    setTimeout(function() {
       clearInterval(tInterval);
       aplicarEstilos(ele, 0);
       ele.style["overflow-x"] = "auto";
    }, tiempo);
}

function aplicarEstilos(ele, x) {
    ele.style.webkitTransform = "rotate(" + (x*3) + "deg) translate(" + x*80 + "px, " + x*10 + "px)";
    ele.style.MozTransform = "rotate(" + (x*3) + "deg) translate(" + x*80 + "px, " + x*10 + "px)";
}

terremoto();
</pre>



Lo pueden probar con FernetJS haciendo click [aca][1]

 [1]: javascript:terremoto(); "Terremotooooooo"