---
title: 'NaNNaNNaNNaNNaN&#8230;.'
author: matiasarriola
layout: post
permalink: /2011/11/nannannannannan/
dsq_thread_id:
  - 497141996
categories:
  - WTF
tags:
  - NaN
  - poco serio
  - tipos de datos
---
[<img class="aligncenter size-full wp-image-417" title="BATMAN!" src="//www.fernetjs.com/wp-content/uploads/2011/11/3601491300_ab28b127bb.jpg" alt="Imagen de batman" width="328" height="500" /><!--more-->][1]Si, soy un gil, pero acá va este &#8220;chiste&#8221; que había visto dando vueltas por ahí hace un tiempo. Es una línea de código:

{% highlight js %}
Array(10).join("fernet" - 2) + " Batman!";
 {% endhighlight %}

Si desconoce el resultado de la evaluación, [aquí esta el resultado][2]!!.

La explicación es la siguiente:

  1. Se inicializa un array de 10 elementos (cada elemento es undefined).
  2. &#8220;fernet&#8221; &#8211; 2 devuelve NaN (Not a Number), ya que se trata de restarle 2 a &#8220;fernet&#8221; ( de la mima manera se devuelve NaN en cualquier tipo de parseo numérico inválido &#8211; ya nos vamos a adentrar en este tema con la biblioteca jorgumJS que está en camino)
  3. Se aplica el [join][3] a este array, devolviendo el string NaNNaNNaN&#8230;
  4. Se concatenan los NaNs con Batman.

No estoy muy seguro acerca de la cantidad de NaNs, si ven que está mal avisen.

 [1]: http://www.fernetjs.com/wp-content/uploads/2011/11/3601491300_ab28b127bb.jpg
 [2]: http://jsbin.com/ukociy "Para los holgazanes que no abren su consola"
 [3]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/join "MDN - Array.join"