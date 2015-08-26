---
title: Alcance de Variables (var scope)
author: Pablo Novas
layout: post
permalink: /2011/10/alcance-de-variables-var-scope/
dsq_thread_id:
  - 497142004
categories:
  - Lenguaje
tags:
  - llaves
  - variables
migration_issue: highlightline
---
En javascript las variables son inicializadas con *undefined*, pero ante una segunda declaracion no se inicializan nuevamente, si bien javascript nos permite declarar dos veces la misma variable, **no** es recomendable hacerlo. Pero si declaramos dos o mas veces la misma variable, a partir de la segunda declaración que lee el interpretador comprueba que ya esté declarada y no le modifica su valor ha no ser que esté implicito.

{% highlight js %}
var baz;
console.log(baz); //baz === undefined

var foo = 100;
var foo;
console.log(foo); //foo === 100
 {% endhighlight %}

Las variables en javascript, como en otros lenguajes, poseen un alcance al momento de su declaración indicando donde la puedo utilizar, pero a diferencia de otros lenguajes, en javascript el alcance es por función y no tenemos un alcance de variable por bloque (block-scope), como podría ser un *if*, *for*, *while*, etc. En estos casos la variable sigue teniendo un alcance a su función. Por ejemplo:

<!--highlight:[8,12]-->
{% highlight js %}
function unaFuncion(){
    var i = 100;

    console.log(unaVar); //unaVar === undefined
    console.log(otraVar); //otraVar === undefined

    if (!unaVar) {
        var unaVar = true;
    }
    var otraVar = 'otra variable';

    console.log(unaVar); //unaVar === true
    console.log(otraVar); //otraVar === 'otra variable'
}
 {% endhighlight %}

<!--more-->

  
En el ejemplo anterior declaramos una variable adentro de un if y la leemos luego por fuera. En otros lenguajes ni siquiera compila devolviendo un mensaje de error como &#8220;*unaVar* no está declarada&#8221; en la linea 4.  
Esto demuestra que javascript no tiene un alcance de variable a nivel de bloque. Pero como es que funciona entonces?: simple, el interpretador *alza* la declaracion de la variable hasta el principio de la función, de esta manera la tendremos declarada al alcance de toda la función.  
Usando el ejemplo anterior, será interpretado de la siguiente manera:

<!--highlight:[2,9,11]-->
{% highlight js %}
function unaFuncion(){
    var unaVar, otraVar;
    var i = 100;

    console.log(unaVar); //unaVar === undefined
    console.log(otraVar); //otraVar === undefined

    if (!unaVar) {
        unaVar = true;
    }
    otraVar = 'otra variable';

    console.log(unaVar); //unaVar === true
    console.log(otraVar); //otraVar === 'otra variable'
}
 {% endhighlight %}

Dicho esto, los siguientes ejemplos funcionan de la misma manera sin afectar rendimiento, ni uso de memoria:

{% highlight js %}
function miFuncionA(){
    var unaVar;
    for(var i=0; i&lt;100; i++){
       unaVar = 'algun valor';
    }

    console.log(unaVar);
}
 {% endhighlight %}

{% highlight js %}
function miFuncionB(){
    for(var i=0; i&lt;100; i++){
       var unaVar = 'algun valor';
    }

    console.log(unaVar);
}
 {% endhighlight %}

Continúa en [Parte 2: funciones][1]

 [1]: http://www.fernetjs.com/2011/10/alcance-de-variables-parte-2-funciones/ "Alcance de Variables - Parte 2: functiones"