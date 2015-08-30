---
title: Trabajar con arreglos en javascript (parte 2)
author: Fernando Rodriguez
layout: post
permalink: /2012/12/trabajar-con-arreglos-en-javascript-parte-2/
dsq_thread_id:
  - 956191050
categories:
  - Lenguaje
tags:
  - array
---
Como prometí anteriormente en <a href="http://fernetjs.com/2012/10/trabajar-con-arreglos-en-javascript-parte-1/" title="Trabajar con arreglos en javascript (parte 1)" target="_blank">Trabajar con arreglos en javascript (parte 1)</a>, voy a presentar en esta oportunidad 3 útiles e interesantes métodos que posee la clase array: **some**, **every** y **reduce**.

Estos ejemplos que muestro a continuación (solo simplificados para que no sea tan tedioso explicarlos y entenderlos) son piezas de código genuinas que sirven para comprender la utilización de los métodos mencionados en un contexto real.

Se define la clase Usuario que posee la complejidad mínima y necesaria para exhibir los ejemplos.

Usuario es una clase trivial con 3 propiedades: **id**, **nombre** y **esAdmin** y el método **validar** que devuelve 2 errores.  
Se construye el arreglo **usuarios** con 3 objetos de esa clase.

{% highlight js %}
function Usuario(nombre, esAdmin, id){	
	this.nombre = nombre;
	this.esAdmin = esAdmin;
	this.id = id;
		
	this.validar = function (){
		return ["error1 " + nombre, "error2 " + nombre];
	};
};

var usu1 = new Usuario('Juana', false);
var usu2 = new Usuario('Pedro', false);
var usu3 = new Usuario('Alberta', true);

var usuarios = [usu1, usu2, usu3];
 {% endhighlight %}

</br>

<h2 style="text-align: center">
  some
</h2>

Dada una función, **some** devuelve verdadero si algún elemento del arreglo cumple con la misma.  
El objetivo de este ejemplo es escribir el código necesario para saber si alguno de los usuarios es administrador.

#### Usando for:

{% highlight js %}
var hayAlMenosUnAdministrador = false;
for (var i; i < usuarios.length; i++) {
	var usuario = usuarios[i];
	if (usuario.esAdmin) 
		hayAlMenosUnAdministrador = true;        
}
 {% endhighlight %}

#### Usando some:

{% highlight js %}
var hayAlMenosUnAdministrador = usuarios.some(function(usuario){
	return usuario.esAdmin;
})
 {% endhighlight %}

#### Usando some pero más prolijo:

{% highlight js %}
var esAdmin = function(usuario){
	return usuario.esAdmin;
};

var hayAlMenosUnAdministrador = usuarios.some(esAdmin);
 {% endhighlight %}

</br>

<h2 style="text-align: center">
  every
</h2>

Dada una función, **every** devuelve verdadero si todos los elementos del arreglo cumplen con la misma.  
El objetivo de este ejemplo es practicamente la misma idea anterior, solo que en este caso el objetivo es saber si todos los usuarios son administradores.

{% highlight js %}
var sonTodosAdmin = usuarios.every(esAdmin);
 {% endhighlight %}

</br>

<h2 style="text-align: center">
  reduce
</h2>

**reduce** aplica una función que toma como parámetros el valor acumulado y el elemento actual del arreglo. Esa función devuelve el nuevo valor acumulado. El segundo parámetro de **reduce** recibe el valor inicial acumulado.  
El objetivo de este ejemplo es escribir el código necesario para construir un arreglo con todos los errores de validación de todos los usuarios. Recordemos que cada objeto usuario posee el método **validar** que devuelve los errores de validación del mismo.

#### Usando for:

{% highlight js %}
var todosLosErrores = [];
for (var i = 0; i < usuarios.length; i++){
	var usuario = usuarios[i];
	var errores = usuario.validar();
	
	for (var e = 0; e < errores.length; i++)
		todosLosErrores.push(e);
}
 {% endhighlight %}

#### Mejorado:

{% highlight js %}
var todosLosErrores = [];
for (var i = 0; i < usuarios.length; i++){
	var usuario = usuarios[i];
	var errores = usuario.validar();	
	todosLosErrores = todosLosErrores.concat(errores);
}
 {% endhighlight %}

#### Usando reduce:

{% highlight js %}
var todosLosErrores = usuarios.reduce( function(errores, usuario){
	return errores.concat(usuario.validar());
},[]);
 {% endhighlight %}

#### Usando reduce pero más prolijo:

{% highlight js %}
var agregarErrores = function(errores, usuario){
	return errores.concat(usuario.validar());
}
var todosLosErrores = usuarios.reduce(agregarErrores,[]);
 {% endhighlight %}

En la tercera parte de este artículo se muestran ejemplos de los métodos: **forEach**, **filter** y **map**.