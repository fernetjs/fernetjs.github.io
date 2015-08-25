---
title: Mongoose + Nodejs + Modelos! Parte 1
author: alejonext
layout: post
permalink: /2013/02/mongoose-nodejs-modelos-parte-1/
dsq_thread_id:
  - 1080383420
categories:
  - Bibliotecas
  - Server Side
tags:
  - mongodb
  - mongoose
  - nodejs
---
La verdad es genial las NoSQL, pero siempre existe el problema. Como se modelar toda la información, tanto en NoSQL como en SQL. Como todos buenos arquitectos de la información, pero en este caso vamos a utilizar el FarmeWork [MongooseJs][1] que corre bastante bien en NodeJs.

Todo comenzó con los `callbacks`, en el `mongodb-native` de NodeJS. La verdad es bastante estresante generar muchísimos `callbacks`, y no se pueden generar relaciones entre una y otra colección. Ese realmente fue el problema que me enfrente. Y buscando encontré [MongooseJs][1], que construye modelos de información, para que todo sea mas asequible, y mas fácil de encontrar. Vamos a echarle un vistazo!

<pre class="brush: jscript; title: ; notranslate" title="">var mongoose = require('mongoose');
var db = mongoose.createConnection( 'mongodb://localhost:27017/prueba' );
</pre>

Hasta hora no es nada raro! Solo llamamos el modulo y le construimos una conexión a la base de datos. Ahora bien lo interesante! La construcción de la base de datos

<pre class="brush: jscript; title: ; notranslate" title="">var postSchema = mongoose.Schema({
    titulo: { type : String, trim : true, index : true },
    post : string,
    slug : string,
    autor : { type : Schema.Types.ObjectId, ref : 'autores' }  });
var userSchema = mongoose.Schema({
    name : { type : String, trim : true },
    nick : { type : String, trim : true, index : true },
    email: { type : String, trim : true },
});
</pre>

Listo! voy a dar un ejemplo de blog! Como vemos, construimos Schema (Esquemas). Estos esquemas, es tan dados en Json (Bastante cercano a MongoDB por que utilizan BSON que es el mismo JSON pero en Binario ). Cada propiedad debe tener una definición, al igual se pueden colocar múltiples validaciones de esa propiedad. Y todas los valores van a ser validados, si existe algún error nos mostrara. Es decir a los `titulo` no le puedo poner un `false,` únicamente un `String`.

<pre class="brush: jscript; title: ; notranslate" title="">var Post = db.model('posts', postSchema);
var User = db.model('users', userSchema);
</pre>

Y en lazaremos con la base de datos. El primer parámetro es el nombre de la Colección, y el segundo parámetro es el esquema. Ya con esto podemos subir información a la base de datos. Claro en el momento de subida va hacer validada.

<pre class="brush: jscript; title: ; notranslate" title="">var PrimerUsuario =  new User({
    name : 'Pepito Perez',
    nick : 'pepito',
    email: 'pepito@pepito.com'
});
PrimerUsuario.save(function(err, doc){
   if(err)
      console.log(err);
   var PrimerPost = new Post({
       titulo: 'Este es mi primer Post!',
       post  : 'Publicando mi primer post!! que felicidad!!',
       autor : doc._id,
   });
   PrimerPost.slug = slug( PrimerPost.titulo );
   PrimerPost.save( function(err, doc){
     console.log(err);
     console.log(doc);
   })
});
</pre>

Como podemos ver, lo primero que llamamos es a la creación de un nuevo usuario, le montamos en las propiedades que queremos, al igual que un `prototype`. Y claro esta la función llamada `save`, que nos va a retornar el Error y el Documento. Generando un nuevo post, hacemos lo mismo es decir le pasamos los parámetros que queremos. Yo utilizo `Slug` para tener urls familiares, al igual es un `Object`. Y guardamos! Y veremos algo así en consola.

<pre class="brush: jscript; title: ; notranslate" title="">{
    _id : 50903550a04313310c000001,
    titulo : 'Este es mi primer Post!',
    post : 'Publicando mi primer post!! que felicidad!!',
    slug : 'este-es-mi-primer-post',
    autor : 2d2ac97cf59cee65f7a38e596c,
}
</pre>

Claro yo se que los `id` no son los mismos, que salen en tu consola. Pero seamos un poco desconfiados, vamos a revisar la base de datos!

<pre class="brush: jscript; title: ; notranslate" title="">$ mongo
mongo&gt; show dbs
prueba 0.203125GB
test 0.203125GB
mongo&gt; use prueba
mongo&gt; show collections
posts
users
mongo&gt; db.users.find()
{ "_id" : ObjectId("2d2ac97cf59cee65f7a38e596c"), "name" : "Pepito Perez", "nick" : "pepito", "email" : "pepito@pepito.com" }
mongo&gt; db.posts.find()
{ _id : ObjectId("50903550a04313310c000001"), "titulo" : "Este es mi primer Post!", "post" : "Publicando mi primer post!! que felicidad!!", "slug" : "este-es-mi-primer-post", "autor" : ObjectId("2d2ac97cf59cee65f7a38e596c" }
</pre>

Genial!! Esta toda la información que subimos a la base de datos. Vamos a buscar a nuestro usuario!

<pre class="brush: jscript; title: ; notranslate" title="">User.findOne().where('nick', 'pepito').exec(function(err, doc){
   console.log(err);
   console.log(doc);
});
</pre>

<pre class="brush: jscript; title: ; notranslate" title="">null
{
    _id : 2d2ac97cf59cee65f7a38e596c,
    name : "Pepito Perez",
    nick : "pepito",
    email : "pepito@pepito.com",
}
</pre>

Tomamos el modelo, y le mandamos un `findOne`, `find` o `findById`, le podremos pasar [querys de Mongodb][2]. Pero todos estos parámetros en una función como aquí, y nos facilitan el trabajo. Nunca olvidemos hacerle `exec`. Si al igual podemos buscar los `Post`, pero también podemos saber de que usuario es! Miremos como se hace

<pre class="brush: jscript; title: ; notranslate" title="">Post.find().populate('autor').exec(function(err, doc){
   console.log(err);
   console.log(doc);
});
</pre>

Bueno en este caso, buscamos todos los Post. Le montamos la función `populate`, lo que hace, es buscar según el `id`, en otra colección y lo anida en la propiedad `autor`. Miremos que nos muestra la consola!

<pre class="brush: jscript; title: ; notranslate" title="">null
[ {
    _id : 50903550a04313310c000001,
    titulo : 'Este es mi primer Post!',
    post : 'Publicando mi primer post!! que felicidad!!',
    slug : 'este-es-mi-primer-post',
    autor : {
        _id : 2d2ac97cf59cee65f7a38e596c,
        name : "Pepito Perez",
        nick : "pepito",
        email : "pepito@pepito.com",
    }
} ]
</pre>

Como nos damos cuenta, es un `Array` o mejor una lista de `Object`, y dentro de cada `Object` existe el `Object` Usuario. Así se vuelve mucho mas fácil tanto la búsqueda como la subida de información. Claro teniendo esto podemos modificar el `nick` de nuestro usuario y con un `.save`, se sube a la base de datos.

Bueno esta es la primera parte de esta serie de posts. En el próximo les mostrare como guardar elementos anidados, hacer querys avanzados y validaciones.

 [1]: http://mongoosejs.com "MongooseJs"
 [2]: http://docs.mongodb.org/manual/reference/operators/ "Querys de MongoDB"