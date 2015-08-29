---
title: 'Alcance de Variables &#8211; Parte 2: funciones'
author: pjnovas
layout: post
permalink: /2011/10/alcance-de-variables-parte-2-funciones/
dsq_thread_id:
  - 497142012
categories:
  - Lenguaje
tags:
  - funciones
  - llaves
  - variables
migration_issue: highlightline
---
Como segunda parte de [Alcance de Variables][1] vamos a ver como se comportan las funciones.

En la parte 1 vimos que las declaraciones de variables son *alzadas* al principio de la función por el interpretador. Bueno, las declaraciones de funciones también lo son.

{% highlight js %}
function miFunction(){
    foo();

    function foo(){
       console.log('foo fue llamada!');
    }
}
 {% endhighlight %}

De la misma manera que en la declaracion de variables, el interpretador alzó la declaracion de la función *foo* al principio:

<!--highlight:[2,3,4]-->
{% highlight js %}
function miFunction(){
    function foo(){
       console.log('foo fue llamada!');
    }

    foo();
}
 {% endhighlight %}

En javascript podemos asignar funciones a variables, ya sean anónimas o nombradas, donde el *alzado* del interpretador puede ser un poco confuso.  
<!--more-->

### Función Anónima

{% highlight js %}
function miFuncion(){
    foo(); // TypeError "foo no es una función"

    // Expresion de función anónima
    var foo = function () {
        console.log('función llamada!');
    };

    foo(); // resulta en: función llamada!
}
 {% endhighlight %}

Lo que pasó en ese caso es que el interpretador *alzó* la declaracion de la variable *foo*, pero no así su asignación:

<!--highlight:[2,5]-->
{% highlight js %}
function miFuncion(){
    var foo;
    foo(); // simplemente es una variable! foo === undefined

    foo = function () {
        console.log('función llamada!');
    };

    foo(); // ahora sí es una función
}
 {% endhighlight %}

### Función Nombrada

{% highlight js %}
function miFuncion(){
    foo(); // TypeError "foo no es una función"
    baz(); // ReferenceError "baz no está definida"

    // Expresion de función nombrada asignada a una variable
    var foo = function baz() {
        console.log('función llamada!');
    };

    foo(); // resulta en: función llamada!
    baz(); // ReferenceError "baz no está definida"
}
 {% endhighlight %}

Sucede lo mismo, con la diferencia que no podemos llamar a la función nombrada desde afuera ya que su alcance no se encuentra en nuestra función, es decir, *baz* directamente no fue *alzada* porque ni siquiera se encuentra al alcance de *miFuncion*, no sabe que existe.  
Veamos como fue interpretado:

<!--highlight:[2,6]-->
{% highlight js %}
function miFuncion(){
    var foo;
    foo(); // simplemente no es una función todavía.
    baz(); // baz no existe, no fue declarada.

    foo = function baz() {
        console.log('función llamada!');
    };

    foo(); // ahora sí es una función.
    baz(); // sigue sin existir en este alcance.
}
 {% endhighlight %}

### Como escribir código conociendo todo esto?

Entender como es interpretado nuestro código nos ayuda a ser mas cautelosos al desarrollar evitando problemas futuros. Mi recomendación es que intenten tener **un solo** *var* al principio de cada función con todas las declaraciones, ya que al fin y al cabo, va a ser interpretado de la misma manera. 

#### Por último les dejo traducido lo que dice el *standard* <a href="http://www.ecma-international.org/publications/standards/Ecma-262.htm" title="ECMAScript Standard" target="_blank">ECMAScript Standard (pdf)</a>:

*Si la declaración de la variable se produce dentro de una función, las variables se definen con alcance local en esa función. De lo contrario, se definen con un alcance global (es decir, se crean como los miembros del objeto global). Las variables se crean cuando el ámbito de ejecución está introducido. Un bloque no define un nuevo alcance de ejecución. Sólo program y function producen un nuevo alcance. Las variables se inicializan en undefined cuando se crean. Una variable con un inicializador se le asigna el valor cuando la instrucción se ejecuta, no cuando la variable se crea.*

 [1]: http://www.fernetjs.com/2011/10/alcance-de-variables-var-scope/ "Alcance de Variables - Parte 1"