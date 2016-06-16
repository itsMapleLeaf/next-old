source scripts/env.sh
$(npm bin)/watchify -p browserify-hmr -e "$entry" -o "$out" -v --debug
