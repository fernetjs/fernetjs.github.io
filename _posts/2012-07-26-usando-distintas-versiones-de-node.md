---
title: Usando distintas versiones de node
author: matiasarriola
layout: post
permalink: /2012/07/usando-distintas-versiones-de-node/
dsq_thread_id:
  - 780783931
categories:
  - Server Side
  - Utilidades
tags:
  - nodejs
  - npm
  - package.json
---
Un escenario bastante común es encontrarse con:

> varios proyectos en node  
> escritos en distintos momentos  
> con dependencias a otros proyectos  
> dependencias que funcionan bajo X versión de node  
> varios desarrolladores que tienen distintas versiones de node

Eso aumenta la probabilidad de confusión, errores y pérdida de tiempo ( que no es lo que buscamos ).  
Node se encuentra en actividad permanente, y hay muchas versiones dando vueltas. Si bien los cambios que se van haciendo, en su mayoría, son compatibles hacia atrás, seguramente no sepamos el changelog de memoria, ni querramos correr algún tipo de riesgo. 

En <a href="http://fernetjs.com/2011/12/la-era-del-package-json/" title="La era del package.json" target="_blank">el package.json</a> de nuestro proyecto podemos especificar la versión de node con la que sabemos que funciona. Por ejemplo, <a href="https://github.com/MatthewMueller/cheerio/blob/master/package.json" title="cheerio package.json" target="_blank">cheerio</a> corre en versiones mayores o iguales a 0.6.

{% highlight js %}
"engines": {
    "node": "&gt;= 0.6"
  }
 {% endhighlight %}

La definición/uso de &#8220;engines&#8221; la podemos encontrar en el sitio de npm: <a href="http://npmjs.org/doc/json.html#engines" title="npm json-engines" target="_blank">http://npmjs.org/doc/json.html#engines</a>

### nave

<a href="https://github.com/isaacs/nave" title="nave" target="_blank">nave</a> es una utilidad desarrollada por @izs, que nos permite tener conviviendo distintas versiones de node, y cambiar entre ellas fácilmente.

Una opción es simplemente clonar el proyecto, y correr nave.sh.  
Otra, es instalarlo por NPM:

{% highlight bash %}
npm install -g nave
 {% endhighlight %}

Después, el uso es bastante sencillo e intuitivo.  
**Instalar (descargar y buildear) una versión de node: **  
`<br />
nave install 0.8.4<br />
`  
Donde 0.8.4 es la versión, y puede ser reemplazado por stable o latest.

**Usar la versión que querramos**  
`<br />
nave use 0.8.4<br />
`  
(si cuando hacemos use, no tenemos instalada esa versión, nave la va a instalar automáticamente)

**Listar las versiones que tenemos instaladas: **  
`<br />
nave ls<br />
`

**Listar las versiones que existen**  
`<br />
nave ls-remote<br />
`  
*Un par, no?*

Y a nunca olvidarse de **checkear la versión** que en efecto vamos a ejecutar:  
`<br />
node -v<br />
`

nave trabaja con subshells, lo que significa que si hacemos nave use 0.4, entonces cuando cerremos la consola actual o abramos una nueva consola, no vamos a seguir sobre 0.4 sino que sobre la versión posta de node que teníamos inicialmente.

Para los usuarios de node bajo windows, esta no es una solución, ya que nave requiere de bash para funcionar.

### Otras alternativas

Existen otras muy buenas alternativas: <a href="https://github.com/creationix/nvm" title="nvm" target="_blank">NVM</a> (Node Version Manager) y <a href="https://github.com/visionmedia/n" title="n" target="_blank">n</a>. La finalidad de ambas es la misma y el uso es muy parecido.  
La principal diferencia radica en que no trabajan con subshells, entonces cada vez que cambiemos de versión, el cambio se hará de manera global (no se perderá al cambiar de consola).