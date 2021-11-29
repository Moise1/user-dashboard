# build environment
FROM node:16-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV=production
RUN apk add bash

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile --silent
RUN yarn global add react-scripts@4.0.3 --silent
COPY *.ps1 *.json ./
COPY . ./
RUN rm -rf ./src/css && \
    sass --no-source-map --style compressed ./src/sass/ ./src/sass/light-theme/:./src/css/ && \
    for f in ./src/css/*.css; do mv -- "$f" "${f%.css}.min.css"; done;
    
RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]