#!/bin/bash

echo "Setting up Husky..."
echo

# Remove old Husky setup if exists
if [ -d ".husky" ]; then
    echo -n "Removing old Husky setup..."
    rm -rf .husky
    echo "✔ Husky setup removed."
fi

# Initialize Husky
echo "Initializing Husky..."
npx husky init && husky
echo "✔ Husky initialized."

# Preparing Husky hooks
echo "Preparing Husky hooks..."
sh ./shell/husky_hook.sh
echo "✔ Husky hooks prepared."

# Cleaning up 'prepare' script
echo "Cleaning up 'prepare' script..."
npm pkg delete scripts.prepare
echo "✔ 'prepare' script cleaned up."
echo

echo "✅ Husky setup completed successfully!"
