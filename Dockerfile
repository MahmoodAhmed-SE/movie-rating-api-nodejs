FROM node:21-alpine3.18

WORKDIR /src

COPY . /src

RUN npm install 

EXPOSE 8080

ENV NAME movie-rating-alpine3

CMD ["npm", "start"]