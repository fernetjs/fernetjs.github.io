---
title: 'console: algo más que console.log'
author: Matias Arriola
layout: post
permalink: /2014/12/console-algo-mas-que-console-log/
dsq_thread_id:
  - 3283125229
categories:
  - Client Side
  - General
  - Server Side
tags:
  - console
  - debugging
---
Rindiendo un poco de tributo al <a href="http://fernetjs.com/2011/10/abajo-el-alert-arriba-el-console-log/" title="Abajo el alert, arriba el console.log!" target="_blank">primer post publicado en fernetjs</a>, se me ocurrió que este tema podría resultar interesante.

El objeto `console` es una interface para comunicarnos por código con la consola, que hoy en día viene incluída por defecto en la mayoría de los navegadores como parte de las herramientas para el desarrollador. Si bien no existe un estándar para esta API, es implementada por la mayoría de los navegadores y otras plataformas como Node.js de manera bastante consistente.

Muchos recordaremos <a title="console.log undefined en stackoverflow" href="http://stackoverflow.com/questions/3326650/console-is-undefined-error-for-internet-explorer" target="_blank">los errores que nos daba internet explorer <= 8</a> cuando nos olvidábamos un console.log en el código o no implementábamos el objeto console nosotros mismos. Por suerte, en líneas generales, esto es cosa del pasado!

Como siempre recomiendo abrir la consola y empezar a probar cosas, nada más útil que eso. Espero que al terminar de ver esto, alguien tenga más herramientas para depurar de manera más efectiva y creativa sus programas.

### debug, log, info, warn y error

`log` es el método más conocido, escribe a la consola lo que le pasamos como parámetro.  
`info`, `warn` y `error` funcionan de la misma manera que `log`, aunque la salida en consola es estéticamente diferente (generalmente tiene un ícono, y un color diferente). Obviamente la mayor diferencia es su significado, y que desde la consola podemos filtrar por nivel de logueo.  
`debug()` es solamente un alias para `log()`, y se desalienta su uso, ya que existe solo para mantener compatibilidad hacia atrás.

{% highlight js %}
console.log('Esto va a salir por consola');
console.info('Qué ganas de tomar un fernet!');
console.warn('El fernet está muy caro');
console.error('No me alcanza pal fernet');
{% endhighlight %}

<img src="http://fernetjs.com/wp-content/uploads/2014/12/log.gif" alt="log info warn y error" width="866" height="209" class="size-full wp-image-3975" />

Todos estos métodos soportan que le pasemos varios parámetros.

<pre class="brush: jscript; title: ; notranslate" title="">// no hace falta hacer
console.log('Este es el título de mi documento: ' + window.document.title);
// puedo hacer
console.log('Este es el título de mi documento:', window.document.title);
</pre>

También se soporta el uso de &#8220;templated strings&#8221;. Como primer parámetro podemos pasar un string que contiene &#8220;strings de reemplazo&#8221;, que van a ser el lugar donde se van a formatear los sucesivos parámetros restantes.

<pre class="brush: jscript; title: ; notranslate" title="">var stock = 1,
  marca = 'acme';
console.warn('Me queda %d fernet marca %s :(', stock, marca);
// imprime: 'Me queda 1 fernet marca acme :('
</pre>

Pueden existir diferencias entre navegadores, pero en general los posibles strings de reemplazo como `%s` son:

`%s` formatea el valor como un string.  
`%d` o `%i` formatea el valor como un número entero.  
`%f` formatea el valor como un número de punto flotante.  
`%o` formatea el valor como un elemento DOM expandible (como en el tab de elements de las devtools, pasando el mouse por encima resalta el elemento en el documento según corresponda).  
`%O` formatea el valor como un objeto de JavaScript expandible.

<img src="http://fernetjs.com/wp-content/uploads/2014/12/log_o.gif" alt="log con %O" width="890" height="467" class="alignleft size-full wp-image-3980" />  
<img src="http://fernetjs.com/wp-content/uploads/2014/12/log_O.gif" alt="log con %o" width="904" height="393" class="alignleft size-full wp-image-3979" />

Adicionalmente, se puede formatear la salida con CSS, utilizando `%c`. El soporte para estos estilos también puede cambiar en base al navegador.

<pre class="brush: jscript; title: ; notranslate" title="">console.log('%cFERNETJS', 'background:#AAAA00; font-size:16pt');
</pre>

<img src="http://fernetjs.com/wp-content/uploads/2014/12/log_style.png" alt="console log con estilo" width="468" height="46" class="size-full wp-image-3981" />

Utilizando las características vistas hasta ahora, ya se pueden hacer bastantes cosas, que inclusive van más allá del debugging. Por ejemplo, muchas empresas han colocado mensajes en la consola para reclutar desarrolladores usando estilos y arte ascii, y algunos hasta han ido más allá haciendo <a href="http://rikukissa.github.io/falling/" title="falling - juego que utiliza console" target="_blank">juegos</a>!

### assert

`console.assert` es muy similar a console.log, con la diferencia de que solo escribe el mensaje en consola sólo cuando el primer parámetro es falso, y lo acompaña con el stacktrace.  
Es muy útil para todas aquellas situaciones en las que no queremos &#8220;spammear&#8221; la consola o queremos detectar situaciones no esperadas, por ejemplo dentro de un <a href="http://fernetjs.com/2012/09/construyendo-un-game-loop/" title="Construyendo un Game Loop" target="_blank">game loop</a>.

<pre class="brush: jscript; title: ; notranslate" title="">console.assert(true, 'Esto no va a imprimir nada en consola');
console.assert(false, 'Esto si');

function sum(a, b){
  console.assert(typeof a === 'number', 'a no es un número!:', a);
  console.assert(typeof b === 'number', 'b no es un número!:', b);
  return a + b;
}

sum(1,2); // no imprime nada en consola
sum(10, '???'); // Assertion failed: b no es un número!: ???
// de todas maneras retorna '10???'
</pre>

### count

`console.count` loguea en consola la cantidad de veces que esta línea es llamada. Recibe solamente un string como parámetro, que es la etiqueta a utilizar para este contador.

<pre class="brush: jscript; title: ; notranslate" title="">function load(){
  // [...]
  console.count('load');
}
function render(){
  // mucho código aquí
  console.count('render');
}
load(); //load: 1
render(); //render: 1
render(); //render: 2
</pre>

<img src="http://fernetjs.com/wp-content/uploads/2014/12/count.png" alt="" width="215" height="192" class="alignnone size-full wp-image-3984" />

### dir

Recibe un objeto como parámetro, y lo representa en consola de forma interactiva, pudiendo explorar sus propiedades, tal como vimos anteriormente, como si hicieramos `console.log('%O', window);`

### table

console.table recibe un objeto o array y lo representa en forma de tabla en la consola. También puede recibir un último parámetro que es un array de strings que contiene las propiedades que se quieren incluir. Inclusive se puede ordenar por columna clickeando en el encabezado de la tabla!

<pre class="brush: jscript; title: ; notranslate" title="">var links = [
  { nombre: 'MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Console.table'},
  { nombre: 'npmPackage', url: 'https://www.npmjs.org/package/console.table'}
];
console.table(links);
</pre>

<img src="http://fernetjs.com/wp-content/uploads/2014/12/table.png" alt="" width="869" height="82" class="alignnone size-full wp-image-3988" />

<pre class="brush: jscript; title: ; notranslate" title="">// sólo nos interesa la propiedad url
console.table(links, ['url']);
</pre>

<img src="http://fernetjs.com/wp-content/uploads/2014/12/table2.png" alt="" width="864" height="84" class="alignnone size-full wp-image-3987" />

<pre class="brush: jscript; title: ; notranslate" title="">// podemos imprimir objetos
var linksComoObjetos = {
  MDN: {
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/Console.table'
  },
  npmPackage: {
    url: 'https://www.npmjs.org/package/console.table'
  }
};
console.table(linksComoObjetos);
</pre>

<img src="http://fernetjs.com/wp-content/uploads/2014/12/table3.png" alt="" width="865" height="82" class="alignnone size-full wp-image-3986" />

Los ejemplos son bastantes triviales, pero puede a llegar a ser bastante útil y cómodo. Por ejemplo, qué pasa si hacemos `console.table(console)` ?

### group, groupCollapsed y groupEnd

Son métodos que nos permiten tener organizado todo el logueo que hagamos a la consola. Nos permiten agrupar por funcionalidad común o por el criterio que nosotros elijamos.

Primero llamamos a `console.group` con una etiqueta, y todo logueo de consola que se haga después de eso, va a quedar agrupado dentro de la misma hasta que llamemos a `console.groupEnd` con la misma etiqueta. `console.groupCollapsed` es idéntico a `console.group`, salvo que por defecto ese grupo arranca sin estar expandido en la consola.

<pre class="brush: jscript; title: ; notranslate" title="">function update(){
  for(var i=0; i&lt; 5; i++){
    console.log(i);
  }
  console.count('update');
}

function render(){
  console.warn('render');
}


console.group('logica');
update();
console.groupEnd('logica');
console.groupCollapsed('rendering');
render();
console.groupEnd('rendering');
</pre>

<img src="http://fernetjs.com/wp-content/uploads/2014/12/group.png" alt="" width="145" height="127" class="alignnone size-full wp-image-3992" />

También se pueden tener grupos anidados!

<pre class="brush: jscript; title: ; notranslate" title="">function update(){
  console.groupCollapsed('DB');
  for(var i=0; i&lt; 5; i++){
    console.log(i);
  }
  console.groupEnd('DB');
  console.count('update');
}

function render(){
  console.warn('render');
}


console.group('logica');
update();
console.groupEnd('logica');
console.groupCollapsed('rendering');
render();
console.groupEnd('rendering');
</pre>

<img src="http://fernetjs.com/wp-content/uploads/2014/12/group2.png" alt="" width="138" height="82" class="alignnone size-full wp-image-3991" />

### trace

`console.trace` muestra en consola el stacktrace (pila de llamadas) correspondiente. Dependiendo del browser se le puede pasar como parámetro un string que va a ser el nombre que podemos utilizar para identificarlo.

### time, timeEnd

De manera similar a group y groupEnd, reciben una etiqueta como parámetro. Al llamar a `console.time('etiqueta')`, un timer comienza a correr para esa etiqueta, que parará cuando se llame a `console.timeEnd('etiqueta')`, y se imprimirá el tiempo en pantalla.

<pre class="brush: jscript; title: ; notranslate" title="">console.time('ejemplo poco original');
setTimeout(function(){
  console.timeEnd('ejemplo poco original');
}, 1000);
// en consola se logueará algo similar a:
// ejemplo poco original: 1843.323ms
// estará muy lenta mi máquina, que arroja ese número considerablemente más grande que 1000ms!
</pre>

### profile, profileEnd

Esta funcionalidad no está disponible en todos los browsers, o por lo menos solo está documentada en <a href="https://developer.chrome.com/devtools/docs/console-api#consoleprofilelabel" title="console profile chrome" target="_blank">chrome</a>, <a href="https://getfirebug.com/wiki/index.php/Console.profile" title="console.profile en firebug" target="_blank">firebug</a>, e <a href="http://msdn.microsoft.com/en-us/library/ie/jj152133(v=vs.85).aspx" title="console.profile en IE" target="_blank">IE</a>.  
Al llamar a `profile`, se arranca una sesión de profiling, hasta que se llama a `profileEnd`. Opcionalmente se puede llamar con una etiqueta, y sería equivalente a arrancar y terminar la sesión manualmente desde las dev tools. Más allá de la llamada a `console.profile`, el tab de profiling puede ser determinante para encontrar problemas de performance en tu código!

<img src="http://fernetjs.com/wp-content/uploads/2014/12/profile.png" alt="" width="258" height="118" class="alignnone size-full wp-image-3997" />  
<img src="http://fernetjs.com/wp-content/uploads/2014/12/profile2.png" alt="" width="882" height="173" class="alignnone size-full wp-image-3996" />

## console en Node.js

En node `console` también está disponible. Para ver sus métodos, recomiendo ir a <a href="http://nodejs.org/api/console.html" title="Documentación de console - node.js" target="_blank">la documentación</a>. Pero haciéndola corta, los métodos implementados son `log`, `info`, `error`, `warn`, `dir`, `time`, `timeEnd`, `trace` y `assert`.  
Como en node todo el resultado del logging va a ir a algún stream (stdout o stderr por defecto), no tenemos &#8220;chiches&#8221; interactivos como sucede con los browsers. Tampoco una acumulación de utilidades diversas, por la filosofía que node sostiene, pero estoy seguro que sea lo que quieras hacer, ya hay un módulo para eso.

Referencias externas:  
<a title="Console - MDN" href="https://developer.mozilla.org/en/docs/Web/API/console" target="_blank">MDN</a>  
<a title="Console - Chrome" href="https://developer.chrome.com/devtools/docs/console-api" target="_blank">Chrome</a>  
<a title="Console - MSDN" href="http://msdn.microsoft.com/en-us/library/windows/apps/hh696634.aspx" target="_blank">MSDN</a>  
<a title="Console - Opera" href="http://www.opera.com/dragonfly/documentation/console/" target="_blank">Opera</a>
