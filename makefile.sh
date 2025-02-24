#!/usr/bin/env sh

clean_install() {
  echo "Delete Node Modules"
  rm -rf node_modules
  echo "Installing packages"
  npm install
}

if [ "$1" = "clean_install" ]; then
  clean_install
else
  echo "Invalid function name. Available functions: 'clean_install'"
fi