---
title: 'ECMAScript 5.1 &#8211; Strict Mode y JSON'
author: Pablo Novas
layout: post
permalink: /2011/12/ecmascript-5-1-strict-mode-y-json/
dsq_thread_id:
  - 506693429
categories:
  - Client Side
  - Lenguaje
tags:
  - argumentos
  - ECMAScript
  - eval
  - funciones
  - json
  - parámetros
  - strict mode
  - variables
  - with
---
Ya podemos empezar a utilizar lo nuevo del <a href="http://en.wikipedia.org/wiki/ECMAScript" target="_blank">ECMAScript</a> en los últimos exploradores.  
Estas son dos interesantes del <a href="http://www.ecma-international.org/publications/standards/Ecma-262.htm" target="_blank">nuevo standard (5.1)</a>:

  * Strict Mode
  * JSON

<!--more-->Soporte de exploradores (para los temas de este post, no todo el ECMAScript 5.1):

  * Firefox 4
  * Chrome 13
  * Safari 5.1
  * Opera 11.6
  * Internet Explorer 9 (sólo *JSON*, *Strict Mode* va a estar para la versión 10)

* * *

### Strict Mode

Aplicando el Modo Estricto en el código es una forma de restringir lo que hacemos en nuestro javascript validando *esas cosas* que javascript nos deja hacer y despues tenemos problemas difíciles de solucionar.

{% highlight js %}
"use strict";
 {% endhighlight %}

Eso es todo, simplemente un string y el interpretador se va a encargar de usarlo. Al ser un string, los exploradores que no lo conocen simplemente no lo van a utilizar, pero tampoco va a dar ningun tipo de error.

Lo interesante de este *modo* es que nos ayuda a programar de una forma *más sana* en javascript, alguna de las cosas que nos va a validar:

**variables**
:   Declaración de variables obligatoria: Dispara un error si asignamos una variable que no declaramos con var previamente.</p> 
    
    {% highlight js %}
function variables(){
    var foo;

    bus = true; // Error

    foo = true //OK
    var baz = true //OK
}
 {% endhighlight %}

**delete**
:   Utilizar *delete* para borrar una variable, función o argumento dispara un error.</p> 
    
    {% highlight js %}
var foo = true;
delete foo; // Error

function mifuncion(){}
delete mifuncion; // Error

function mifunction2(args) {
    delete args; // Error
}

 {% endhighlight %}

**eval y with**
:   Utilizar *eval* o *with* está prohibido, por lo que cualquier uso de los mismos dispara un error.</p> 
    
    {% highlight js %}
eval("alert('algo');"); // Error

with document { // Error
   write('algo1');
   write('algo2');
} 
 {% endhighlight %}

**propiedades o parametros duplicados**
:   Definir propiedades mas de una vez en un objeto literal o definir mas de una vez parametros en una función resultan en error.</p> 
    
    {% highlight js %}
var persona = {
   nombre: 'josé',
   edad: 25,
   nombre: 'pepe' // Error
};

function unaFuncionPersona(nombre, edad, nombre) { // Error
   // algo
}
 {% endhighlight %}

Por último, podemos utilizar el modo estricto encapsulado, es decir, este *modo* cumple con el alcance (scope) de una variable/ función en js, por lo que podriamos decir:

{% highlight js %}
// código no estricto

function mifunction(){
  "use strict";
   // código estricto
}

// código no estricto
 {% endhighlight %}

* * *

### JSON

Si ya estuvieron trabajando con serializaciones de objetos en javascript (JSON) seguramente usaron el famoso script <a href="http://www.json.org/" title="JSON" target="_blank"><em>json2.js</em></a> o alguna otra librería. 

{% highlight xml %}
&lt;script type="text/javascript" src="json2.js" &gt;&lt;/script&gt;
 {% endhighlight %}

{% highlight js %}
function objeto_a_string(objeto) {
   return JSON.stringlify(obj);
}
var cad = objeto_a_string({nombre:'pepe', edad:25});


function string_a_objeto(cadena) {
   return JSON.parse(cadena);
}
var obj = string_a_objeto("{'nombre':'pepe', 'edad':25}");
 {% endhighlight %}

Bueno, en este nuevo standard ya tenemos la clase JSON incluida, no necesitamos referenciarla a otra librería. Lo bueno es que si usabamos json2.js, no necesitamos cambiar nada en el código, ya que los métodos de la clase JSON siguen siendo iguales. Sólo deberiamos cambiar la referencia en el HTML para que si es una version de explorador que no lo soporta, esté incluida. 

Por ejemplo:

{% highlight xml %}
&lt;!--[if lt IE 8]&gt;
   &lt;script type="text/javascript" src="json2.js" &gt;&lt;/script&gt;
&lt;![endif]--&gt;
 {% endhighlight %}

De esta manera cubrimos el caso en que esté utilizando un explorador viejo de internet explorer, sino, dejamos que el motor del explorador se encargue.  
Si utilizan otra librería, no saquen su referencia todavia y piensen en cambiarlo de a poco. Para el cliente es un pedido y una descarga menos del servidor.