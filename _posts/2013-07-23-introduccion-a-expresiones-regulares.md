---
title: Introducción a Expresiones Regulares
author: Pablo Terradillos
layout: post
permalink: /2013/07/introduccion-a-expresiones-regulares/
dsq_thread_id:
  - 1523829402
categories:
  - Lenguaje
---
El buen manejo de expresiones regulares es, posiblemente, uno de los recursos más  
poderosos que tenemos en muchos lenguajes de programación y Javascript posee un muy buen soporte de las mismas.  
Sin embargo existe un gran misticismo en cuanto a su uso.  
En esta guía, voy a intentar explicar el funcionamiento de las expresiones regulares mediante un simple ejemplo.<aside>

**Nota:** A lo largo del articulo, *&#8220;Expresion regular&#8221;* y *&#8220;regex&#8221;* (REgular EXpresion) se refieren a la misma cosa.</em></p> 

Javascript posee soporte *nativo* de **expresiones  
regulares** proveyendo un constructor para crear objetos que las  
representen e incluso distintos métodos, normalmente en objetos del tipo String, para usarlas.

A fin de poder probar lo que vamos a ver, primero tenemos que saber como usar expresiones regulares en JS.

En principio, en JS, las regex son un tipo de objeto más, que podemos declararlos de forma literal ó mediante un constructor:

{% highlight js %}
var miRegEx1 = new RegExp("[a-z]", "i")
var miRegEx2 = /[a-z]/i
 {% endhighlight %}

En terminos prácticos, *miRegEx1* y *miRegEx2* representan a la misma expresión regular. El primer argumento de *RegExp()* son las reglas que tendrá y la segunda los *modificadores*.  
Para poder usarlas, debemos aplicarla a alguna función o método que las acepte.  
Javascript, trae de fabrica 2 métodos en objetos RegExp y 2 en String.

{% highlight js %}
var miRegEx = /[a-z]/i
var miString = "Hola a todos"

miRegEx.exec(miString); // Ejecuta la expresión regular contra el String. Devuelve un Array con la información que extrae.
miRegEx.test(miString); // Prueba la expresión regular contra el String. Devuelve <i>true</i> o <i>false</i>.

miString.match(miRegEx); // Ejecuta la expresión regular contra el String. Devuelve un Array con la información que extrae.
miString.search(miRegEx); // Busca en el String el patrón definido por la expresión regular. Devuelve la pocisión en el String donde la encuentra o -1 en caso de fallo.
miString.replace(miRegEx, "otro string"); // Reemplaza las ocurrencias de la expresión regular en el String con el segundo parametro.
miString.split(miRegEx); // Convierte un String en un array separandolo.
 {% endhighlight %}

Si vemos una expresión regular, como por ejemplo:

{% highlight js %}
/[\w.]+@\w+\.\w{3}(\.\w{2})?/ 
 {% endhighlight %}

seguramente no sepamos que significa y hasta puede que espante un poco.  
Sin embargo, conociendo las reglas básicas para la creación de regexs vamos a ver que en realidad esto no es tan dificil.

## Como armar una expresión regular

Como ya mencione, la teoría de expresiones regulares, es agnóstica al lenguaje  
y/o la tecnología que estemos usando.  
Javascript (al igual que muchos, de hecho) implementa las regex basándose en Perl 5, por lo que  
recomiendo leer la excelente documentación de este lenguaje sobre el tema.

Sin entrar en muchos detalles, podemos modelar las expresiones regulares, de una  
forma un poco más *visual* haciendo uso de una [maquinas de estados finitos][1].  
Esto nos ayudara a comprender el trabajo que hace el interprete de javascript  
para poder saber si un determinado texto se ajusta a las *reglas* que  
definimos en nuestra regex.

Supongamos que queremos detectar los correos electrónicos que aparecen en un  
determinado texto.  
Una forma de encarar este problema, es comenzando por detectar algo muy  
especifico y luego hacerlo más general.

Empezamos definiendo nuestra regex como:

{% highlight js %}
/tehsis@yimeil\.com/
 {% endhighlight %}<aside>

**Aclaración:** El *punto*, lo *escapamos* para que la regex espere, valga la redundancia, un punto. Ya que este carácter tiene un significado especial dentro de las expresiones regulares.</aside> 

Simple, ¿No?.

Al ejecutar esta expresión contra nuestro texto, el interprete comenzara intentando leer una &#8220;t&#8221;. Cuando la encuentre, esperara una  
&#8220;e&#8221;, luego una &#8220;h&#8221; y así hasta llegar a la &#8220;m&#8221;, en cuyo caso dara el texto como  
aceptado. En cualquier caso, si el carácter a testear no es el esperado, volverá a su estado inicial y avanzara un caracter dentro del texto para tomarlo como estado inicial.  
Viéndolo en un diagrama de estados finitos:

![Maquina de estados finitos][2]

Aunque sea solo un &#8220;juguete&#8221; esta expresión regular, bastante directa y clara,  
nos sirve para comprender lo básico:

**Una expresión regular, se forma por una sucesión de reglas que determinan, *paso a paso* lo que se busca  
en un texto.**

### Clases</p> 

Pero lo que nosotros queremos, es poder identificar *cualquier* dirección  
de correo electrónico y para eso necesitamos reglas un poco más genéricas.  
Podríamos, entonces, esperar cualquier letra antes del arroba y después del  
mismo. Esto lo hacemos mediante *clases*. Las clases, son un conjunto de caracteres que  
ponemos entre corchete (Ej: [abc]).

Esta clase, identifica un *único todos los caracteres de la A a la Z dentro de los corchetes para decir que  
queremos cualquier letra del abcdario. Por suerte, las clases permiten  
usar *rangos*: [a-z], [1-9], etc.  
Módificamos, entonces nuestra expresión regular original, para que acepte  
cualquier caracter del alfabeto antes del @, despues y luego del punto:*

{% highlight js %}
/[a-z]@[a-z]\.[a-z]/
 {% endhighlight %}

Esta expresión regular, sin embargo, lo que buscará sera: *Un* caracter de la  
&#8220;a&#8221; a la &#8220;z&#8221;. Si queremos que busque 2, podemos poner \[a-z\]\[a-z\] y si queremos  
tres \[a-z\]\[a-z\][a-z], y así.  
Como era de esperarse, tenemos algunas herramientas para manejar repeticiones de formas más  
elegantes. Una de ellas, es &#8220;+&#8221; que quiere decir &#8220;Esperá una ó más ocurrencias de  
esta *unidad*&#8221; (hablamos de *unidad* y no de caracter ya que se  
puede aplicar a clases, agrupaciones, etc).

{% highlight js %}
/[a-z]+@[a-z]+\.[a-z]+/
 {% endhighlight %}

Nuestra expresión regular ya no parece tan simple como al principio, pero el  
funcionamiento es el mismo. Debemos tener en cuenta los caracteres especiales, en este caso los corchetes que indican &#8220;clases&#8221;.

Sin embargo, esta expresión regular es incompleta. En primer lugar, solo sirve para direcciones de correo que solo tengan caracteres en minúsculas (a no ser que usemos *modificadores</em) tampoco identificaría direcciones de correo con números, caracteres especiales como "_" o "." y ademas, no soportaría otros niveles de dominio (tehsis@yimail.com.ar no seria soportado)  
Para solucionar lo primero, podemos hacer uso de otro &#8220;carácter especial&#8221;, **&#8220;\w&#8221;** el cual buscara todos los caracteres alfanuméricos.  
Nuestra expresión regular ahora tiene la forma  
/\w+@\w+\.\w+/  
Esto ya empieza a asustar, pero conociendo el significado de cada carácter y teniendo en cuenta lo que explique más arriba sobre el funcionamiento, podemos analizarla y entender como funciona.  
Para incluir el punto, podemos volver a utilizar clases como habíamos hecho anteriormente:  
/[\w.]+@\w+\.\w+/  
Hay que notar, que dentro del corchete, el punto es simplemente un punto y no necesitamos escaparlo.</p> 

Existen muchos otros caracteres especiales que podríamos usar, pero para conocerlos recomiendo tener alguna referencia[https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Regular\_Expressions#Using\_Special_Characters] ya que no tiene sentido enumerarlos a todos acá.

Por último, nos queda solucionar el problema de los distintos niveles de dominio.  
Solo para fines prácticos, vamos a suponer que las direcciones de correo que queremos identificar poseen un dominio y luego dos dominios de nivel separados por puntos, el primero de tres letras y el segundo de dos (Ej: yimail.com.ar)

### Repeticiones

Ya vimos un carácter especial para repeticiones (el +), pero en total podríamos nombrar:

  * **+** Una o más unidades. (Ej: /a1+/: a1, a11, a1111, a1111111, etc. Notar que el 1 debe estar al menos una vez.)
  * ***** Cero o más unidades. (Ej: /a1*/: a, a11, a1111, a1111111. etc. Notar que el 1 puede estar o no.) 
  * &#8220;?&#8221; para caracteres que pueden estar o no estar (1 ó ninguno) (Ej: /a1?/: a, a1).

Pero ¿Que pasa en nuestro caso que necesitamos identificar dos palabras separadas por &#8220;.&#8221; una de tres letras y la otra de dos?  
Para esto, vamos a ver otro par de caracteres especiales, muy importantes, las llaves &#8220;{..}&#8221;.

Podemos usarlas de la siguiente forma:

  * **{n}** Identifica n ocurrencias
  * **{n, m}** Identifica al menos n ocurrencias y no más que m.

Nuestra regex sera ahora:

{% highlight js %}
/[\w.]+@\w+\.\w{3}\.\w{2}/
 {% endhighlight %}

### Agrupaciones

Ahora podemos identificar &#8220;tehsis@yimail.com.ar&#8221; pero no &#8220;tehsis@gmail.com&#8221;, para poder contemplar casos como el segundo, vamos a usar el caracter especial &#8220;?&#8221; agrupando la última parte de nuestra regla con parentesis:

{% highlight js %}
/[\w.]+@\w+\.\w{3}(\.\w{2})?/
 {% endhighlight %}</p> 

Los paréntesis cumplen una doble función. Por un lado, nos permiten agrupar reglas para tratarlas como si fuesen una unidad y ademas **capturar** estos grupos (si vemos el array devuelto por &#8220;match&#8221; ademas del string identificado, vamos a ver que tenemos también los strings identificados por las agrupaciones).  
Básicamente lo que estamos diciendo es que &#8220;un punto seguido de dos caracteres, solo puede aparecer una vez&#8221;.  
Y con esto, terminamos lo básico de expresiones regulares.</p> 

Antes de despedirnos, algunas aclaraciones:

  1. Por supuesto que esto no termina acá. Hay muchas cosas que quedaron afuera, empezando por los caracteres especiales que no vimos, hasta algunos modificadores que permiten que la expresión regular se comporte de otra forma. La idea de esta guía es ver lo básico para poder entender y armar nuestras propias expresiones regulares, pero para usarlas a pleno hay que ir un poco más alla.  
    Para más información, recomiendo leer: https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Regular_Expressions  
    Y ademas: http://perldoc.perl.org/perlretut.html que sí bien esta orientado a Perl, la teoria es exactamente la misma (sobre todo porque Ecmascript usa las mismas reglas de Perl)
  2. El ejemplo visto, es solo un ejemplo y seguramente no contempla muchos casos reales en cuanto a las reglas de como debe estar formada una dirección de correo electronico.
  3. Armar correctamente una expresión regular, puede ser complejo y propenso a errores, por lo que recomiendo que intentes armarla por tu cuenta solo en casos excepcionales. Para estructuras conocidas (URLs, fechas, telefonos, etc) recomiendo googlear un poco y agarrar algo ya hecho y testeado.

 [1]: http://es.wikipedia.org/wiki/M%C3%A1quina_de_estados
 [2]: http://tehsis.com.ar/regex1.png