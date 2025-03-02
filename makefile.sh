#!/usr/bin/env sh

clean_install() {
  echo "Delete Node Modules"
  rm -rf node_modules
  echo "Installing packages"
  npm install
}

clean_build() {
  echo "Delete Build Folder"
  rm -rf .next
}

if [ "$1" = "clean_install" ]; then
  clean_install
elif [ "$1" = "clean_build" ]; then
  clean_build
else
  echo "Invalid function name. Available functions: 'clean_install'"
fi