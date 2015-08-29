---
title: 'Patrones de Invocación de Funciones: this'
author: pjnovas
layout: post
permalink: /2012/01/patrones-de-invocacion-de-funciones-this/
dsq_thread_id:
  - 549582884
categories:
  - Lenguaje
tags:
  - argumentos
  - funciones
  - prototype
  - sintaxis
  - this
migration_issue: highlightline
---
Cada vez que llamamos a una función en javascript se crea un nuevo contexto, en el cual tenemos *this* y *arguments*, el último lo pueden ver mejor explicado <a href="http://fernetjs.com/2011/11/funciones-argumentos-y-parametros/" title="Funciones: Argumentos y Parámetros" target="_blank">en este post</a>. El *this* se va a inicializar de distintas formas dependiendo de como invoquemos a la función.

Hay 4 patrones para invocar una función:

  * como Método
  * como Función
  * como Constructor
  * y con *Apply*

### Patrón de invocación como Método

Cuando una función es guardada como una propiedad de un objeto, lo llamamos *método*. En este caso *this* es inicializado con el objeto al que pertenece la función.

<!--highlight:[4]-->
{% highlight js %}
var obj = {
    valor: 0,
    incrementar: function(incremento){
       this.valor += incremento;
    }
};

obj.incrementar(2);
console.log(obj.valor); // 2
 {% endhighlight %}

<!--more-->

### Patrón de invocación como Función

Cuando una función no está dentro de un objeto es invocada como función, y *this* es inicializado con el Objeto Global. Esto es un problema, ya que cuando llamamos a una función dentro de otra, *this* sigue referenciando al Objeto Global y si queremos acceder al this de la función padre tenemos que almacenarlo en una variable primero:

<!--highlight:[4]-->
{% highlight js %}
var obj = {
    valor: 0,
    incrementar: function(incremento){ // es invocado como método
       var that = this;

       function otraFuncion(unValor){ //es invocado como función
           //en esta función this referencia al Objeto Global
           that.valor += unValor;
       }

       otraFuncion(incremento);
    }
};

obj.incrementar(2);
console.log(obj.valor); // 2

 {% endhighlight %}

### Patrón de invocación como Constructor

Javascript es un lenguaje de herencia prototipada, lo que significa que un objeto puede heredar directamente propiedades de otro objeto y como su prototipado no es muy convincente, javascript ofrece una sintaxis estilo *creación de objetos* como en los lenguajes clasicos de POO (Programación Orientada a Objetos).  
Dicho esto, cuando invocamos una función con *new* se creará un objeto con una referencia al valor de su miembro de función prototipada (también llamado *constructor*) y *this* tendrá una referencia a este nuevo objeto.

<!--highlight:[2,5]-->
{% highlight js %}
var Persona = function(){ // nuestro "constructor"
    this.nombre = 'José';
}
Persona.prototype.mostrarNombre = function(){
    console.log(this.nombre); //con this accedemos al constructor
}

var p = new Persona();
p.mostrarNombre(); //imprime 'José'
 {% endhighlight %}

> como vimos antes, si invocamos la función Persona() sin el new, *this* se inicializa distinto y nuestra *clase* se va a comportar de forma muy extraña, es por eso que como convención llamamos a las *clases* con la primer letra en mayúscula. 

### Patrón de invocación con Apply

La función *apply* nos deja construir un arreglo de argumentos para usar al invocar una función y también nos deja elegir el valor que tendrá *this*.  
*apply* recibe 2 parametros, el primero es el valor para *this* y el segundo es un arreglo de parámetros.

Usando el ejemplo anterior de prototipado, vamos a cambiar el *this* utilizando el *apply*

<!--highlight:[5,10,15]-->
{% highlight js %}
var Persona = function(){ // nuestro "constructor"
    this.nombre = 'José';
}
Persona.prototype.mostrarNombre = function(){
    console.log(this.nombre); //con this accedemos al constructor
}

//con apply cambiamos el this referenciado al objeto persona por otroObjeto
var otroObjeto = {
    nombre: 'Pepe'
};

var p = new Persona();
p.mostrarNombre(); //imprime 'José'
p.mostrarNombre.apply(otroObjeto); // imprime 'Pepe'
 {% endhighlight %}

Fuente: <a href="http://shop.oreilly.com/product/9780596517748.do" title="JavaScript: The Good Parts" target="_blank">JavaScript: The Good Parts &#8211; Douglas Crockford</a>