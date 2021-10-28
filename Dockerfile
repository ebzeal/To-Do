FROM node:12-alpine AS builder

# Create app directory
RUN mkdir -p /usr/src/to-do-app
WORKDIR /usr/src/to-do-app

# Install app dependencies
COPY package.json /usr/src/to-do-app
RUN npm install

# Bundle app source
COPY . /usr/src/to-do-app

# Build arguments
ARG NODE_VERSION=12

# Environment
ENV NODE_VERSION $NODE_VERSION 

RUN npm run build

FROM node:12-alpine AS server
WORKDIR /usr/src/to-do-app
COPY package* ./
RUN npm install --production
COPY --from=builder ./app/public ./public
COPY --from=builder ./app/build ./build
EXPOSE 5000
CMD ["npm", "start"]