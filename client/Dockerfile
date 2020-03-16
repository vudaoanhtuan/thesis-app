FROM node:12.16
RUN mkdir /client
WORKDIR /client
ADD package.json package-lock.json /client/
RUN npm install
ADD . /client/
ARG API_ADDRESS=http://localhost:5000/api
RUN echo "REACT_APP_API_ADDRESS=${API_ADDRESS}" > .env
ENTRYPOINT npm start