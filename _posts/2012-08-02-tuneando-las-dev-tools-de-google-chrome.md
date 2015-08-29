---
title: Tuneando las Dev Tools de Google Chrome
author: pjnovas
layout: post
permalink: /2012/08/tuneando-las-dev-tools-de-google-chrome/
dsq_thread_id:
  - 789818079
categories:
  - Utilidades
---
Probaste usar la consola, o mejor dicho, alguna de las herramientas de desarrollo de Google Chrome (F12) en un proyector?, se complica, el tamaño de las fonts no está preparado para hacerse visible, así que me puse a investigar como modificarlo y me encontré con algo muy interesante: están hechas en Javascript, HTML y CSS con toda la locura, lo que significa que modificando sus clases CSS podemos variarlas a nuestro gusto.

Acá dejo los path donde encontrar los archivos para modificar:

Windows Vista y 7
:   {% highlight bash %}
C:\Users\[userName]\AppData\Local\Google\Chrome\User Data\Default\User StyleSheets\Custom.css {% endhighlight %}

Windows XP
:   {% highlight bash %}
C:\Documents and Settings\[userName]\Configuración local\Datos de programa\Google\Chrome\User Data\Default\User StyleSheets\Custom.css {% endhighlight %}

Linux
:   {% highlight bash %}
~/.config/google-chrome/Default/User StyleSheets/Customs.css {% endhighlight %}

Mac
:   {% highlight bash %}
~/Library/Application Support/Google/Chrome/Default/User StyleSheets/Custom.css {% endhighlight %}

El archivo Custom.css lo vas a tener en blanco, así que para guiarte en los cambios de sobre-escritura de clases podés ver los que actualmente están aplicados en tu browser ingresando lo siguiente en el cuadro de direcciones del Chrome 

{% highlight bash %}
chrome-devtools://devtools/devTools.css {% endhighlight %}

Como se puede ver, el archivo es bastante extenso, pero se torna muy divertido lo que se puede lograr dandole tu *estilo*.

Por ejemplo, para solucionar mi problema con el tamaño de la font, hice lo siguiente en mi Custom.css (estoy en Ubuntu):

{% highlight css %}
body.platform-linux .monospace, body.platform-linux .source-code {
    font-size: 22px !important;
    line-height: 26px;
    font-family: dejavu sans mono, monospace;
}
 {% endhighlight %}

Algunos links con Themes (algunos extraídos de <a href="http://darcyclarke.me/design/skin-your-chrome-inspector/" target="_blank">este excelente post</a>):

  * <a href="https://gist.github.com/1150520" target="_blank">IR_black</a>  
    [<img src="http://fernetjs.com/wp-content/uploads/2012/08/Screen-shot-2011-08-19-at-2.06.52-PM-300x121.png" alt="" title="Screen shot 2011-08-19 at 2.06.52 PM" width="300" height="121" class="alignnone size-medium wp-image-2484" />][1] 
  * <a href="https://gist.github.com/1152045" target="_blank">Expresso</a>  
    [<img src="http://fernetjs.com/wp-content/uploads/2012/08/Style-Chrome-Inspector-3-300x122.png" alt="" title="Style Chrome Inspector-3" width="300" height="122" class="alignnone size-medium wp-image-2485" />][2] 
  * <a href="https://gist.github.com/2174604" target="_blank">Solarized Dark (mi preferido)</a>  
    [<img src="http://fernetjs.com/wp-content/uploads/2012/08/3yAuuh-300x80.jpg" alt="" title="3yAuuh" width="300" height="80" class="alignnone size-medium wp-image-2481" />][3]

 [1]: http://fernetjs.com/wp-content/uploads/2012/08/Screen-shot-2011-08-19-at-2.06.52-PM.png
 [2]: http://fernetjs.com/wp-content/uploads/2012/08/Style-Chrome-Inspector-3.png
 [3]: http://fernetjs.com/wp-content/uploads/2012/08/3yAuuh.jpg