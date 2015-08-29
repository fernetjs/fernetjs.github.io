---
title: Memoization. Una primer mirada
author: matiasarriola
layout: post
permalink: /2011/11/memoization-una-primer-mirada/
dsq_thread_id:
  - 498114092
categories:
  - Performance
tags:
  - memoization
  - performance
---
Primero que nada, quería aclarar que conozco el término solamente en inglés, y no quiero entrar en [debates filosóficos][1] de cómo deberíamos llamarlo en castellano; así que adentrémonos en el tema.

Memoization es una técnica de optimización mediante la cual se trata de mejorar la velocidad de cómputo. ¿Cómo? Fácil: Una función se acuerda del resultado para cierto input o grupo de parámetros, y devuelve éste resultado en lugar de andar haciendo el cálculo una y otra vez. Esta no es una técnica dependiente del lenguaje, es decir, no es algo propio de javascript, y lo vamos a encontrar también en muchos otros lenguajes.

Para entender el concepto, vamos a ver una implementación sencilla, para una problemática sencilla; pero en futuros posts vamos a estar abarcando distintos casos y variantes, y como lo implementan algunas bibliotecas.

La problemática sencilla de la que hablamos, es calcular el factorial de cierto número. La implementación que yo hice en javascript es la siguiente:

{% highlight js %}
function factorial(num) {
    if (num === 0) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }
}
 {% endhighlight %}

Como se puede ver es una función recursiva (se llama a si misma). Ahora, si la probamos, vamos a ver que por ejemplo

{% highlight js %}
factorial(0);// 1
factorial(4);//24 {% endhighlight %}

Parece funcionar bien.. pero lo que queremos hacer es optimizar esta función, porque a cada valor más grande que le pasamos como parámetro, la función nos tarda mucho mas <img src="http://fernetjs.com/wp-includes/images/smilies/frownie.png" alt=":(" class="wp-smiley" style="height: 1em; max-height: 1em;" />  
<!--more-->

{% highlight js %}
function mejor_factorial(num) {
    // si el cache no esta inicializado, lo inicializamos
    if (!mejor_factorial.cache) {
        mejor_factorial.cache = {};
    }
    if (num === 0) {
        return 1;
    } else if (num in mejor_factorial.cache) {
    // si ya tenemos en cache el factorial de num, devolvemos
    // directamente ese resultado sin hacer ningun cálculo
        return mejor_factorial.cache[num];
    } else {
        // como no tenemos el factorial de num en cache, lo calculamos
        // y lo cacheamos para futuras invocaciones
    mejor_factorial.cache[num] = num * mejor_factorial(num - 1);
    return mejor_factorial.cache[num];
}
 {% endhighlight %}

{% highlight js %}
mejor_factorial(0);// 1
mejor_factorial(4);//24
 {% endhighlight %}

Esperemos que con los comentarios se haya entendido qué es lo que se hace en cada parte del código. Ahora vayamos a la posta, ¿Es realmente &#8220;mucho&#8221; más rapida <span class="Apple-style-span" style="font-family: Consolas, Monaco, monospace; font-size: 12px; line-height: 18px; white-space: pre;">mejor_factorial </span>que <span class="Apple-style-span" style="font-family: Consolas, Monaco, monospace; font-size: 12px; line-height: 18px; white-space: pre;">factorial</span>?

**Respuesta corta**: si  
**Respuesta práctica**: creé un [caso de prueba en jsPerf][2]!!  
**Respuesta lógica:** a medida que vayamos invocando a estas funciones pasándole números más grandes, mucho mayor va a ser la ventaja de una función sobre la otra, ya que nos estamos ahorrando cada vez más cálculos.

**<span style="text-decoration: underline;">Nota sobre el &#8220;cache&#8221; que usamos en mejor_factorial:</span>**  
En VB.net sería descabellado tratar de hacer algo así como nombreDeFuncion.cache y asignar allí un valor, o lo que sea. En javascript podemos hacer esto gracias a que podemos considerar a la función como un objeto más, al que le podemos agregar las propiedades que queramos en tiempo de ejecución. Si le hubiéramos querido meter otra propiedad que sea numeroDeLlamadas de la misma forma que hicimos con cache, lo podríamos haber hecho tranquilamente.

 [1]: http://cvc.cervantes.es/foros/leer_asunto1.asp?vCodigo=36444
 [2]: http://jsperf.com/memoization-caso-simple "factorial memoization jsPerf"