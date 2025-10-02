FROM node:16-alpine

RUN apk add --no-cache python3 py3-pip make g++
RUN apk add --no-cache libjpeg libpng tiff-dev giflib-dev libwebp libpng-dev jpeg-dev

# Create app directory
WORKDIR /var/www/trans-api

# Install app dependencies - For NPM use: `COPY package.json package-lock.lock ./`
COPY package.json ./
# For NPM use: `RUN npm ci`
# RUN yarn --pure-lockfile

# Copy important files - Add ormconfig.ts here if using Typeorm
COPY .eslintrc.js nest-cli.json tsconfig.json tsconfig.build.json ./
COPY . .

RUN mkdir -p /var/www/trans-api/public/uploads/documents
RUN mkdir -p /var/www/trans-api/public/uploads/images
RUN mkdir -p /var/www/trans-api/public/uploads/assets

# Copy env
RUN rm -rfv .env
COPY .env.docker .env
RUN npm install
RUN yarn build

CMD [ "yarn", "start:prod" ]
EXPOSE 8686