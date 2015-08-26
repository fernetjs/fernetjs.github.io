---
title: Aprendiendo con javascript-koans
author: Matias Arriola
layout: post
permalink: /2011/12/aprendiendo-con-javascript-koans/
dsq_thread_id:
  - 514341005
categories:
  - Lenguaje
tags:
  - aprendizaje
  - QUnit
  - testing
---
Navegando por internet me encontré con el<a title="js koans" href="https://github.com/liammclennan/JavaScript-Koans" target="_blank"> javascript-koans</a>, inspirado en <a title="Ruby Koans" href="http://rubykoans.com/" target="_blank">ruby-koans</a>. Es un ambiente para aprender sobre el lenguaje en base a tests.

Se nos provee con una serie de tests, divididos en módulos según la temática. Todos están fallando, con asserts para completar, a modo de &#8220;llenar los espacios en blanco&#8221;. Veamos un ejemplo:

{% highlight js %}
test("typeof", function() {
    equals(typeof({}), __, 'what is the type of an empty object?');
    equals(typeof('apple'), __, 'what is the type of a string?');
    equals(typeof(-5), __, 'what is the type of -5?');
    equals(typeof(false), __, 'what is the type of false?');
});
 {% endhighlight %}

<!--more-->

Este koans usa como motor de tests el conocido <a title="docs de QUnit" href="http://docs.jquery.com/QUnit" target="_blank">QUnit  </a>( <a title="source qunit" href="https://github.com/jquery/qunit" target="_blank">source</a> ), y si bien uno nunca usó QUnit, es muy intuitivo como para usarlo con este propósito. Es más, acá tenemos un ejercicio para aprenderlo:

{% highlight js %}
module("About Asserts (topics/about_asserts.js)");

test("ok", function() {
ok(__, 'what will satisfy the ok assertion?');
});

test("not", function() {
not(__, 'what is a false value?');
});

test("equals", function() {
equals(1+1, __, 'what will satisfy the equals assertion?');
});
 {% endhighlight %}

La resolución sería algo así:

{% highlight js %}
module("About Asserts (topics/about_asserts.js)");

test("ok", function() {
ok(true, 'what will satisfy the ok assertion?');
});

test("not", function() {
not(false, 'what is a false value?');
});

test("equals", function() {
equals(1+1, 2, 'what will satisfy the equals assertion?');
});
 {% endhighlight %}

Ahora tenemos la forma de seguir adelante. Todos los ejercicios que tenemos que resolver se encuentran ubicados en la carpeta /topics.  
Ojo que si bien parece muy para principiantes muchas veces puede servir como un &#8220;refresher&#8221;, dígase refresca-memoria:

{% highlight js %}
test("hasOwnProperty", function() {
    // hasOwnProperty returns true if the parameter is a property directly on the object, 
    // but not if it is a property accessible via the prototype chain.
    var keys = [];
    var fruits =  ['apple', 'orange'];
    for(propertyName in fruits) {
        keys.push(propertyName);
    }
    ok(keys.equalTo(['__', '__', '__']), 'what are the properties of the array?');

    var ownKeys = [];
    for(propertyName in fruits) {
        if (fruits.hasOwnProperty(propertyName)) {
            ownKeys.push(propertyName);
        }
    }
    ok(ownKeys.equalTo(['__', '__']), 'what are the own properties of the array?');
});
 {% endhighlight %}

Forkeen y agreguen ejercicios!!! Se las dejo picando