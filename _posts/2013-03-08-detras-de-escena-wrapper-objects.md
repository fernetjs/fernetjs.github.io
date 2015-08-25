---
title: 'Detrás de escena: wrapper objects'
author: Matias Arriola
layout: post
permalink: /2013/03/detras-de-escena-wrapper-objects/
dsq_thread_id:
  - 1125065544
categories:
  - Lenguaje
tags:
  - tipos de datos
---
Muchas cosas de las que voy a compartir ahora, las aprendí hace relativamente poco y me permitieron entender algunos de los WTF que se ven en javascript. Creo que el típico `'string' vs. new String('string')` es uno de los conceptos que uno dá por sentado y nunca se cuestiona lo suficiente.

Cuando leí <a href="https://hacks.mozilla.org/2012/12/performance-with-javascript-string-objects/" title="Performance with javascript strings (inglés)" target="_blank">este artículo</a> que habla sobre la performance en objectos String, aparte de pensar &#8220;que bueno debe ser tener tiempo para hacer experimentos como esos&#8221;, me topé con la teoría detrás de los &#8216;wrapper objects&#8217;. De ahí, llegué a <a href="http://kiro.me/blog/wrapper_objects.html" title="wrapper objects en kiro.me (inglés)" target="_blank">este link</a> que me parece absolutamente recomendable (al igual que el resto del blog). Casi todo lo que escriba de acá en adelante, tal vez sea parafrasear o hablar un poco más de lo mismo que en esos enlaces.

> En JavaScript, los strings, los numeros, los booleanos, no son objetos; son tipos primitivos. Por consiguiente, no tienen propiedades. Es decir, &#8216;un string&#8217; no tiene ni indexOf, toUpperCase, ni length&#8230; Nada. 

### ¿Entonces?

Después de leer eso, vale la pena abrir la consola de javascript, ¿ Por qué puedo hacer `'fernet'.concat('js')` ???

La respuesta es sencilla: por detrás, lo que ocurre es que el string &#8216;fernet&#8217; es automáticamente convertido a un objeto String, es decir a `new String('fernet')`, y ese objeto es el que tiene todas las propiedades y métodos que conocemos; por eso es posible aplicarle el `concat`.  
El método concat devuelve un string primitivo, aunque la misma conversión automática ocurriría si quisieramos utilizar alguna de sus propiedades.

<pre class="brush: jscript; title: ; notranslate" title="">typeof 'fernet' // "string"
typeof 'fernet'.concat('js') // "string"
'fernet'.concat('js').toUpperCase() // "FERNETJS"
</pre>

Vuelvo a insistir con lo mismo para aquellos que no acostumbren a hacerlo: experimentar con la consola js de las herramientas de desarrollo de su navegador favorito es una de las mejores maneras de aprender, descubrir nuevos conceptos, y reconfirmar las cosas que ya sabemos. 

<pre class="brush: jscript; title: ; notranslate" title="">var a = 'ejemplo',
    b = new String('ejemplo');

typeof a //"string"
typeof b //"object"
a == b //true
a === b //false
a + b //"ejemploejemplo"

// puedo consultar propiedades para ambos
a.length //7 (gracias a la conversión implícita a su wrapper obj) 
b.length //7
</pre>

Por si sigue sonando extraño, esto sería lo que hace el intérprete de javascript &#8220;detrás de escena&#8221; cuando hacemos &#8216;FERNETJS&#8217;.toLowerCase():

<pre class="brush: jscript; title: ; notranslate" title="">var stringOriginal = 'FERNETJS';
var str = new String(stringOriginal); //str sería el wrapper object 
str.toLowerCase(); // 'fernetjs'
</pre>

El intérprete no sólo usa este &#8220;wrapper object&#8221; detrás de escena cuando queremos obtener una propiedad, sino que también cuando la queremos setear; pero esto puede ser contraproducente:

<pre class="brush: jscript; title: ; notranslate" title="">var str = 'mmm';
str.unaPropiedadInventada = 100;
str.unaPropiedadInventada // undefined
var str2 = new String('jeje');
str2.unaPropiedadInventada = 100;
str2.unaPropiedadInventada //100
</pre>

### Sobre la conversión [tipos primitivos]<->[wrappers]</code>

Nosotros podemos trabajar con tipos primitivos o con objetos, y podemos explícitamente hacer conversiones en ambas direcciones.

<pre class="brush: jscript; title: ; notranslate" title="">// con new Number envolvemos al primitivo 1 en un objeto number
var n = new Number(1);
typeof n //"object"
// llamando a Number (sin new) convierte el obj a su primitivo
typeof Number(n) //"number"
</pre>

De todas maneras, no es recomendable y rara vez o nunca, vamos a escribir en nuestro código `var x = new Number(17)`. La principal razón, es que no nos va a ser de gran utilidad, ya que sea cual sea el valor del objeto, siempre va a ser &#8220;verdadero&#8221; en el resultado de una evaluación:

<pre class="brush: jscript; title: ; notranslate" title="">var tengoPlata = new Boolean(false);
if (tengoPlata)
    console.log('comprar unos fernecitos');
else 
    console.log('esperar');
</pre>

En el caso anterior, por ejemplo, quería decir que no tenía plata. De todas maneras, se ejecuta &#8220;comprar unos fernecitos&#8221;, dejándome en bancarrota. Esto ocurre porque tengoPlata es un objeto, en contraste con el `false` que hubiera sido más natural usar.

Por otra parte, desde objeto hacia tipo primitivo muchas veces se hacen conversiones automáticas, (del mismo modo que 1 podría ser convertido a &#8216;1&#8217;), más que nada a la hora de operar.  
Por ejemplo:

<pre class="brush: jscript; title: ; notranslate" title="">var x = new Number(199),
    y = 1;
x + y // 200
</pre>

Estas conversiones se basan en lo que devuelve el valueOf() del objeto. Es decir, siempre que se trate de convertir un objeto a un primitivo, el resultado de la conversión va a ser lo que devuelve el valueOf. Este método está en todos los objetos, y si no es sobreescrito, va a devolver el mismo objeto (<a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/valueOf" title="valueOf en MDN" target="_blank">docs de valueOf</a>).  
Lo más loco de este artículo es lo que sigue. Sabiendo esto, uno podría emular un objeto, que al momento de operar sería convertido a su correspondiente valor primitivo.

<pre class="brush: jscript; title: ; notranslate" title="">var a = {
  valueOf: function(){ return 199; }
};
console.log(a + 1); //200

var b = { 
    valueOf: function(){ return navigator.plugins.length; } 
};
console.log(b - 1); //???? jeje
</pre>

### ¿De qué me sirve saber esto?¿Ya puedo hacer juegos multiplayer en 4-D con js?

La verdad que al fin y al cabo todo esto no tiene mucho sentido práctico, uno podría vivir sin saberlo, pero ayuda a conocer un poco más el lenguaje y entender por qué las cosas funcionan de la manera que lo hacen.  
Sí es importante tener presente los problemas que puede traer manualmente instanciar estos objetos String, Number, etc.. 

NOTAS: * A lo largo de todo el artículo se utilizó el termino &#8216;wrapper object&#8217;. Esto se debe a que no encontré una traducción acorde, &#8216;objeto envolvedor&#8217;, &#8216;objeto envoltorio&#8217; simplemente no sonaban correctos. Sugerencias?  
* Cuando se habla de String, Number, Boolean en los ejemplos, la mayoría de las veces se podrían haber aplicado indistintamente.