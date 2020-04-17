#!/bin/sh

set -e

PHASE=purge postcss dist/polarwind.full.css > dist/polarwind.css
PHASE=minify postcss dist/polarwind.css > dist/polarwind.min.css
rm dist/polarwind.full.css
