---
title: Backbone JS
author: Pablo Novas
layout: post
permalink: /2013/09/backbone-js/
dsq_thread_id:
  - 1780782945
categories:
  - Bibliotecas
  - Client Side
tags:
  - backbone
---
Últimamente lo vengo utilizando mucho y como me tiraron varias veces la pregunta &#8220;que es backbone?&#8221; armo este post para dar una idea de lo que es y sus principales características.

[Backbone][1] (columna vertebral en español) intenta darnos una estructura para nuestra aplicación cliente. La idea es básicamente pensar en Modelos, Colecciones (de modelos) y Vistas. Como agregado a estos también tenemos Eventos (para la comunicación entre estas capas) y ya enganchado adentro de los Modelos y Colecciones métodos para utilizar servicios JSON Restfull mediante AJAX.

En este post voy a mostrar Modelo y Colección, con sus eventos y persistencia en el server.

Dicho esto, veamos una imagen para hacerlo un poco mas claro:  
[<img src="http://fernetjs.com/wp-content/uploads/2013/09/backbone_map.png" alt="backbone_map" width="500" height="200" class="size-full wp-image-3863" />][2]

### Modelo (Backbone.Model)

Es el dominio de tu aplicación, la idea es que ahí guardes los estados de tus Entidades, con sus métodos y también puede llegar a acceder al server mediante AJAX ya sea para un DELETE (eliminar), PUT (actualizar) o un POST (crear).

{% highlight js %}
// Definimos un modelo Persona, extendiendo de la clase Backbone.Model.
var Persona = Backbone.Model.extend({
  
  // valores predeterminados nuestro modelo.
  defaults: {
    nombre: "Sin Nombre",
    edad: 30
  },

  initialize: function(modelo, opciones){
    // constructor
  },

  parse: function(response){
    // sobre-escribimos la respuesta del server
    // por si necesitamos hacer algo antes de que se cree el modelo
    // por ejemplo: 
    response.edadLoca = response.edad * 5;

    //esto nos va a dejar hacer modelo.get('edadLoca')

    return response;
  },

  calcularAlgo: function(){
    // método de instancia
    // this se bindea con la instancia
    // por ejemplo: this.defaults
  }  

}, {
  
  calcularAlgoEstatico: function(){
    // método estático
  }

});

// Ahora creemos una instancia del modelo:
var pablito = new Persona({
  nombre: "Pablo",
  edad: 500 // si, soy muy anciano
});

pablito.calcularAlgo();
Persona.calcularAlgoEstatico();

 {% endhighlight %}

#### Propiedades y Eventos de un Modelo

En un modelo de Backbone las propiedades de instancia se guardan todas adentro de &#8220;attributes&#8221;. Y a diferencia de lo que estamos acostubrados en js, por ejemplo un json, se acceden por 2 métodos *get* y *set*:

{% highlight js %}
var nombre = pablito.get('nombre'); // "Pablo"
pablito.set('nombre', "Pablo2");

// También podemos pasar un JSON y aplicar varios:
pablito.set({
  nombre: "Pablo3",
  edad: 300
});

// Podemos ver los cambios en
console.dir(pablito.attributes); 
 {% endhighlight %}

Cuando realizamos un *set* se dispara un evento &#8220;change&#8221;, podemos escuchar los eventos del modelo con el método **on**:

{% highlight js %}
pablito.on('change', function(){
  // alguna propiedad cambió
});

pablito.on('change:edad', function(){
  // la edad se modificó
});

// eliminamos todos los manejadores del evento
pablito.off('change'); 
pablito.off('change:edad'); 
 {% endhighlight %}

### Colección (Backbone.Collection)

También es parte de tu dominio, están pensadas como colecciones de modelos. Aparte de esto, tiene muchas utilidades mas, como centralizar métodos al servidor, ordenar los modelos, eventos, etc.

{% highlight js %}
// Definimos una colección de Personas, extendiendo de la clase Backbone.Collection.
var Personas = Backbone.Collection.extend({
  
  // Definimos cual es el modelo de esta colección.
  model: Persona,

  // Definimos la url base RESTfull de para esta colección.
  url: '/personas',

  initialize: function(arrayDeModelo, opciones){
    // constructor de la colección
  },

  parse: function(response){
    // lo mismo que en el modelo, con la diferencia 
    // que response va a ser un array en vez de un objeto
    return response;
  }

});

// Ahora creemos una instancia de la colección:
var personas = new Personas([{
  id: 1234,
  nombre: "jose",
  edad: 20
}, {
  id: 1235,
  nombre: "pepe",
  edad: 40
}]);

// automáticamente tenemos en la colección los modelos listos para usar
// podemos ir por indicé
personas.at(0).get('nombre'); // "jose"
// o por id
personas.get(1235).get('nombre'); // "pepe"
 {% endhighlight %}

#### Modificando una Colección

Ya vimos como crear una colección pasandole modelos, ahora veamos como agregar y eliminar modelos.

{% highlight js %}
// tememos una persona en json
var personaJSON = {
  id: 1236,
  nombre: "juan",
  edad: 25
};

// Podemos agregarla directamente a la colección
personas.add(personaJSON);
personas.get(1236).get('nombre'); // "juan"

// o bien podemos agregar un modelo de la misma manera
var juan = new Persona(personaJSON);
personas.add(juan);
personas.get(1236).get('nombre'); // "juan"

// para eliminar a juan de la colección:
var personaJuan = personas.get(12346);
personas.remove(personaJuan);

// también podemos limpiar una colección 
personas.reset();
// personas.length === 0

 {% endhighlight %}

En Backbone ya tenemos por defecto dentro de una coleccion todos las funciones (creo que todas) de [UnderscoreJS][3]. Lo que significa que podemos usar, por ejemplo el each:

{% highlight js %}
//con underscore y un array harías algo como 
_.each(personas, function (persona) { });

// en backbone ya lo tenemos disponible desde la colección:
personas.each(function(persona){ });
 {% endhighlight %}

#### Eventos de una Colección

Así como los modelos tienen eventos de cambio (change), la colección nos agrega algunos mas  
De la misma manera que nos des/suscribimos a los eventos de un modelo con &#8220;on&#8221; y &#8220;off&#8221;, lo podemos hacer en una colección para el add, remove o reset.

{% highlight js %}
personas.on('add', function(personaAgregada){
  //se agregó personaAgregada a la coleccion
});
 {% endhighlight %}

El evento change de una colección se va a disparar cuando algún modelo que se encuentre en ella dispare el change.

{% highlight js %}
// Paso 3, se dispara el evento change en la colección.
personas.on('change:edad', function(persona){
  //persona cambio su edad
});

// Paso 2, se dispara el evento change de la entidad.
persona.on('change:edad', function(){
  //cambio la edad de la persona
});

// Paso 1, cambio la edad.
persona.set('edad', 40);
 {% endhighlight %}

### Persistiendo en el servidor:

Algo a tener en cuenta antes de meternos con persistencia, es ver como se mapean los métodos HTTP con las acciones:  
Obtener un Recurso = GET  
Nuevo Recurso = POST  
Actualizar Recurso Existente = PUT  
Eliminar un Recurso = DELETE

En backbone no vamos a estar pensando en los métodos HTTP, simplemente utilizamos los de backbone:

{% highlight js %}
// tomando como url la especificada en la colección del ejemplo anterior

modelo.fetch() //GET /personas/id
coleccion.fetch() //GET /personas

modelo.save() //POST /personas (si NO tiene id) 
modelo.save() //PUT /personas/id (si tiene un id)
modelo.destroy() //DELETE /personas/id

// en vez de hacer un .add() y despues un .save()
// se puede utilizar el create de la coleccion
coleccion.create(modelo) //POST
 {% endhighlight %}

Algo a tener en cuenta es que para que los métodos del modelo disparen un pedido al servidor, tienen que estar dentro de una colección con su atributo *url* especificado.

En caso de que no tengamos una colección y sea simplemente un modelo que tiene que disparar pedidos al servidor, tenemos que especificarle el atributo **urlRoot** al modelo directamente (backbone se va a encargar de agregar el id de la entidad al final de la url en cada pedido):

{% highlight js %}
var pesona = Backbone.Model.extend({
  urlRoot: "/personas"
});
 {% endhighlight %}

#### Identificadores en un modelo

Backbone va a utilizar por defecto la propiedad con nombre **id** como el id del modelo (en caso de que exista). Para cambiar eso, es simplemente especificarle en la colección otro atributo como: 

{% highlight js %}
idAttribute: "idPersona"
 {% endhighlight %}

> Si **no** hay una propiedad **id** y tampoco especificas otra, tené en cuenta que para backbone ese modelo es NUEVO, es decir, va a resultar siempre en un POST y si le preguntas a Backbone, te va a decir:
> 
> {% highlight js %}
personita.isNew() === true
 {% endhighlight %}

Hay mucho, pero mucho más para ver de Backbone, así que si alguien quiere prenderse y armar un post de Vistas, sería genial!  
También existen otras bibliotecas para atacar la estructuración, eventos, etc de una aplicación cliente, como [Angular][4], [CanJS][5], [Ember][6], etc. No tuve experiencias con esas todavía, me gustaría escuchar la de ustedes 😉

Pueden ver ejemplos ya armados con muchas bibliotecas en [TODO MVC][7]

 [1]: http://backbonejs.org
 [2]: http://fernetjs.com/wp-content/uploads/2013/09/backbone_map.png
 [3]: http://underscorejs.org
 [4]: http://angularjs.org/
 [5]: http://canjs.com/
 [6]: http://emberjs.com/
 [7]: http://todomvc.com/