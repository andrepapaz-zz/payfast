FROM node:carbon

ENV PORT=3000

LABEL maintainer="Andre Papazoglu"

COPY . /home/payfast

WORKDIR /home/payfast

RUN npm install

ENTRYPOINT [ "npm", "start" ]

EXPOSE $PORT