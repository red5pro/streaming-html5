#!/bin/bash

# = NOTE =
# Use at root of repository: ./scripts/inject-license-js-source.sh
SRC=$(realpath src)
CSS=$(realpath static/css)
STRING="Copyright © 2015 Infrared5"
LICENSE=$(realpath scripts/LICENSE.css)

# clobber
# find "${SRC}/" -type f -name "*.css" -exec sh -c "cat scripts/LICENSE.css {} > $$.tmp && mv $$.tmp {}" \;

# check to see if already has license...
echo "Traversing ${SRC}..."
while IFS= read -r -d '' file; do
        if grep -q "$STRING" "$file"; then
                echo "$file"
                echo "Already has license..."
        else
                cat "$LICENSE" "$file" > $$.tmp && mv $$.tmp "$file"
        fi
done < <(find "${SRC}/" -type f -name "*.css" -print0)

echo "Traversing ${CSS}..."
while IFS= read -r -d '' file; do
        if grep -q "$STRING" "$file"; then
                echo "$file"
                echo "Already has license..."
        else
                cat "$LICENSE" "$file" > $$.tmp && mv $$.tmp "$file"
        fi
done < <(find "${CSS}/" -type f -name "*.css" -print0)
