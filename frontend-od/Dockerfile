FROM node:16-alpine as builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci
# export NODE_OPTIONS=--openssl-legacy-provider
COPY . .
RUN npm run build

FROM nginx:1.22.1-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY certs /etc/nginx/certs
COPY --from=builder /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]