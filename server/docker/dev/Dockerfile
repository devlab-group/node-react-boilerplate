FROM node:10.8-jessie

RUN yarn global add pm2

WORKDIR /app

CMD ["pm2-dev", "start", "process.json"]
