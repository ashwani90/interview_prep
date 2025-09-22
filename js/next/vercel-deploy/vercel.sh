#!/bin/bash
# deploy.sh

# Build the application
npm run build

# Deploy to Vercel
vercel --prod

# Add domain if not already added
vercel domains add mydomain.com

# Verify domain
vercel domains verify mydomain.com

# List domains
vercel domains ls