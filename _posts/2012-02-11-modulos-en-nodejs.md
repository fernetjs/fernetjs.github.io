---
title: Módulos en NodeJS
author: Pablo Novas
layout: post
permalink: /2012/02/modulos-en-nodejs/
dsq_thread_id:
  - 572403876
categories:
  - Server Side
tags:
  - exports
  - funciones
  - modulos
  - nodejs
  - variables
migration_issue: highlightline
---
NodeJS tiene un sistema de módulos bastante simple: cada archivo .js es un modulo (archivo de servidor, no confundir con contenido estático), veamos 2 módulos que se encuentran en el directorio root y son utilizados desde nuestro server app.js:

{% highlight js %}
app.js //servidor NodeJS
   foo.js //un módulo
   bar.js //otro módulo
 {% endhighlight %}

{% highlight js %}
var http = require('http'); // módulo Core de Node
    var foo = require('./foo.js');
    var bar = require('./bar');
 {% endhighlight %}

En nuestro app.js referenciamos a ambos módulos foo y bar, con *&#8216;./&#8217;* es el path relativo al que lo esta llamando, en este caso *app.js*.

> Si utilizamos *&#8216;/&#8217;* vamos a estar indicando el path absoluto al archivo y si no usamos *&#8216;/&#8217;* ni *&#8216;./&#8217;* es un módulo Core o está en la carpeta node_modules. 

Se puede escribir o no la extension, ya que Node primero comprueba que exista el nombre exacto, despues prueba con extension *.js*, después *.json* y luego *.node*. Por lo que de una va a encontrar el bar.js.

<!--more-->

Los archivos *.js* son interpretados como archivos de texto javascript, los archivos *.json* son parseados como archivos de texto JSON y *.node* son interpretados como modulos addons compilados con *[dlopen][1]* 

En cada módulo tenemos como objeto global el *module* y dentro de este, un objeto *exports* con el cual vamos a publicar los accesos a nuestro módulo desde otros.

{% highlight js %}
//podemos evitar el module, ya que es nuestro global
exports.enviarMensaje = function(mensaje) {
    console.log('Mensaje recibido en módulo foo: ' + mensaje);
}; 
 {% endhighlight %}

{% highlight js %}
var foo = require('./foo.js');
foo.enviarMensaje('hola módulo foo!');
//imprime: Mensaje recibido en módulo foo: hola módulo foo!
 {% endhighlight %}

> La asignacion al *exports* tiene que ser inmediata, no podemos hacerla en callbacks, por ejemplo esto no funciona:
> 
> {% highlight js %}
setTimeout(function() {
   module.exports.algo = true;
}, 100)
 {% endhighlight %}

Si declaramos una variable dentro de un módulo, esta va a ser privada al módulo, recuerden que si no la asignamos al objeto *exports* no va a ser accesible desde otro módulo:

{% highlight js %}
var nombre = 'Pepe';

exports.getNombre = function (){
      return nombre;
};
 {% endhighlight %}

Si no ponemos el *var* que pasa?, bueno estamos asignando al objeto global, pero el global del módulo, por lo que es lo mismo que lo pongamos o no, de todas formas, siempre es mejor poner el *var* porque nos puede pasar lo siguiente:

<!--highlight:[1]-->
{% highlight js %}
exports.algo = function (){
   foo = 'Pepe';
   var baz = 'Pepe2';
};
 {% endhighlight %}

En ese caso *foo* va a ser global para todo el módulo, y puede que no sea algo que esperamos:

{% highlight js %}
var foo;
exports.algo = function (){
   foo = 'Pepe';
   var baz = 'Pepe2';
};
 {% endhighlight %}

De esa forma queda claro que usamos la global *foo* en la funcion y creamos una *baz* a nivel de la función.  
Pueden ver mas sobre el comportamiento del *var* en [Alcance de Variables (var scope)][2] y [Variables Globales][3]

 [1]: http://en.wikipedia.org/wiki/Dynamic_loading
 [2]: http://fernetjs.com/2011/10/alcance-de-variables-var-scope/ "Alcance de Variables (var scope)"
 [3]: http://fernetjs.com/2011/11/variables-globales/ "Variables Globales"