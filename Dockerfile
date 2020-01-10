FROM node:stretch as build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run-script build

FROM nginx:stable

COPY etc/default.conf .
COPY bin/start.sh /bin/
COPY --from=build /app/dist /usr/share/nginx/html

ENTRYPOINT ["/bin/start.sh"]


