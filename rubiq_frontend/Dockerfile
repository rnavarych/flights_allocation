FROM node:12-alpine

RUN mkdir -p /frontend

COPY . /frontend

WORKDIR /frontend

RUN yarn install
RUN yarn add node-sass

EXPOSE 3001

CMD [ "yarn", "start" ]
