FROM node:12-alpine

RUN mkdir -p /backend

COPY . /backend

WORKDIR /backend

RUN yarn add node-sass

EXPOSE 8081

CMD [ "yarn", "start" ]