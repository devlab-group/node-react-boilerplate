FROM node:latest as build-deps

WORKDIR /intermediate

COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build

FROM node:latest

RUN npm install -g pm2

WORKDIR /app

COPY --from=build-deps /intermediate/build ./build
COPY --from=build-deps /intermediate/server ./server

RUN cd ./server && yarn install

CMD ["pm2-runtime", "start", "/app/server/index.js"]

EXPOSE 3000
