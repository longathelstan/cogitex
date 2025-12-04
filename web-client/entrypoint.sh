#!/bin/sh

# Recreate config file
rm -rf /usr/share/nginx/html/env-config.js
touch /usr/share/nginx/html/env-config.js

# Add assignment 
echo "window._env_ = {" >> /usr/share/nginx/html/env-config.js

# Read each line in .env file
# Each line represents key=value pairs
printenv | grep VITE_ >> /usr/share/nginx/html/env-config.js

# Loop through environment variables and add them to the config file
if [ -z "$API_URL" ]; then
  # Default if not set
  echo "  API_URL: \"https://becognitex.lowng.me/api/auth\"," >> /usr/share/nginx/html/env-config.js
else
  echo "  API_URL: \"$API_URL\"," >> /usr/share/nginx/html/env-config.js
fi

echo "};" >> /usr/share/nginx/html/env-config.js

# Execute the command passed as arguments
exec "$@"
