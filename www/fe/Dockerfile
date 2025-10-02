FROM node:16-alpine

# Create app directory
WORKDIR /var/www/trans-fe

# Install app dependencies - For NPM use: `COPY package.json package-lock.lock ./`
COPY package.json yarn.lock ./ 
# For NPM use: `RUN npm ci`
RUN yarn --pure-lockfile

# Copy important files
COPY . .

# Copy env
RUN rm -rfv .env
COPY .env.docker .env
RUN yarn build
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
CMD [ "yarn", "start" ]
EXPOSE 8687