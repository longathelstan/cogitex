# Build stage
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY env.sh /docker-entrypoint.d/env.sh

RUN chmod +x /docker-entrypoint.d/env.sh

EXPOSE 80

# Nginx image automatically runs scripts in /docker-entrypoint.d/
# But we need to make sure our script runs. 
# The default entrypoint is /docker-entrypoint.sh which runs scripts in /docker-entrypoint.d/
# So we just need to copy it there.
# However, our env.sh ends with starting nginx, which might conflict if the default entrypoint also starts nginx.
# Let's modify env.sh to NOT start nginx, and let the default entrypoint handle it.

CMD ["nginx", "-g", "daemon off;"]
