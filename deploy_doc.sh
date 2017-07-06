#!/bin/bash

set -o errexit -o nounset

if [ "$TRAVIS_BRANCH" != "master" ]
then
  echo "This commit was made against the $TRAVIS_BRANCH and not the master! No deploy!"
  exit 0
fi

rev=$(git rev-parse --short HEAD)

npm run esdoc

cd docs

git init
git config user.name "Chat-Wane"
git config user.email "grumpy.chat.wane@gmail.com"

git remote add upstream "https://$GH_TOKEN@github.com/chat-wane/LSEQTree.git"
git fetch upstream
git reset upstream/gh-pages

touch .

git add -A .
git commit -m "rebuild gh-pages with docs at ${rev}"
git push -q upstream HEAD:gh-pages
