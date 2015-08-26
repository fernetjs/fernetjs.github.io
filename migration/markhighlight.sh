#!/bin/bash

echo "Adding highlightlines comment before code blocks.."
perl -0777 -i.original -pe 's/((<pre class="brush: .*?)?highlight: (.*?);)/<!--highlight:$3-->\n$1/gim' _posts/*.md

FILES=$(grep -HRl1 "highlight: \[" _posts/)
for f in $FILES
do
  echo "Marking migrations issues: $f "
  perl -0777 -i.original -pe 's/---(.*?)---/---$1migration_issue: highlightline\n---/gis' $f
done

echo "replacing pre with pygment blocks"
perl -0777 -i.original -pe 's/<pre class="brush: ([a-z]*).*?>(.*?)<\/pre>/{% highlight $1 %}\n$2 {% endhighlight %}/gis' _posts/*.md
perl -0777 -i.original -pe 's/{% highlight jscript %}/{% highlight js %}/gis' _posts/*.md

echo "manual fixes"
sed -i '78s/plain/bash/' _posts/2011-11-16-que-es-nodejs-breve-introduccion.md
sed -i '88s/plain/http/' _posts/2011-11-16-que-es-nodejs-breve-introduccion.md

rm _posts/*.original

echo "done!"
