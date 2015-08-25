---
title: Parser Javascript para planillas de Google Docs
author: leito
layout: post
permalink: /2012/09/parser-javascript-para-planillas-de-google-docs/
dsq_thread_id:
  - 852011055
categories:
  - Utilidades
tags:
  - funciones
  - google
  - jquery
  - json
---
Estoy armando un sitio donde quería publicar una pequeña porción con información dinámica. Y por varias conversaciones que tuve, se me ocurrió: ¿por qué no usar una planilla de cálculo de Google Docs para editar estos datos, y luego parsearlos desde JavaScript en mi página?

Lo que parecía una cosa trivial (porque Google Docs expone sus planillas con JSON, no?) resultó tener más vueltas de las esperadas. Lo positivo: les comparto [Google Docs Simple Parser][1], un parser Javascript para crear objetos a partir de planillas de cáculo.

<!--more-->

#### Que es gdsp?

Google Docs Simple Parser (gdsp para los amigos) es una pequeña librería Javascript que permite crear un array de objetos a partir de una planilla de cálculos sencilla en Google Docs. La idea es contar con una utilidad sencilla para acceder de forma simple y rápida a datos almacenados en una planilla (que puede resultar muy práctico para editar en equipo, mantener y actualizar).

Si, si, Google Docs ya provee una exportación a JSON&#8230; pero las dos opciones que ofrece para exportar varian entre lo complicado (la exportación &#8220;de celdas&#8221;) y lo inusable (la exportación &#8220;de lista&#8221;, que para parsear es casi un imposible).

gdsp permite parsear la exportación JSON a celdas, y también una exportación sencilla a TXT de la planilla, y devolver un array de objetos para utilizar.

### Ejemplo de uso

##### Creacion de la planilla

Supongamos una planilla en Google Docs de 3 filas:

<table style="width: 100px;border: solid 1px silver">
  <tr>
    <th>
      nombre
    </th>
    
    <th>
      apellido
    </th>
  </tr>
  
  <tr>
    <td>
      Kilgoure
    </td>
    
    <td>
      Trout
    </td>
  </tr>
  
  <tr>
    <td>
      Billy
    </td>
    
    <td>
      Pilgrim
    </td>
  </tr>
</table>

gdsp utiliza la primer fila como nombres de atributos para los objetos que generará.

Tenemos que hacer que la planilla sea de lectura pública para que gdsp pueda accederla. Para esto, abierta la planilla hacemos click en &#8220;Compartir&#8221; y le damos acceso público de lectura.

##### Publicacion

El siguiente paso es publicar la planilla en la web, en formato TXT. Bastante simple también:abrimos el menú Archivo > Publicar en la Web&#8230; y allí podemos iniciar la publicación. En la parte inferior aparecerá un combo donde podremos elegir el formato (elegir TXT), y aparecerá el link de la publicación en la Web..

##### Parseo con gdsp

Finalmente! Desde un script en nuestro HTML podemos acceder a los datos de la planilla:

<pre class="brush: jscript; title: ; notranslate" title="">var url = "la url de la publicacion en la web de la planilla";
googleDocsSimpleParser.parseSpreadsheetTxtUrl(url, function (personas) {
  //personas es un array de objetos, lo podemos iterar o manipular a gusto!
});
</pre>

La variable personas contendrá un array de objetos con la información de la planilla. En particular, en este ejemplo la variable personas contendrá:

<pre class="brush: jscript; title: ; notranslate" title="">[{nombre: "Kilgoure", apellido: "Trout"},
 {nombre: "Billy"   , apellido: "Pilgrim"}]
</pre>

Si no quieren escribir tanto, en la página de descarga hay una página demo.html que contiene un par de ejemplos concretos de uso, conectándose a una planilla de prueba que ya está publicada. Bajen y abran con el navegador, y voilá <img src="http://fernetjs.com/wp-includes/images/smilies/simple-smile.png" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" />

#### Descarga y distribucion

gdsp lo distribuyo bajo la licencia MPL 2.0 (básicamente, son libres de usar, modificar y redistribuir a gusto, siempre y cuando su distribución respete la MPL).

Pueden [descargar gdsp desde mi página en BitBucket][1]. Comentarios e ideas son siempre bienvenidas!

 [1]: http://code.ideasagiles.com/google-docs-simple-parser