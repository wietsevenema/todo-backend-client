# First stage: BUILD
FROM node:stretch AS build
WORKDIR /app

# Copy everything from the context
COPY . .

# Install dependencies
RUN npm install 
# Run bundler
RUN npx parcel build index.html --no-source-maps

# Second stage: RUN
FROM nginx:stable

# Add NGINX config with dynamic $PORT
COPY etc/default.conf .

# Copy build from dist folder
COPY --from=build /app/dist /usr/share/nginx/html

# start.sh resolves $PORT in config, and starts NGINX
COPY bin/start.sh /bin/
ENTRYPOINT ["/bin/start.sh"]