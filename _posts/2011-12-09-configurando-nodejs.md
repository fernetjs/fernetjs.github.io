---
title: Configurando NodeJS
author: pjnovas
layout: post
permalink: /2011/12/configurando-nodejs/
dsq_thread_id:
  - 499237167
categories:
  - Server Side
tags:
  - nodejs
  - npm
---
Queres arrancar con NodeJS?, bueno armé este post para que veas la opción que te sirve más y puedas estar tirando código lo mas rápido posible.

NodeJS tiene un &#8220;repositorio&#8221; de paquetes o frameworks que podés utilizar mientras desarrollas, hay muchos, son todos abiertos y de muy fácil instalación. Los vas a encontrar como <a title="Node Package Manager" href="http://npmjs.org/" target="_blank">NodePackageManager(NPM)</a>, y <a title="Search Node Package Manager" href="http://search.npmjs.org/" target="_blank">acá</a> los podes ver.

  * [Windows][1]
  * [Linux][2]
  * [Mac OS][3]
  * [En la Nube (Cloud 9 Ide)][4]

<!--more-->

* * *

<a name="windows" rel="bookmark"></a></p> 

### Windows

Empecemos por descargar el instalador de la pagina (node-v0.X.msi Windows installer) de <a title="NodeJS" href="http://nodejs.org/" target="_blank">NodeJS</a>

Simplemente corremos el instalador, abrimos la consola (cmd.exe) y probamos la version de node instalada:

{% highlight cpp %}
node -v
 {% endhighlight %}

Esto nos va a mostrar la version que instalamos, lo que nos queda es probar algo de javascript para ser felices, asi que en la consola escribimos node y presionamos enter para entrar en la consola y despues tiramos algo de js:

{% highlight js %}
node
&gt; var prueba = 'Hola Node';
&gt; console.log(prueba);
 {% endhighlight %}

listo!, node instalado en windows. Para lo que respecta NPM, ya lo tenemos, vamos a ver la version:

{% highlight cpp %}
npm -v
 {% endhighlight %}

Eso es todo, ya tenemos node y npm instalado para empezar a codear. Si queremos instalar paquetes del NPM:

{% highlight cpp %}
npm install [paquete]
 {% endhighlight %}

Se van a instalar con sus dependencias solito.

* * *

<a name="linux" rel="bookmark"></a></p> 

### Linux

Voy a ir sobre los pasos con Ubuntu pero no deberías tener problema con otra distribución.  
En linux la forma de tener NodeJS es bajando el source (de la version que mas nos guste), compilarlo, e instalarlo.

Para descargarlo se puede hacer de varias opciones, yendo a la página y descargando el node-v0.X.tar.gz, o podemos usar git haciendo un clone del source. Si quieren elejir y tirar un *cURL* (o descargar) una version en particular pueden verlo en <a title="Distribuciones de Node" href="http://nodejs.org/dist/" target="_blank">Distribuciones de Node</a>

Después de tener el tar.gz vamos a hacer los pasos de descomprimir, crear una carpeta, configurar el paquete, compilarlo e instalarlo:

Abrimos el terminal, nos posicionamos donde tenemos el .tar.gz y hacemos lo siguiente:

{% highlight cpp %}
tar -zxf node-v0.6.5.tar.gz
cd node-v0.6.5
./configure
make
sudo make install
 {% endhighlight %}

Ya tenemos node!, podemos comprobarlo poniendo en el terminal:

{% highlight cpp %}
node -v
 {% endhighlight %}

y nos va a retornar la version de node instalada.

Tiremos algo de codigo javascript para un momento de emoción: simplemente tenemos que escribir node, y darle al ENTER, para abrir la consola de node, y empezamos a tirar codigo js:

{% highlight js %}
node
&gt; var prueba = 'Hola Node';
&gt; console.log(prueba);
 {% endhighlight %}

Presionamos Ctrl+C 2 veces y volvemos al terminal.

Desde la version 0.6 de node ya tenemos el NPM incluido, pero por si necesitan instalarlo, en el terminal pomenos:

{% highlight cpp %}
curl http://npmjs.org/install.sh | sh
 {% endhighlight %}

> Si no reconoce el comando cURL, no lo tienen instalado, primero ingresen en el terminal:
> 
> {% highlight cpp %}
sudo apt-get install curl
 {% endhighlight %}

listo!, comprobemos la version en el terminal:

{% highlight cpp %}
npm -v
 {% endhighlight %}

y ahora es simplemente agregar paquetes a nuestro gusto utilizando:

{% highlight cpp %}
npm install [paquete]
 {% endhighlight %}

* * *

<a name="ios" rel="bookmark"></a></p> 

### Mac OS

Como prerequisito tenemos que tener instalado Xcode.

La forma más sencilla es descargar desde la página el instalador para Macintosh (node-vX.pkg Macintosh installer), ejecutarlo y seguir los pasos. Por defecto instala tanto Node como NPM.

Al terminar se indica que la ruta donde se copiaron los archivos es /usr/local/bin.

La otra forma de instalarlo es la misma que la de [Linux][2] explicada más arriba.

Comprobamos las versión de node:

{% highlight cpp %}
node -v
 {% endhighlight %}

&#8230; y de NPM:

{% highlight cpp %}
npm -v
 {% endhighlight %}

Listo! Todo en orden, tenemos NodeJS instalado en nuestra Mac.

* * *

<a name="cloud9ide" rel="bookmark"></a></p> 

### En la Nube (Cloud 9 Ide)

Una forma interesante de usar nodejs es en la nube, no importa sobre que SO estemos, simplemente abrimos un explorador y arrancamos a escribir código. <a title="Cloud9IDE" href="http://cloud9ide.com/" target="_blank">Cloud9IDE</a> es una buena opción para empezar con NodeJS evitando instalaciones y configuraciones, y hasta es un IDE, por lo que no necesitamos nada, sólo registrarnos en la página.  
Trabaja con github para guardar los proyectos que realicemos por lo que es necesario tener una cuenta en gitub también, está todo muy bien explicado en el sitio.  
Y por si fuera poco, tambien tenemos la opción de descargarnos el IDE y trabajar en local, y está dentro de los del NPM:

{% highlight cpp %}
npm install cloud9
cloud9
 {% endhighlight %}

* * *

**EDIT:** Les dejo [como configurar NPM si estan con un proxy][5] 

* * *

Les dejo algunos links útiles:

#### GitHub

  * <a title="joyent/node" href="http://github.com/joyent/node" target="_blank">joyent/node</a> (Github de NodeJS)
  * <a title="isaacs/npm" href="http://github.com/isaacs/npm" target="_blank">isaacs/npm</a> (Github de NPM)

#### NPM

  * <a title="ExpressJS" href="http://expressjs.com/" target="_blank">ExpressJS</a> (Web para Node, con muchas utilidades como ser, routing, sesión, configuraciones de entorno, etc)
  * <a title="Jade" href="http://jade-lang.com/" target="_blank">Jade</a> (Motor para paginas web)
  * <a title="Socket.IO" href="http://socket.io/" target="_blank">Socket.IO</a> (Aplicaciones web en tiempo real, con un gran soporte de exploradores y mobile)
  * <a title="NowJS" href="http://nowjs.com/" target="_blank">NowJS</a> (Aplicaciones web en tiempo real de forma muy simple, con llamadas a functiones js cliente-servidor/ servidor-cliente)
  * <a title="EveryAuth" href="http://github.com/bnoguchi/everyauth" target="_blank">EveryAuth</a> (Autenticaciones oAuth hecho simple con soporte a muchas redes sociales)
  * <a title="Mongoose" href="http://mongoosejs.com/" target="_blank">Mongoose</a> (Driver para MongoDB)

#### Hosting

  * <a title="Nodester" href="http://nodester.com/" target="_blank">Nodester</a> (Hosting open-source y gratis como servicio utilizando Git)
  * <a title="Nodejitsu" href="http://www.nodejitsu.com/" target="_blank">Nodejitsu</a>
  * <a title="Heroku" href="http://www.heroku.com/" target="_blank">Heroku</a>
  * <a title="SmartMachines" href="http://no.de/" target="_blank">SmartMachines</a>

Por último un sitio con un ranking de recursos para Node <a title="NodeCloud" href="http://www.nodecloud.org/" target="_blank">NodeCloud</a>

 [1]: #windows
 [2]: #linux
 [3]: #ios
 [4]: #cloud9ide
 [5]: http://www.dosideas.com/wiki/Node.js