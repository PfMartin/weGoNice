FROM mongo:4.4.18

ENV MONGO_INITDB_DATABASE=weGoNice
ENV MONGO_INITDB_USERNAME=NiceUser
ENV MONGO_INITDB_PASSWORD=nicePassword

COPY ./init-mongo.js /docker-entrypoint-initdb.d/init-mongo.js

EXPOSE 27017-27019

CMD ["mongod"]