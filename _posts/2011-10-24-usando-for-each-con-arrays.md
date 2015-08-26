---
title: Usando for each con Arrays
author: Pablo Novas
layout: post
permalink: /2011/10/usando-for-each-con-arrays/
dsq_thread_id:
  - 497142005
categories:
  - Lenguaje
tags:
  - array
  - for
  - foreach
---
Escribamos un poco de codigo para recorrer nuestro nuevo array con un *for .. in*:

{% highlight js %}
var arr = [];
arr[1] = 'chau';
arr[2] = 'hola';

for (var ele in arr) {
    //1era iteración: ele === 1
    //2da iteración: ele === 2
    //demas iteraciones: metodos y propiedades del array.
} {% endhighlight %}

Suponiendo que esperamos recorrer cada elemento del array y utilizar su valor, por qué el código anterior no funciona como esperamos?  
El *for each* en javascript itera enumerando las propiedades de un objeto, pero por qué nos devuelve cada index en vez de su contenido?  
En javascript cada objeto es realmente un array de propiedades, por ejemplo:  
<!--more-->

{% highlight js %}
var persona = {
    nombre : 'Pepe',
    edad: 25
};

if (persona.nombre === persona['nombre'])
   console.log('loco, no?'); {% endhighlight %}

y si ahora hacemos:

{% highlight js %}
for (var p in persona){
    //1er iteración: p === 'nombre'
    //2da iteración: p === 'edad'
} {% endhighlight %}

Pero esto no es lo único que deberiamos tener en cuenta, tambien está el caso donde prototipamos el Array:

{% highlight js %}
Array.prototype.unMetodoNuevo = function(){ alert('nuevo metodo');};
var arr = [];

for (var ele in arr){
    //iteraciones: metodos y propiedades del array.
    //ultima iteración: ele será la function unMetodoNuevo
} {% endhighlight %}

Ese es un problema porque no es lo que estamos esperando, queremos que itere sobre los elementos del array, no sus propiedades.  
El punto es que nunca estamos seguros si alguna libreria que estemos usando prototipó el Array (por ej. MooTools realiza prototypes de Array internamente).  
Mi recomendación, entendiendo como se comportan los arreglos y el *for..in* en javascript, es utlizar el for loop cuando realicemos iteraciones sobre un array:

{% highlight js %}
var arr = [];
arr[1] = 'hola';
arr[2] = 'chau';

for (var i=0; i &lt; arr.length; i++){
    //i === 0: arr[0] === undefined;
    //i === 1: arr[1] === 'hola';
    //i === 2: arr[2] === 'chau';
} {% endhighlight %}

De esta manera leemos el array de una forma segura y evitando comportamientos inesperados.

Les dejo un <a title="Usando for each con Arrays" href="http://jsfiddle.net/pjnovas/dLRtW/" target="_blank">jsFiddle</a> para que prueben los casos e intenten nuevas cosas.