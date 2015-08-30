---
title: Testeando con mocha y expect.js
author: matiasarriola
layout: post
permalink: /2012/03/testeando-con-mocha-y-expect-js/
dsq_thread_id:
  - 598435265
categories:
  - Bibliotecas
tags:
  - calidad de código
  - testing
---
Este post no es para nada académico, ni busca explicar lo que es el <a href="http://es.wikipedia.org/wiki/Prueba_unitaria" title="Pruebas unitarias" target="_blank">unit testing</a>, el <a href="http://es.wikipedia.org/wiki/Tdd" title="Desarrollo guiado por pruebas" target="_blank">TDD</a> ni <a href="http://jmhogua.blogspot.com/2008/09/desarrollo-basado-en-el-comportamiento.html" title="Desarrollo Basado en el Comportamiento" target="_blank">BDD</a>; más que nada quería compartir mi experiencia usando estas bibliotecas por primera vez.

A la hora de probar en el client side/browser, ya había tenido un paso muy fugaz usando QUnit, pero después de escuchar hablar mucho de mocha, le dimos una oportunidad.  
Junto con mocha, usamos expect.js para tener las assertions al mejor estilo BDD. Como resultado, los tests fueron mucho más expresivos y descriptivos.

El paso a paso para arrancar a usarlo: 

1 &#8211; Escribir un archivo html que va a ser el encargado de correr los tests. Éste va a referenciar a los estilos y javascript de mocha, el javascript que contenga nuestro código, y el javascript que contenga las pruebas. También vamos a estar referenciando a expect.js (aunque no es requerido para usar mocha). Tal cual se describe en la [documentación][1].  
<!--more-->

{% highlight xml %}
<html>
<head>
  <meta charset="utf-8">
  <title>Mocha Tests</title>
  <link rel="stylesheet" href="https://raw.github.com/visionmedia/mocha/master/mocha.css" />
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
  <script src="https://raw.github.com/LearnBoost/expect.js/d2440da086bf8dc38c6085641f23b968a0f48b29/expect.js"></script>
  <script src="https://raw.github.com/visionmedia/mocha/master/mocha.js"></script>
  <script>mocha.setup('bdd') //acá definimos el estilo de los tests, otra opción válida es tdd</script>
  <script src="miImplementacion.js">&lt;/script&gt;
  &lt;script src="misTests.js"&gt;&lt;/script&gt;
  &lt;script&gt;
    $(function () {
      mocha
        .run()
        .globals(['foo', 'bar']) // variables globales "aceptables"
    })
  &lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div id="mocha"&gt;&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
 {% endhighlight %}

2 &#8211; Crear y editar los archivos que contienen los casos de prueba. En este caso, el archivo sería misTests.js

3 &#8211; Para ejecutar los tests y visualizar los resultados, abrir el archivo html del paso 1.

Para ilustrar un poco más cómo se pueden ver las pruebas, imaginemos que estamos desarrollando un juego y tenemos una clase Personaje que tiene un método para agregar un ítem a su inventario ( yo sé que les gusta el spanglish en el código ). 

{% highlight js %}
describe('Personaje', function(){
    describe('#pickUp()', function(){
        it('should have the ability to store the object in its items collection', function(){
            var something = new Item(),
                aDude = new Personaje('N/N');
            expect(aDude.items).to.be.empty();
            aDude.pickUp(something);
            expect(aDude.items).not.to.be.empty();
            expect(aDude.itmes).to.contain(something);
        });
        it('should not be able to pickUp the same thing twice', function(){
            var something = new Item(),
                aDude = new Personaje('N/N');
            expect(aDude.items).to.be.empty();
            aDude.pickUp(something);
            aDude.pickUp(something);
            expect(aDude.items.length).to.have.length(1);
        });
        // Podemos dejar tests sin implementar que van a reflejar requerimientos
        // o TODOs
        it('should throw an Error if the parameter is not an Item instance');

    });        
});​
 {% endhighlight %}

Para ver la lista de assertions que tenemos disponible en expect-js, consultar la <a href="https://github.com/LearnBoost/expect.js/blob/master/README.md" title="expectjs - readme" target="_blank">documentación</a>. Las llamadas a describe e it que vemos en el código existen gracias a al setup(&#8216;bdd&#8217;) que mencionamos antes en el html.  
De la forma en que estructuro los tests en mi caso es de la siguiente:

{% highlight js %}
describe('Clase o Módulo', function(){
    describe('#método()', function(){
        it('un aspecto que debe cumplir método', function(){
            // testearlo
        });
        it('otro requerimiento para el metodo');
    });
    describe('#otro método()', function(){
        it('debería hacer algo interesante...');
    });        
});​
 {% endhighlight %}

Una vez que estén los tests escritos, abriendo el html seríamos capaces de ver los tests que pasaron, los que fallaron, y los que están pendientes.

En fin, lo que me es más novedoso acá es la forma de hacer las assertions + la forma bdd de diagramar los tests, gracias a lo que muchas veces, leer una prueba de éstas puede llegar a ser como leer un texto en inglés o español.

Comenten!

Links:  
<a href="https://github.com/LearnBoost/expect.js" title="expect.js" target="_blank">expect.js</a>  
<a href="http://visionmedia.github.com/mocha/" title="mocha" target="_blank">mocha</a>

 [1]: http://visionmedia.github.com/mocha/ "mocha"