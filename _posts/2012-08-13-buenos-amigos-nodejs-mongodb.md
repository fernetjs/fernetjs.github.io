---
title: 'Buenos amigos: NodeJS + MongoDB'
author: pjnovas
layout: post
permalink: /2012/08/buenos-amigos-nodejs-mongodb/
dsq_thread_id:
  - 803552180
categories:
  - Bibliotecas
  - Server Side
tags:
  - mongodb
  - nodejs
---
El intento de este post no es explicar qué es y cómo funciona MongoDB sino como utilizar una base con NodeJS.

Para lo referido a MongoDB, descubrí un librito excelente, corto y conciso en la [jsConfAR][1]: [The Little MongoDB Book by Karl Seguin][2], lo interesante del libro es que está hecho en markdown y publicado en [github][3] con una [versión al español][4] traducida por [@uokesita][5].

Me tomé el trabajito de pasar el markdown español a varias versiones para que lo puedas leer online, en algún dispositivo movil o en el kindle:  
<img src="http://fernetjs.com/wp-content/uploads/2012/08/title.png" alt="" title="title" width="180" height="60" class="alignleft size-full wp-image-2584" />

<ul style="display: inline-block;">
  <li>
    <a href="http://fernetjs.com/wp-content/uploads/2012/08/mongodb.pdf" title="El pequeño libro MongoDB - Version PDF">PDF</a>
  </li>
  <li>
    <a href="http://fernetjs.com/wp-content/uploads/2012/08/mongodb.epub" title="El pequeño libro MongoDB - version epub">ePub</a>
  </li>
  <li>
    <a href="http://fernetjs.com/wp-content/uploads/2012/08/mongodb.mobi" title="El pequeño libro MongoDB - version mobi">Mobi</a>
  </li>
</ul>



#### Instalando y configurando un Server Mongo

Mi prueba la hice en Ubuntu, pero no varia mucho para otras distribuciones/ SOs, podés ver las instrucciones para otros en: [Quickstart &#8211; Installation Guides][6].

Descargamos la versión estable de MongoDB desde el [sitio oficial de descargas][7]

Después que termina toda la descarga, descomprimimos y navegamos hasta la carpeta bin de adentro y creamos un archivo mongodb.config donde le configuramos el path a donde van a ir las bases de datos (en mi caso de linux) agregándole la siguiente linea:

{% highlight cpp %}
dbpath=/home/[usuario]/mongodb/data
 {% endhighlight %}

Para windows podría ser:

{% highlight cpp %}
dbpath=c:\mongodb\data
 {% endhighlight %}

> Asegurate de que el path exista y sino crealo (yo tuve que crear el directorio data) 

Y ahora (parados en el bin) iniciamos el servidor con el path al mongodb.config:

{% highlight cpp %}
./mongod --config mongodb.config
 {% endhighlight %}

> *mongod* es el proceso de servidor y *mongo* el cliente. 

En ese momento vamos a ver que inicia el server y queda en espera en un puerto, en mi caso el 27017 (que es el default de Mongo)

{% highlight cpp %}
MongoDB starting : pid=22105 port=27017 dbpath=/data/db/ 32-bit host=miUbuntu
 {% endhighlight %}

Listo!, ya tenemos el server corriendo. Ahora abrimos otro terminal y ejecutemos el cliente *mongo* y un *db.version()* para probar:

{% highlight cpp %}
$ ./mongo
> db.version()
 {% endhighlight %}

Bueno, ya tenemos todo listo, podemos crear una colección y un documento:

{% highlight cpp %}
use unTestDB
db.personas.insert({nombre: 'pepe', apellido: 'gonzales'})
db.personas.find()

{ "_id" : ObjectId("4fbaf11c7b25b9eac0403c26"), "nombre" : "pepe", "apellido" : "gonzales" }
 {% endhighlight %}

> El cliente lo iniciamos para crear una base de prueba, ya podemos matar el proceso *mongo* si molesta.  
> No mates el *mongod* que es el server! 



#### Conectando a MongoDB desde NodeJS

Primero necesitamos un driver para node, y ahora se pone fácil:

{% highlight cpp %}
npm install mongodb
 {% endhighlight %}

El packete de NPM [mongodb][8] es un driver para NodeJS como también hay otras bibliotecas que vienen con algunas cosas interesantes como [Mongoose][9], o [MongoJS][10], pero no es nuestro caso ahora.

Creamos un app.js donde vamos a hacer una prueba contra la base unTestDB que creamos antes:

{% highlight js %}
// hacemos referencia a la dependencia 
var mongodb = require('mongodb');

// obtenemos el server MongoDB que dejamos corriendo
// *** el puerto 27017 es el default de MongoDB
var server = new mongodb.Server("127.0.0.1", 27017, {});

// obtenemos la base de datos de prueba que creamos
var dbTest = new mongodb.Db('unTestDB', server, {})

// abrimos la base pasando el callback para cuando esté lista para usar
dbTest.open(function (error, client) {
  if (error) throw error;

  //en el parámetro client recibimos el cliente para comenzar a hacer llamadas
  //este parámetro sería lo mismo que hicimos por consola al llamar a mongo
  
  //Obtenemos la coleccion personas que creamos antes
  var collection = new mongodb.Collection(client, 'personas');
  
  //disparamos un query buscando la persona que habiamos insertado por consola
  collection.find({'nombre': 'pepe'}).toArray(function(err, docs) {

    //imprimimos en la consola el resultado
    console.dir(docs);
  });
});
 {% endhighlight %}

Lo que nos queda es correr el app.js y ver el output en la consola

{% highlight bash %}
$ node app.js
[ { _id: 4fbaf11c7b25b9eac0403c26,
    nombre: 'pepe',
    apellido: 'gonzales' } ]
 {% endhighlight %}

Y eso es todo!. 

De nuevo, el objetivo del post es que veas lo simple que es engancharse desde NodeJS a un MongoDB, la parte de estudio (si nunca usaste Mongo) está más del lado de qué es y cómo funciona Mongo, el libro que está al inicio del post es un arranque muy bueno.

#### Links útiles

  * [Documentación completa del Driver Nativo de MongoDB para NodeJS][11]
  * [The Little MongoDB Book by Karl Seguin][2]
  * [Quickstart &#8211; Installation Guides][6]
  * [Sitio oficial de descargas &#8211; MongoDB][7]
  * [Mongo-Express: Interfaz Web de administración de bases MongoDB][12]

##### Algunos drivers y bibliotecas

  * [MongoDB driver usado en la explicación][8]
  * [MongoJS][10]
  * [Mongoose (ODM)][9]
  * [Lista de Drivers Soportados][13]

[Lista completa de Bibliotecas para MongoDB en NodeJS][14]

 [1]: http://jsconf.com.ar/
 [2]: http://openmymind.net/mongodb.pdf
 [3]: https://github.com/karlseguin/the-little-mongodb-book
 [4]: https://github.com/uokesita/the-little-mongodb-book/blob/master/es/mongodb.markdown
 [5]: http://www.codersvenezuela.com/post/el-pequeno-libro-de-mongodb/54
 [6]: http://www.mongodb.org/display/DOCS/Quickstart
 [7]: http://www.mongodb.org/downloads
 [8]: https://github.com/mongodb/node-mongodb-native/
 [9]: http://mongoosejs.com/
 [10]: https://github.com/gett/mongojs
 [11]: http://mongodb.github.com/node-mongodb-native/contents.html
 [12]: https://github.com/andzdroid/mongo-express
 [13]: http://www.mongodb.org/display/DOCS/Drivers
 [14]: https://github.com/joyent/node/wiki/modules#wiki-db-nosql-mongo