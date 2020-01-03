FROM node:10-alpine

COPY backend/dist/*.js /app/
COPY frontend/build/* /app/public/
COPY LICENSE /app/
COPY README.md /app/
COPY backend/package.json /app/
COPY backend/package-lock.json /app/

WORKDIR /app

RUN npm install --production

EXPOSE 8080
CMD ["/usr/local/bin/node", "server.js"]