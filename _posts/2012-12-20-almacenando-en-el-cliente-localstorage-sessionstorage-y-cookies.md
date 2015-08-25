---
title: 'Almacenando en el cliente: LocalStorage, SessionStorage y Cookies'
author: Pablo Novas
layout: post
permalink: /2012/12/almacenando-en-el-cliente-localstorage-sessionstorage-y-cookies/
dsq_thread_id:
  - 984203554
categories:
  - Client Side
  - Utilidades
tags:
  - cookies
  - html5
  - local storage
  - session storage
---
Seguramente ya escuchaste sobre el almacenamiento local de HTML5, la intensión de este post es pegarle un vistazo para que empieces a usarlo.

Primero tenemos que tener en cuenta que LocalStorage es el almacenamiento que no expira, y SessionStorage es el que vive sólo en una sesión.  
Ambos tienen los mismos métodos:

  * **getItem** ( *key* )
  * **setItem** ( *key* , *value* )
  * **removeItem** ( *key* )

> Van a ver por ahí un **globalStorage**: es una implementación de Mozilla previa a HTML5, pero desde la versión de Firefox 13 dejó de soportarse, por lo que olvidate de que existe 😉 

No hay mucho para explicar sobre los métodos ya que hablan por si solos, veamos un ejemplo:

<pre class="brush: jscript; title: ; notranslate" title="">if (window.localStorage) {

  localStorage.setItem("nombre", "pepe");

  var nombre = localStorage.getItem("nombre");
  
  localStorage.removeItem("nombre");
}
else {
  throw new Error('Tu Browser no soporta LocalStorage!');
}
</pre>

> También se puede utilizar los Items como propiedades del objeto localStorage ó sessionStorage (pero <font style="color:red"><strong>no está recomendado</strong></font>, así que tomalo como título informativo):
> 
> <pre class="brush: jscript; title: ; notranslate" title="">localStorage["nombre"] = "pepe";
var nombre = localStorage.nombre;
delete localStorage["nombre"];
</pre>

El soporte de navegadores es muy amplio:

<pre>+----------------+--------+-----------------+----+-------+-----------------+
|    Feature     | Chrome | Firefox (Gecko) | IE | Opera | Safari (WebKit) |
+----------------+--------+-----------------+----+-------+-----------------+
| localStorage   |      4 | 3.5             |  8 | 10.50 |               4 |
| sessionStorage |      5 | 2               |  8 | 10.50 |               4 |
+----------------+--------+-----------------+----+-------+-----------------+
</pre>

Pueden ver mas info [acá][1]

**Y cuánto podemos almacenar?**: depende mucho del navegador, pero la cantidad oscila entre 2.5 y 5 Mb (2.5 Mb en la mayoría de los navegadores, lo cual es bastante 😉 )  
Pueden ver la tabla completa y probar cuanto se banca el navegador en el que están en [Web Storage Test][2]

**Podemos guardar JSON?**, Si, pero yo te recomendaria que sea serializado, (en String) y lo que hagas **antes de enviarlo**.  
Por que esto?

  1. Por los *&#8220;fallbacks/ polyfills&#8221;*, si queremos agregarle un soporte a cookies por si no tiene disponible el web storage, puede que tengamos problemas si no estamos manejando strings.
  2. Lo serializa de todas formas, pero la diferencia es que no es automático, por lo que podemos tener comportamientos extraños:

<pre class="brush: jscript; title: ; notranslate" title="">localStorage.setItem("locura", true);
  var locura = localStorage.getItem("locura");
  console.log(locura); // true
  console.log(typeof locura); // 'string'
</pre>

Ahora, con JSON?, supongamos que tenemos:

<pre class="brush: jscript; title: ; notranslate" title="">var persona = {
    nombre: "pepe",
    edad: 20,
    locura: true
};
</pre>

**Guardamos directo el JSON al localStorage:**

<pre class="brush: jscript; title: Problem?; notranslate" title="Problem?">localStorage.setItem("persona", persona);
var personaGuardada = localStorage.getItem("persona");

console.log(typeof persona); //object
console.log(typeof personaGuardada); //string

console.log(personaGuardada.locura); //undefined!
var personaGuardada = JSON.parse(personaGuardada); //Uncaught SyntaxError
</pre>

**Como habría que hacerlo:**

<pre class="brush: jscript; highlight: [1,9]; title: ; notranslate" title="">var personaAGuardar = JSON.stringify(persona);

localStorage.setItem("persona", personaAGuardar);
var personaGuardada = localStorage.getItem("persona");

console.log(typeof persona); //object
console.log(typeof personaGuardada); //string

var personaGuardada = JSON.parse(personaGuardada); 
console.log(personaGuardada.locura); //true
</pre>

* * *

Por último te dejo un fallback a Cookies, ya que no siempre tenemos soporte para usarlo, está es una implementacion de Mozilla bastante coqueta (no se si funciona en IE 7, por ejemplo), la idea es que en nuestra aplicación usamos directamente window.localStorage y siempre va a existir, si el browser no lo soporta va a ir a cookies automáticamente.  
**Fuente**: [MDN &#8211; DOM Storage][3]

<pre class="brush: jscript; title: ; notranslate" title="">if (!window.localStorage) {
  Object.defineProperty(window, "localStorage", new (function () {
    var aKeys = [], oStorage = {};
    Object.defineProperty(oStorage, "getItem", {
      value: function (sKey) { return sKey ? this[sKey] : null; },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "key", {
      value: function (nKeyId) { return aKeys[nKeyId]; },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "setItem", {
      value: function (sKey, sValue) {
        if(!sKey) { return; }
        document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "length", {
      get: function () { return aKeys.length; },
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "removeItem", {
      value: function (sKey) {
        if(!sKey) { return; }
        document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    this.get = function () {
      var iThisIndx;
      for (var sKey in oStorage) {
        iThisIndx = aKeys.indexOf(sKey);
        if (iThisIndx === -1) { oStorage.setItem(sKey, oStorage[sKey]); }
        else { aKeys.splice(iThisIndx, 1); }
        delete oStorage[sKey];
      }
      for (aKeys; aKeys.length &gt; 0; aKeys.splice(0, 1)) { oStorage.removeItem(aKeys[0]); }
      for (var aCouple, iKey, nIdx = 0, aCouples = document.cookie.split(/\s*;\s*/); nIdx &lt; aCouples.length; nIdx++) {
        aCouple = aCouples[nIdx].split(/\s*=\s*/);
        if (aCouple.length &gt; 1) {
          oStorage[iKey = unescape(aCouple[0])] = unescape(aCouple[1]);
          aKeys.push(iKey);
        }
      }
      return oStorage;
    };
    this.configurable = false;
    this.enumerable = true;
  })());
}
</pre>

 [1]: http://caniuse.com/#feat=namevalue-storage
 [2]: http://dev-test.nemikor.com/web-storage/support-test/
 [3]: https://developer.mozilla.org/en-US/docs/DOM/Storage