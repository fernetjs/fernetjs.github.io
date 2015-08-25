---
title: NodeJS en la nube con Nodejitsu y Nodester
author: Pablo Novas
layout: post
permalink: /2012/07/nodejs-en-la-nube-con-nodejitsu-y-nodester/
dsq_thread_id:
  - 767638181
categories:
  - Server Side
  - Utilidades
tags:
  - deploy
  - nodejitsu
  - nodejs
  - nodester
---
Elegí estas dos opciones [PaaS][1] porque son gratis, fáciles y excelentes para arrancar con una aplicación de NodeJS en la nube.  
Los pasos los voy a mostrar con Linux, pero no deberían variar en Windows, o la Manzanita.

Antes de arrancar, es necesario tener nuestro package.json en orden, pueden ver del tema en [este post][2].

Arranquemos creando un web server con Express de la forma simple:

<pre class="brush: bash; title: ; notranslate" title="">mkdir sitioEnNode
cd sitioEnNode
npm install express
node_modules/express/bin/express
</pre>

Ahora que tenemos nuestro servidor web con Express vamos a ver que tenemos creado el package.json donde tenemos las dependencias (por ejemplo a jade), asi que primero vamos a instalarlas:

<pre class="brush: bash; title: ; notranslate" title="">npm install
</pre>

Con esto vamos a instalar desde npm las dependencias declaradas en el package.json.

Iniciamos la aplicación para probar que todo esté en orden e ingresamos a http://localhost:3000:

<pre class="brush: bash; title: ; notranslate" title="">node app.js
sitioEnNode server listening on port 3000 in development mode
</pre>

* * *

### Nodejitsu

Primero ingresamos a [Nodejitsu][3], nos creamos un usuario y lo activamos  
Luego nos queda instalar el cliente:

<pre class="brush: bash; title: ; notranslate" title="">npm install -g jitsu
</pre>

> Si estas en linux, necesitas permisos de root para instalar con npm como global (parámetro -g), para eso ingresa *sudo* antes de toda la linea anterior. 

Ahora nos queda autenticarnos, ya que es la primera vez que usamos el cliente:

<pre class="brush: bash; title: ; notranslate" title="">jitsu login
</pre>

Eso es todo, ahora hagamos un deploy!, vamos a la carpeta que creamos antes con nuestro web server:

<pre class="brush: bash; title: ; notranslate" title="">cd sitioEnNode
jitsu deploy
</pre>

Nos va a preguntar:

<pre class="brush: jscript; title: ; notranslate" title="">prompt: subdomain (sitioEnNode): sitioEnNode //nombre del subsominio
prompt: scripts.start (server.js): app.js //js del server
prompt: version (0.0.0): 0.6.12 //version de node
</pre>

Estas preguntas son para configurarlas en nuestro package.json (si no estan las propiedades, las crea)

Y eso es todo para Nodejitsu, simplemente entramos al sub-dominio y tenemos el deploy de la app. <img src="http://fernetjs.com/wp-includes/images/smilies/simple-smile.png" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" />

* * *

### Nodester

Con [Nodester ][4] es distinto, pero no mas difícil, utiliza Git para los deploys por lo que en realidad nuestro deploy es un repositorio más (nos proporciona otras formas también).

Primero tenemos que pedir un cupón para el acceso (por lo general no tarda mas de 2 días)

<pre class="brush: bash; title: ; notranslate" title="">curl -X POST -d "email=you@gmail.com" http://nodester.com/coupon
</pre>

Despues de recibir el cupón, instalamos el cliente

<pre class="brush: bash; title: ; notranslate" title="">npm install nodester-cli -g
nodester user setup &lt;user&gt; &lt;pass&gt;
nodester user setkey
</pre>

Para seguir con el ejemplo, vamos a deployar la misma aplicación que creamos al principio, así que nos movemos a la carpeta y creamos una app de nodester

<pre class="brush: bash; title: ; notranslate" title="">cd sitioEnNode
nodester app create sitioEnNode app.js
</pre>

El *create* nos va a dar el puerto donde va a estar corriendo la app, asi que confirmemos que tengamos nuestro app.js en ese puerto (o, en este ejemplo no va a ser necesario cambiar nada porque el autogenerado de express ya viene pensado para usar el puerto del proceso o 3000 si no tiene)

<pre class="brush: bash; title: ; notranslate" title="">nodester app info sitioEnNode
</pre>

Nos va a dar una url al repo de git donde se inició la app, por ejemplo: git@nodester.com:/node/git/algo/caracteresLocos, entonces ahora agregamos un remoto a ese repo:

> En caso de no tener un repo git en esa carpeta, primero tenemos que iniciarlo y comitear los archivos
> 
> <pre class="brush: bash; title: ; notranslate" title="">git init
git add .
git commit -m "commit inicial"
</pre>

<pre class="brush: bash; title: ; notranslate" title="">git remote add nodester git@nodester.com:/node/git/algo/caracteresLocos
git push nodester master
</pre>

Y listo, cada vez que queramos subir cambios es un push al remoto nodester (último comando)

> Acordate que es git, el comando push va a subir SOLO lo que se encuentre commiteado 

* * *

### Dominios Personalizados

Para cerrar con el deploy vamos a configurar un dominio personalizado. El subdominio alcanza para algunos casos, pero en otros queremos registrar nuestro dominio y apuntarlo al deploy. 

> A la fecha de este post Nodester y Nodejitsu no poseen DNS registrados en nic.com 

Teniendo en cuenta eso, vamos a hacerlo con [A-Record][5] en [nic.com][6].

Después de registrar el dominio, vamos a nuestra cuenta de nic.com, sección dominios y le damos al boton Launch.  
Eso nos va a llevar a la pagina de administracion de dominios (Domain Manager), en esa pantalla vamos a tener una sección &#8220;DNS Manager&#8221;, la cual va a tener información cargada, si no esta la información y recién registran esperen un rato (mas o menos una hora).

Dentro de esa información van a ver esta linea (con una IP real):

<pre>A  @  XXX.XXX.XXX.XXX</pre>

**Y mas abajo un link *launch*, click a ese link!.**

[<img src="http://fernetjs.com/wp-content/uploads/2012/07/nic.dnsManager.png" alt="" title="nic.dnsManager" width="266" height="178" class="alignnone size-full wp-image-2431" />][7]

Lo vamos a hacer es modificar esa IP a la que nos da Nodester o Nodejitsu.

Les recomiendo no modificar el nombre del host ( @ ), ya que está relacionado con otras configuraciones.

Les dejo las IPs de [Nodester ][8]y [Nodejitsu][9]

[<img src="http://fernetjs.com/wp-content/uploads/2012/07/nic.arecord.png" alt="" title="nic.arecord" width="653" height="160" class="alignnone size-full wp-image-2432" />][10]

Luego de modificar y guardar, tienen que esperar un par de horas, pero mientras esperamos vamos a avisar que tenemos un dominio:

#### Nodejitsu

En el package.json agregamos una propiedad más &#8220;domain&#8221; donde ponemos nuestro/s dominio/s

<pre class="brush: jscript; title: ; notranslate" title="">//...otras configuraciones

"subdomain": "sitioEnNode",
"domains": [
  "sitioEnNode.com",
  "www.sitioEnNode.com"
],

//...otras configuraciones
</pre>

#### Nodester

En la consola ejecutamos el appdomain de nodester para setear nuestro dominio.

<pre class="brush: bash; title: ; notranslate" title="">nodester appdomain add sitioEnNode sitioEnNode.com
nodester appdomain add sitioEnNode www.sitioEnNode.com
</pre>

Bueno, con eso ya tendríamos una aplicación en NodeJS deployada y con dominio copado, que tal?  
Si tienen dudas, quieren agregar algo o cambiar, comenten! 

* * *

**Algunos Links:**</p> 

  * [Nodejitsu][11]
  * [DNS Nodejitsu][12]
  * [Nodejitsu Handbook][13]

  * [Nodester][4]
  * [DNS Nodester][8]

 [1]: http://en.wikipedia.org/wiki/Platform_as_a_service
 [2]: http://fernetjs.com/2011/12/la-era-del-package-json/ "La era del package.json"
 [3]: http://nodejitsu.com/
 [4]: http://nodester.com/
 [5]: http://en.wikipedia.org/wiki/List_of_DNS_record_types
 [6]: http://nic.com/
 [7]: http://fernetjs.com/wp-content/uploads/2012/07/nic.dnsManager.png
 [8]: http://blog.nodester.com/post/3254776172/custom-domains-now-supported-on-nodester
 [9]: http://dns.jit.su/
 [10]: http://fernetjs.com/wp-content/uploads/2012/07/nic.arecord.png
 [11]: http://nodejitsu.com
 [12]: http://dns.jit.su
 [13]: https://github.com/nodejitsu/handbook