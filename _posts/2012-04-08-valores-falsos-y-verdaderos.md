---
title: 'Valores falsos y verdaderos: || y &#038;&#038;'
author: Pablo Novas
layout: post
permalink: /2012/04/valores-falsos-y-verdaderos/
dsq_thread_id:
  - 641354887
categories:
  - Lenguaje
tags:
  - booleanos
  - sentencia
  - sintaxis
  - variables
---
Antes de hacer un *if* en cualquier lenguaje es importante entender que es *false* y que es *true* además de un booleano. 

{% highlight js %}
function unaFuncion(){
  if (foo){
    foo = true;
  }

  var foo = true;
}
 {% endhighlight %}

Entra al *if* ?, la respuesta es no &#8230; pero no entra porque vale *false* o *null*, sino porque vale *undefined*, la [declaracion de la variable se alzó][1] al principio de la función por el interpretador, pero no así su asignación. Y todo valor undefined resulta en falso.

{% highlight js %}
function unaFuncion(){
  var foo = '';
  
  if (!foo && !foo.length){
    foo = 'false';
  }

  if (foo) 
    console.log('mmm entro?');
}
 {% endhighlight %}

Ahora *foo* no vale *undefined*, ni *null*, ni *false*, sin embargo un string vacio y el numero 0 son valores falsos, no siendo asi &#8216;false&#8217;, el cual es muy conocido en la jerga de scripting por ejemplo al asignar un &#8216;false&#8217; a un hidden y después preguntar contra su valor en un if: &#8216;false&#8217; es un string, el cual no es vacio, por lo tanto resulta en *true*.  
  
Algunos errores comunes:

{% highlight js %}
function unaFuncion(){
  var foo = 'hola';
  if (!parseFloat(foo)){
    console.log('devuelve NaN, otro valor falso');
  }

  foo = '0';
  if (!parseFloat(foo)){
    console.log('no devuelve NaN, pero al convertirlo vale 0 y es otro valor falso');
  }

  var baz = [];
  if (baz)
    console.log('No está dentro de los valores falsos');
  
  //deberiamos comprobarlo asi
  if (baz.length)
    console.log('este mensaje no se logea, porque es 0 y resulta en false');
}
 {% endhighlight %}

#### Valores Falsos (falsy values)

  * false
  * null
  * undefined
  * `""` (string en blanco)
  * el número 0
  * el número NaN (si, Not A Number es un número, pero uno *especial*)

**Todos los demas valores, incluyendo el famoso string *&#8216;false&#8217;* y cualquier objeto resulta en *true***

* * *

#### Usando || y &&

Ahora que sabemos que valores son falsos, tenemos que entender que || y && no retornan booleanos, como en otros lenguajes:

{% highlight js %}
var nombre = 'pepe';
var apellido = 'gonzales';
var sobreNombre = '';
var edad = 65;
var novia = null;
var amigos = 0;

var apellido = (nombre && apellido); 
var sobreNombre = (nombre && apellido && sobreNombre); 
var edad = (nombre && apellido && edad);
var foreverAlone = (novia || amigos);
 
console.log(apellido); //logea 'gonzales'
console.log(sobreNombre); //logea ''
console.log(edad); //logea 65
console.log(foreverAlone); //logea 0
 {% endhighlight %}

En ningun caso retorno *true *o *false*, **en javascript || y && retornan el último valor evaluado**, es decir, en el caso de || si el primero es verdadero lo retorna, sino retorna el siguiente, pero en el caso del && retorna el siguiente al último verdadero. Para este caso se aplican los mismos valores *falsos* que vimos antes en la tabla.

Un ejemplo de mas real de su uso:

{% highlight js %}
function unaPersona(opciones){
  var nombre = (opciones && opciones.unNombre) || 'Sin Nombre';
  console.log(nombre);
}

unaPersona({ unNombre: 'Pepe' }); //logea: Pepe 
unaPersona({ }); //logea: Sin Nombre
unaPersona({ unNombre: '' }); //logea: Sin Nombre
unaPersona(null); //logea: Sin Nombre 
 {% endhighlight %}

Se puede utilizar para valores default. En este caso simplemente hago la comprobacion de que opciones no sea undefined o null, luego que tambien tenga una propiedad unNombre que no sea undefined, ni null, ni un string vacio (o sea, los valores falsos de la tabla), si ambos son verdaderos, retorno el último, sino salgo por el || y guardo &#8216;Sin Nombre&#8217;.

Al principio puede ser confuso, ya que no es lo común, en la mayoria de los lenguajes retorna un booleano, pero una vez que se acomodan a su uso se le puede sacar un buen provecho.

 [1]: http://fernetjs.com/2011/10/alcance-de-variables-var-scope/ "Alcance de Variables (var scope)"