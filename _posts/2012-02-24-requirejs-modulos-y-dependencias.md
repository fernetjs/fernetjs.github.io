---
title: 'RequireJS: Módulos y Dependencias'
author: Pablo Novas
layout: post
permalink: /2012/02/requirejs-modulos-y-dependencias/
dsq_thread_id:
  - 587841836
categories:
  - Bibliotecas
  - Client Side
tags:
  - asincronismo
  - commonjs
  - modulos
migration_issue: highlightline
---
Así como tenemos [Módulos en NodeJS][1], también los podemos tener en el cliente usando RequireJS.  
RequireJS es una librería basada en la especificación de CommonJS para Módulos la cual nos trae una implementación para cargar módulos del lado del cliente. Esto nos permite mantener nuestro código limpio y en una suerte de &#8220;carga en demanda&#8221;, ya que se pueden definir dependencias. 

> También tiene optimizaciones para los scripts, por ej. unificación y compresión para el deploy (por el momento solo para NodeJS y Java). 

Veamos un ejemplo simple de como utilizarla y que en que nos ayuda:

<!--more-->

{% highlight cpp %}
root/
  index.html
  scripts/
    main.js
    utils.js
    pepe.js
 {% endhighlight %}

{% highlight xml %}
&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Sin RequireJS&lt;/title&gt;
    &lt;!-- agrego mi coqueto script main.js--&gt;
    &lt;script type="text/javascript" src="scripts/main.js"&gt;&lt;/script&gt;

    &lt;!-- main.js tiene una dependencia a utils.js, asi que lo agrego --&gt;
    &lt;script type="text/javascript" src="scripts/utils.js"&gt;&lt;/script&gt;

    &lt;!-- Pero utils.js tiene una dependencia a pepe.js, lo agrego --&gt;
    &lt;script type="text/javascript" src="scripts/pepe.js"&gt;&lt;/script&gt;

    &lt;!-- Espero no olvidarme de otro script porque explota en colores --&gt;
  &lt;/head&gt;
  &lt;body&gt;
  &lt;/body&gt;
&lt;/html&gt;
 {% endhighlight %}

Lo anterior está un poquito inflado, pero es algo bastante común. Por lo general tenemos un layout o master-page donde metemos la mayoria de scripts, pero asi y todo, tenemos que pensar en dependencias, que scripts antes de cual, etc&#8230; (en el caso anterior debería cambiar el orden exactamente alreves :P) 

Con RequireJS sería algo de este estilo:

Agregamos a nuestro directorio require.js

<!--highlight:[4]-->
{% highlight cpp %}
root/
  index.html
  scripts/
    require.js
    main.js
    utils.js
    pepe.js
 {% endhighlight %}

<!--highlight:[7]-->
{% highlight xml %}
&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Con RequireJS&lt;/title&gt;
    &lt;!-- agrego la referencia a require.js y con data-main 
     le digo que quiero que cargue cuando termine require.js --&gt;
    &lt;script data-main="scripts/main" src="scripts/require.js"&gt;&lt;/script&gt;
  &lt;/head&gt;
  &lt;body&gt;
  &lt;/body&gt;
&lt;/html&gt;
 {% endhighlight %}

{% highlight js %}
// le digo a requireJS que voy a necesitar util.js para trabjar en main
require(["util"], function(util) {
  // este callback se dispara cuando util.js fue cargado, pero no 
  // solo util.js, sino tambien cuando sus dependencias se cargaron.
}
 {% endhighlight %}

{% highlight js %}
// defino util.js como módulo y que tiene una dependencia a pepe.js,
// también puedo especificar mas de una dependencia, por ej jose.js.
define(["pepe", "jose"], function(pepe, jose) {
   return {
     color: 'azul'
   };
}
 {% endhighlight %}

{% highlight js %}
// defino pepe.js como módulo
define(function() {
  //puedo ejecutar alguna configuracion inicial del módulo,
  // y retornar sus accesos con un simple objeto
  return {
    getAlgo: function(){
      return "algo";
    }    
  };   
}
 {% endhighlight %}

Bastante mas ordenado, no?. Lo interesante es que no necesito preocuparme en el html de las dependendencias que tiene cada script, ni el orden, ni siquiera acordarme de agregar todos los utilizados. Simplemente referencio en cada script sus dependencias y RequireJS se encarga de lo restante.

> Para **jQuery** varia mínimamente su uso, si están utilizando jQuery vean la implementación [aca][2] 

### Links relacionados:

  * [CommonJS: Modules][3]
  * RequireJS 
      * [Descargas][4]
      * [API Docs][5]
      * [Optimizer][6]

 [1]: http://fernetjs.com/2012/02/modulos-en-nodejs/ "Módulos en NodeJS"
 [2]: http://requirejs.org/docs/jquery.html
 [3]: http://www.commonjs.org/specs/modules/1.0/
 [4]: http://requirejs.org/docs/download.html
 [5]: http://requirejs.org/docs/api.html
 [6]: http://requirejs.org/docs/optimization.html