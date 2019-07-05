FROM node:8-alpine

RUN apk add --update build-base git python bash && \
  rm -rf /tmp/* /var/cache/apk/*

WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .
RUN yarn run build

FROM node:8-alpine
WORKDIR /usr/src/app
COPY --from=0 /usr/src/app/dist dist
COPY --from=0 /usr/src/app/node_modules node_modules
CMD [ "node", "dist/main.js" ]