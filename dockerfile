# pull official base image
FROM node:16-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
RUN apk add bash

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile --silent
RUN yarn global add react-scripts@4.0.3 --silent
RUN rm -rf ./src/css && \
    sass --no-source-map --style compressed ./src/sass/**/:./src/css/ && \
    for f in ./src/css/*.css; do mv -- "$f" "${f%.css}.min.css"; done;

# add app
COPY . ./

# start app
CMD ["npm", "start"]