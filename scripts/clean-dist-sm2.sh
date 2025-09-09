#!/bin/bash

sleep 3
cd dist-webapp
sed -i.bak '/<li[^>]*class="[^"]*top-level-listing[^"]*"[^>]*>.*<\/li>/d' testbed-menu-sm.html
rm testbed-menu.html
rm testbed-menu-sm.html.bak
mv testbed-menu-sm.html testbed-menu.html

