---
title: Operadores de igualdad ( == y === )
author: Lucas Romero
layout: post
permalink: /2011/11/operadores-de-igualdad-y/
dsq_thread_id:
  - 516951816
categories:
  - Lenguaje
tags:
  - operadores
  - operadores de igualdad
---
**Diferencia**

Veamos con este ejemplo la diferencia entre los operadores &#8216;==&#8217; y &#8216;===&#8217;:

<pre class="brush: jscript; title: ; notranslate" title="">var a = [1,2,3,4]; 
var b = [1,2,3,4];  
var c = { x: 1, y: 2, z: 3 }; 
var d = { x: 1, y: 2, z: 3 };  
var e = "hello"; 
var f = "he" + "llo";  

alert((a == b));           // false
alert((a === b));           // false  

alert((c == d));            // false 
alert((c === d));           // false  

alert((e == f));            // true 
alert((e === f));           // true

alert((true == 1)); //true
alert(("2" == 2)); //true

alert((true === 1)); //false 
alert(("2" === 2)); // false

</pre>

Javascript tiene dos operadores de igualdad &#8216;===&#8217; y &#8216;==&#8217;. El operador &#8216;===&#8217; retornará true si los dos operandos son del mismo tipo ***Y*** tienen el mismo valor.  
En cambio, el operador &#8216;==&#8217; intenta forzar una conversión si los operandos son de distinto tipo para luego comparar los valores.  
Veamos otro ejemplo:  
<!--more-->

<pre class="brush: jscript; title: ; notranslate" title="">var a = [1,2,3,4]; 
var b = [1,2,3,4]; 
var c = a;  
var ab_igualdad = (a === b); // false 
var ac_igualdad = (a === c); // true 
</pre>

En realidad el operador &#8216;===&#8217; verifica que ambos operandos apunten al mismo objeto o en el caso de tipo de datos de valor que ambos operandos tengan el mismo valor.  
Veamos un ejemplo de esto con strings:

<pre class="brush: jscript; title: ; notranslate" title="">alert(("fernetjs" == new String("fernetjs")));    // true 
alert(("fernetjs" === new String("fernetjs")));   // false 
</pre>

Acá vemos que con &#8216;===&#8217; da false porque hablamos de distintos objetos.

**Performance**

Se corrió lo siguiente 6 veces con cada operador de igualdad y los resultados arrojaron una mejor performace con el operador &#8216;===&#8217;.

<pre class="brush: jscript; title: ; notranslate" title="">console.time("testEquality"); 
var n = 0; 
while(true) {     
    n++;     
    if(n==100000) break; 
        
        } 
console.timeEnd("testEquality"); 

    
console.time("testTypeEquality"); 
var n = 0; 
while(true) {     
n++;     
if(n===100000) break; 
} 
console.timeEnd("testTypeEquality"); 

//16.83 en promedio con '=='
//16.5 en promedio con '==='
</pre>

Usen la implementación de console.time and console.timeEnd en caso de que prueben  
con explorer 8:

<pre class="brush: jscript; title: ; notranslate" title="">if(window.console && typeof(window.console.time) == "undefined") {
    console.time = function(name, reset){
        if(!name) { return; }
        var time = new Date().getTime();
        if(!console.timeCounters) { console.timeCounters = {} };
        var key = "KEY" + name.toString();
        if(!reset && console.timeCounters[key]) { return; }
            console.timeCounters[key] = time;
        };

    console.timeEnd = function(name){
        var time = new Date().getTime();
        if(!console.timeCounters) { return; }
        var key = "KEY" + name.toString();
        var timeCounter = console.timeCounters[key];
        if(timeCounter) {
            var diff = time - timeCounter;
            var label = name + ": " + diff + "ms";
            console.info(label);
            delete console.timeCounters[key];
        }
        return diff;
    };
}
</pre>

Conclusión: aunque la diferencia no es grande (dependiendo del caso), vemos que con &#8216;===&#8217; obtuvimos un mejor tiempo.

Las buenas prácticas nos dicen que siempre debemos usar &#8216;===&#8217; para evitar errores lógicos y de performance a menos que tengamos en claro que usamos &#8216;==&#8217; por alguna razón.