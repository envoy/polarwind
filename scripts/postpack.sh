#!/bin/sh

set -ex

version=$(jq -r .version package.json)

# yarn pack has an annoying bug where it applies .gitignore exclusions in to the list of
# packaged files even if `files` allow list doesn't list those files
# https://github.com/yarnpkg/yarn/issues/7391
tar -czvf envoy-polarwind-v${version}.tgz.tmp --exclude=examples @envoy-polarwind-v${version}.tgz
mv envoy-polarwind-v${version}.tgz{.tmp,}
