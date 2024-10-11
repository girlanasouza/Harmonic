#!/bin/sh

# Run database migrations
echo "Run migrate"
npm run migrate

# Seed the database
echo "Run Seed"
npm run seed

# Start the application
echo "Run dev"
npm run dev
