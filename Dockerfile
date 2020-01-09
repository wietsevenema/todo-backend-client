FROM node:stretch

WORKDIR /app
COPY . .

RUN npm install
RUN npm run-script build

CMD ["sh", "-c", "/app/node_modules/.bin/http-server -p ${PORT:-8080}"]