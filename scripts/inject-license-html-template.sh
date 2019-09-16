#!/bin/bash

# = NOTE =
# Use at root of repository: ./scripts/inject-license-js-source.sh
SRC=$(realpath src)
STRING="{{> license}}"

# clobber
# find "${SRC}/" -type f -name "*.html" -exec sed -i '1 a {{> license}}' {} \;

# check to see if already has license...
echo "Traversing ${SRC}..."
while IFS= read -r -d '' file; do
        if grep -q "$STRING" "$file"; then
                echo "$file"
                echo "Already has license..."
        else
                sed -i '1 a {{> license}}' "$file"
        fi
done < <(find "${SRC}/" -type f -name "*.html" -print0)
