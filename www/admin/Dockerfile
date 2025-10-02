FROM node:14.19.1-alpine

# Create app directory
WORKDIR /var/www/trans-admin

# Install app dependencies - For NPM use: `COPY package.json package-lock.lock ./`
COPY package.json yarn.lock ./ 
# For NPM use: `RUN npm ci`
RUN yarn --pure-lockfile

# Copy important files
COPY . .

# Copy env
RUN rm -rfv .env
COPY .env.docker .env

CMD [ "yarn", "start" ]
EXPOSE 8688