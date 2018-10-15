FROM node:10.8-jessie

RUN yarn global add pm2

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn
COPY . ./

CMD ["pm2-docker", "start", "process.json"]
