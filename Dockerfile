FROM node:latest as build

WORKDIR /app

COPY ./newfront/package.json .

RUN npm i

COPY ./newfront/ .

RUN npm run build --prod

FROM nginx:latest

COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/newfront /usr/share/nginx/html





