---
title: Una intro a GruntJS
author: pjnovas
layout: post
permalink: /2013/07/una-intro-a-gruntjs/
dsq_thread_id:
  - 1512457288
categories:
  - Bibliotecas
  - Utilidades
tags:
  - npm
  - package.json
  - task runner
migration_issue: highlightline
---
La verdad que lo vengo usando en prácticamente cualquier cosa que hago con javascript, sea solo cliente, server o ambas. Así que decidí escribir un post de esta interesante herramienta.

[<img src="http://fernetjs.com/wp-content/uploads/2013/07/gruntjs1.png" alt="gruntjs" width="155" height="157" class="alignleft size-full wp-image-3778" />][1]

#### [Grunt JS][2]

Es una aplicación NodeJS, que a través de un archivo de configuración (el Gruntfile.js) ejecuta tareas que pueden ir desde copiar archivos, minificar js, correr tests, cobertura de código, observar cambios tus scripts, etc &#8230; hasta tareas personalizadas que te haces simplemente escribiendo javascript (node js).



#### Beneficios

Acceso a archivos
:   Tiene resulto el sistema de acceso a archivos, solo tenemos que ocuparnos de configurar las rutas y que hacer con los archivos cuando la tarea corre.

Automatización
:   Podemos dejar un set de tareas configuradas en orden de ejecución y luego es simplemente correr el comando grunt.

Fácil instalación
:   Esta en NPM, la instalación es simplemente un npm install.

Plugins comunitarios
:   Como los plugins de jQuery, los hacemos en comunidad, pero los dejamos en NPM, por lo que solo agregando una referencia a nuestro package.json y con un npm install usamos el plugin que necesitamos. Ya tiene una gran cantidad de plugins hechos y hacer los nuestros es muy fácil.

Multi-plataforma
:   Si bien esto no es un beneficio directo de Grunt, es muy común que las cosas que podemos hacer con Grunt las hagamos en un Makefile o un BAT, por eso lo tomo como un beneficio, al correr en node y ser javascript podemos tener nuestro set de tareas funcionando en cualquier sistema operativo.

#### Instalación

Como mencioné antes, está en NPM. (y necesitamos NodeJS instalado).

Primero instalamos el &#8220;cliente&#8221; de Grunt de forma global, es el encargado de fijarse por nosotros que versión de grunt tiene el proyecto en el que lo estamos corriendo:

{% highlight bash %}
npm install grunt-cli -g
 {% endhighlight %}

> El parámetro -g indica que lo instalamos global del usuario actual en el sistema operativo. 

Luego instalamos el paquete grunt (el que corre las tareas) en el proyecto de forma local:

{% highlight bash %}
npm install grunt --save-dev
 {% endhighlight %}

Le agregamos &#8211;save (para que lo inserte en las dependencias del package.json) y -dev para que sea en las **dependencias de desarrollo**, ya que vamos a necesitar grunt en tiempo de diseño o desarrollo, no en tiempo de ejecución de nuestra aplicación.

Si miramos nuestro package.json:

<!--highlight:[8]-->
{% highlight js %}
{
  "name": "nombre",
  "version": "0.0.1",
  "dependencies": { 

  },
  "devDependencies": {
    "grunt": "~0.4.1"
  }
}
 {% endhighlight %}

#### Creando el Gruntfile

Ahora agregamos un archivo al root, en el mismo lugar que tenemos el package.json con el nombre **Gruntfile.js**:

{% highlight js %}
module.exports = function(grunt) {
  // Aca vamos a armar nuestras tareas
};
 {% endhighlight %}

Y que es este archivo?, simplemente un modulo de NodeJS, el cual va a ser llamado por grunt cuando lo ejecutemos pasándonos por parámetro *grunt* el acceso al paquete para agregar las tareas y configuraciones.

Hagamos una prueba de nuestro Gruntfile.js registrando una tarea &#8220;Hola Mundo&#8221;:

{% highlight js %}
module.exports = function(grunt) {

  grunt.registerTask('default', 'Tarea Hola Mundo', function() {
    grunt.log.write('Hola Mundo!').ok();
  });

};
 {% endhighlight %}

Corremos grunt:

{% highlight bash %}
grunt
 {% endhighlight %}

Simple!, registramos una tarea propia que muestre un &#8220;hola mundo&#8221; en la consola.

Sin meternos en mucho detalle de como realizar tareas personalizadas (ya que en la mayoría de los casos vamos a utilizar las creadas por la comunidad), vamos a probar una concatenación de scripts y su posterior minificacion:

GruntJS tiene como plugins básicos los **grunt-contrib-***. Son un set de las tareas mas comunes para un proyecto y cada uno tiene su repositorio en github con documentación y código fuente. Para este ejemplo vamos a usar [grunt-contrib-concat][3] y [grunt-contrib-uglify][4]

Primero instalemos los paquetes npm:

{% highlight bash %}
npm install grunt-contrib-concat --save-dev
npm install grunt-contrib-uglify --save-dev
 {% endhighlight %}

y ahora pongamos nuestra configuracion en el Gruntfile.js:

{% highlight js %}
module.exports = function(grunt) {
  // este método que nos da Grunt es para pasarle las configuraciones a los paquetes que usemos
  grunt.initConfig({
    concat: {
      all: {
        src: "./scripts/**/*.js",
        dest: "./distribucion/todos.js"
      },
    uglify: {
      all: {
        src: "./distribucion/todos.js",
        dest: './distribucion/todos.min.js'
      }
  });

  // registramos las tareas (plugins) desde npm en Grunt
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // registramos las tareas que se pueden ejecutar y el orden
  grunt.registerTask("default", [ "concat", "uglify" ]);
  grunt.registerTask("dist", [ "default" ]);
};
 {% endhighlight %}

Y listo, ahora simplemente corremos

{% highlight bash %}
grunt
 {% endhighlight %}

o 

{% highlight bash %}
grunt dist
 {% endhighlight %}

GruntJS tiene mucho mas en cuanto a configuraciones, plugins, etc. Pero meterse de lleno en todo lleva su tiempo y a medida que empiecen a usarlo van a ir descubriendo configuraciones nuevas, plugins y como crear tareas propias. Por ahora con esta intro pueden empezar a probar y les agrego algunos links para ampliar (son en inglés, pero con la base de este post, creo que siguiendo el código de ejemplo pueden meterse con nuevas tareas y configuraciones).

#### Links útiles

  1. [Grunt][2]
  2. [Configurando Tareas][5]
  3. [Repositorios de los Grunt-contrib-*][6]
  4. [La inmensa lista de plugins][7]
  5. [Un proyecto mio con grunt y algunas de las configuraciones comunes][8]

 [1]: http://fernetjs.com/wp-content/uploads/2013/07/gruntjs1.png
 [2]: http://gruntjs.com/
 [3]: https://github.com/gruntjs/grunt-contrib-concat "grunt-contrib-concat"
 [4]: https://github.com/gruntjs/grunt-contrib-uglify "grunt-contrib-uglify"
 [5]: http://gruntjs.com/configuring-tasks
 [6]: https://github.com/gruntjs/
 [7]: http://gruntjs.com/plugins
 [8]: https://github.com/pjnovas/base-client-project