#!/bin/sh

set -ex

MINIFY=1 postcss build/polarwind.css > build/polarwind.min.css

cp build/index.umd.js index.umd.js
cp build/index.esm.js index.esm.js
cp build/polarwind.css polarwind.css
cp build/polarwind.min.css polarwind.min.css
