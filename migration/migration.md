#Anécdotas de la migración de fernetjs desde wordpress a jekyll

##Exportando a jekyll
Se utilizó el plugin de wp. Desde el panel de admin se hizo el export, que genera un zip con los _posts, páginas, config, y wp-content, que fué extraído directamente en un directorio en el que previamente se había hecho `jekyll new`

##Convirtiendo snippets de código

Primero quise aprender un poco de `sed`, pero no tuve mucho éxito ya que lo que quería hacer funcionaba solo para una linea. Hasta que vi [esto](http://unix.stackexchange.com/a/26289), entonces luego de un par de modificaciones a la regex que tenía en sed, tuve el perl funcionando sobre mi archivo de pruebas.

    perl -0777 -i.original -pe 's/<pre class="brush: ([a-z]*).*>(.*)<\/pre>/{% highlight $1 %}\n$2\n{% endhighlight %}/g' test.txt

###Primera prueba

Para mi sorpresa, mi primera prueba funcionó sin errores. Hacía falta reemplazar jscript por js para que pygments lo reconozca.

    perl -0777 -i.original -pe 's/<pre class="brush: ([a-z]*).*>(.*)<\/pre>/{% highlight $1 %}\n$2\n{% endhighlight %}/gis' _posts/*.md
    perl -0777 -i.original -pe 's/{% highlight jscript %}/{% highlight js %}/gis' _posts/*.md

Pero al mirar manualmente los posts, esto tenía un problema: esas regex eran greedy y comía todos los posteos que tenían más de un bloque de código, ya que matcheaba desde el primer `<pre..` hasta el último `</pre>`.

### Lazy:
Explicación lazy vs greedy para los que no sepan:
https://stackoverflow.com/questions/2301285/what-do-lazy-and-greedy-mean-in-the-context-of-regular-expressions

    perl -0777 -i.original -pe 's/<pre class="brush: ([a-z]*).*?>(.*?)<\/pre>/{% highlight $1 %}\n$2 {% endhighlight %}/gis' _posts/*.md
    perl -0777 -i.original -pe 's/{% highlight jscript %}/{% highlight js %}/gis' _posts/*.md

Tuve que arreglar algunos lexers a mano, por ej. "plain" no existe, entonces reemplacé por http o bash cuando correspondía.  

### Cerrando
Luego de que pareciera todo bien, borro los backups, y estamos.
    rm _posts/*.original

### Highlight lineas de código
fernetjs usaba en algunos posts highlight de lineas de código. Cosa que pygments no soporta cuando jekyll corre en modo safe (modo en el que corre en gh pages). Así que a los posts que tenían highlight de lineas, le agregamos en el frontmatter un indicador de que no tiene highlight de lineas. Abusando de lo aprendido:

Para no perder nada lo dejamos como comment:
    perl -0777 -i.original -pe 's/((<pre class="brush: .*?)?highlight: (.*?);)/<!--highlight:$3-->\n$1/gim' _posts/*.md

    grep -HRl1 "highlight: \[" _posts/
    perl -0777 -i.original -pe 's/---(.*?)---/---$1migration_issue: highlightline\n---/gis'

Eso hay que ejecutarlo antes que todo lo anterior.

### Cerrando, parte II
Otra tarea que surgió fue la de reemplazar htmlentities que salieron del export, que quedaron atrapadas en el highlight.
Por ejemplo, en el código en lugar de ver `<`, en todos lados se veía `&lt;`.

## iframes
En un par de posts se embebía material de otros sitios. Nos damos cuenta porque en el export aparece `<!-- iframe plugin v.2.5 wordpress.org/extend/plugins/iframe/ -->` donde debería estar el iframe.
La corrección de esta data se hizo manualmente, ya que eran algunas pocas páginas/posts que hacían uso de este plugin de wordpress para incluir iframes. Todo lo que se hizo fue, incluir el respectivo html en el markdown apropiado.
