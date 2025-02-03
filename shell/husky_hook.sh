#!/bin/bash

mkdir -p .husky/_

# Copy husky hook files if they exist
if [ -d ".config/husky" ]; then
    cp -r .config/husky/_/husky.sh .husky/_/husky.sh
    cp -r .config/husky/commit-msg .husky/commit-msg
    cp -r .config/husky/pre-commit .husky/pre-commit
    cp -r .config/husky/pre-push .husky/pre-push
else
    echo "❌ Warning: .config/husky folder not found. Skipping hook copy."
fi