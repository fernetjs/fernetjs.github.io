---
title: Manejando Errores
author: Pablo Novas
layout: post
permalink: /2012/12/manejando-errores/
dsq_thread_id:
  - 970694783
categories:
  - Client Side
  - Lenguaje
  - Server Side
tags:
  - argumentos
  - asincronismo
  - Error
  - funciones
  - nodejs
  - parámetros
migration_issue: highlightline
---
Algo necesario en todo lenguaje de programación es el manejo de errores. Lamentablemente en JS es poco usado y en llamadas asíncronas está mal usado la mayoría de las veces. Es por eso que armo este post para que nos enteremos de que el objeto Error existe en JS y nos sirve mucho mas de lo que sabemos y/o creemos.

Arrancamos con un ejemplo común:

{% highlight js %}
try {
  //.. venimos haciendo cosas 
  throw "disparo un error!";
}
catch(e){
  console.log(e); // "disparo un error!"
}
 {% endhighlight %}

Bueno, tiramos un error que es un string, pero podemos hacerlo mejor:

{% highlight js %}
try {
  //.. venimos haciendo cosas 
  throw new Error("disparo un error!");
}
catch(e){
  console.log(e.message); //"disparo un error!"
  console.log(e.stack); //Error: disparo un error! at http://localhost/:3:2 at condition .... 
}
 {% endhighlight %}

Ahh, ahora se vé mucho mejor, tenemos el stack y el mensaje por separado y si hacemos un *throw e;* vamos a ver el error completito en la consola (o en el terminal en el caso de NodeJS). O sea, que ahora es un objeto, no mas cadenas voladas en el *eter*.

> Cómo vimos en [otro post][1], el alcance de las variables es a nivel de función, pero para el catch, nuestra variable e tiene alcance SOLO dentro del catch:
> 
> {% highlight js %}
console.dir(e); //error: e no está declarada
catch(e){
  console.dir(e); //jeje   
}
console.dir(e); //error: e no está declarada
 {% endhighlight %}

Manejar errores de esta manera nos trae muchas facilidades, aparte de tener el Stack y de tener realmente una Excepcion y no un string, nos abre las puertas para empezar a manejar errores enserio, ahora podemos:

### Crear nuestros Tipos de Errores:

<!--highlight:[5,6]-->
{% highlight js %}
function MiError(mensaje) {
  this.name = "MiError";
  this.message = mensaje || "No Especificado";
}
MiError.prototype = new Error();
MiError.prototype.constructor = MiError;
 
try {
  throw new MiError("explotó!");
} catch (e) {
  console.log(e.name);     // "MiError"
  console.log(e.message);  // "explotó"
  console.log(e.stack);  // Error: explotó! at http://localhost/:9:2 at condition .... 
  console.log(e instanceof MiError); //true
}
 {% endhighlight %}

Simplemente extendemos la clase *Error* con nuestro nuevo tipo de error <img src="http://fernetjs.com/wp-includes/images/smilies/simple-smile.png" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" />

Al tener tipos propios de errores, es seguro que vamos a necesitar catchear cada tipo, porque para eso los creamos, ya que esto no es un feo string y ahora es una clase, podemos comprobar por instancia para que quede prolijo:

<!--highlight:[4]-->
{% highlight js %}
try {
  throw new MiError("explotó!");
} catch (e) {
  if (e instanceof MiError){
    console.log('fue MiError');
  }
  else {
    console.log('fue otra cosa así que disparo un error no manejado');
    throw e;
  }
}
 {% endhighlight %}

> Van a ver por ahí casos donde se utiliza: 
> 
> {% highlight js %}
catch(e if e instanceof MiError) {% endhighlight %}
> 
> Cuidado con eso porque solo lo soporta Mozilla y no es parte del Standard ECMAScript. </blockquote> 
> 
> Aparte del *coqueto* Error (piénsenlo como la clase *Exception* de C# o Java, sería el error más genérico), también tenemos otras Excepciones ya definidas que heredan de Error: 
> 
>   * EvalError
>   * RangeError
>   * ReferenceError
>   * SyntaxError
>   * TypeError
>   * URIError
> 
> > Todo este manejo de errores funciona tanto en el cliente, como en el servidor con NodeJS. Lo que hay que tener en cuenta es que algunos navegadores ancianos no soportan la clase Error, pero hablamos de navegadores muy ancianos.
> > 
> > Para el cliente también hay otros tipos de excepciones ya definidas por ejemplo **DOMExceptions** (este va a depender de los niveles de DOM y del navegador, pero va para otro post :)) 
> 
> ### Manejando errores en Callbacks
> 
> Ahora bien, tenemos otro caso de manejo de errores, los famosos y amados [callbacks][2], como manejaríamos los errores?, tenemos un tema, no deberíamos hacer un throw ya que un callback puede ejecutarse en otro momento (asíncrono) y disparar una excepción dentro de un callback en otro *tiempo* puede traer graves problemas.
> 
> Lo que se utiliza, y no se bien si realmente es un standard (en NodeJS), es tener un argumento más (**el primero**) en cada callback, el cual va a ser el error:
> 
> {% highlight js %}
dao.leerDatos(function(error, datos){
   // en error tengo la excepcion (pero no hay try/ catch)
});
 {% endhighlight %}
> 
> Porque el argumento *error* en el primer lugar?, yo creo que viene por el lado del *opcional*, en JavaScript ningún argumento es obligatorio, podemos definirlos o no, y usarlos o no, no estamos obligados a seguir una *firma* de métodos/ funciones como en otros lenguajes. Entonces de esta manera si queremos agarrar el argumento *datos* estamos obligados a agregar el argumento *error*, por su orden 😛
> 
> Es por eso que en el caso de un callback que no devuelve nada, simplemente se dispara cuando algo termina, lo ideal sería que igualmente tenga un argumento error:
> 
> {% highlight js %}
dao.guardar(entidad, function(error){
  // etc ..
});
 {% endhighlight %}
> 
> Bueno, y como manejo si hubo error o no?, ya que no hay try/ catch?
> 
> <!--highlight:[2,4]-->
{% highlight js %}
dao.leerDatos(function(error, datos){
  if (error) {
    // manejo el error.
    return;
  }
  
  console.dir(datos);
});
 {% endhighlight %}
> 
> Simple!, compruebo si *error* es un [valor verdadero][3] y recuerden hacer un return, o salir de ese callback de alguna otra forma, ya que sino la función continuará su ejecución, y no me suena a que queremos que suceda.
> 
> Mirando esto mismo de quien llama a ese manejo podemos ver como funciona:
> 
> <!--highlight:[5,10]-->
{% highlight js %}
function hacerLlamada(termino) {
  
  dao.leerDatos(function(error, datos){
    if (error) {
      termino(error);
      return;
    }
    
    // algún calculo mágico
    termino(null, datos);
  });
}

hacerLlamada(function(err, datos){
  if (err) throw err;
  else console.dir(datos);
});

 {% endhighlight %}
> 
> El ejemplo no es lo más feliz, pero lo que te quiero mostrar es como sería el que llama a esa función con otro callback. De está manera nos queda el código mucho mas ordenado y con los errores bien manejados, como si hubiera un try y catch (que va subiendo en su ejecución a medida que es disparado y atrapado por el que lo llamó), hacemos lo mismo con callbacks y somos todos felices :). 
> 
> #### Links útiles y fuentes de info 😉
> 
>   * [String is not an Error][4] por Guille Rauch
>   * [JavaScript Errors &#8211; Throw and Try to Catch][5] W3School
>   * [Error en MDN (MOZILLA DEVELOPER NETWORK)][6]

 [1]: http://fernetjs.com/2011/10/alcance-de-variables-var-scope/ "Alcance de Variables (var scope)"
 [2]: http://fernetjs.com/2011/12/creando-y-utilizando-callbacks/ "Creando y utilizando callbacks"
 [3]: http://fernetjs.com/2012/04/valores-falsos-y-verdaderos/ "Valores falsos y verdaderos: || y &&"
 [4]: http://www.devthought.com/2011/12/22/a-string-is-not-an-error/
 [5]: http://www.w3schools.com/js/js_errors.asp
 [6]: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Error