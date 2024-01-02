#!/bin/bash

# Change directory to the specified path for npm
cd "/c/Users/Austin/Desktop/News/frontend" || exit

# Run npm command in the background
npm run dev --watch &

# Capture the process ID (PID) of the npm command
npm_pid=$!

# Change directory to the desired location for the Python manage.py file
cd "/c/Users/Austin/Desktop/News/frontend/manage.py" || exit

# Run Python manage.py command
python manage.py runserver &

# Capture the process ID (PID) of the Python manage.py command
python_pid=$!

# Wait for a moment to ensure that the servers have started
sleep 20

# Open the default web browser to the specified URL
case "$(uname -s)" in
  "Darwin")
    open "http://127.0.0.1:8000" ;;
  "Linux")
    xdg-open "http://127.0.0.1:8000" ;;
  "MINGW"*)
    start "" "http://127.0.0.1:8000" ;;
  *)
    echo "Unsupported operating system"
    exit 1 ;;
esac

# Wait for user input to terminate the background processes
read -rp "Press Enter to stop the servers..."

# Terminate the background processes
kill "$npm_pid" "$python_pid"
