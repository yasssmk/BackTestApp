#!/bin/bash

# Navigate to the working directory
cd /home/ubuntu/backtestApp/src/frontend

# Run the build process
/usr/bin/npm run build

# Serve the build directory
/usr/local/bin/serve -s build -l 3000