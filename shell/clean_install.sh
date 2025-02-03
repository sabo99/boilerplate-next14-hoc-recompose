#!/bin/bash


echo "Preparation for reinstall"
echo "==========================="

# Removing build
echo "Removing build..."
rm -rf .next

# Removing Husky
echo "Removing Husky..."
rm -rf .husky

# Removing node_modules
echo "Removing node_modules..."
rm -rf node_modules

# Copy Commitlint config
echo "Copy Commitlint..."
cp -r .config/commitlint/commitlint.config.ts commitlint.config.ts

# Reinstalling packages
echo "Reinstalling packages..."
npm install

echo "✅ Reinstallation done."
