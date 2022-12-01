FROM node:alpine

RUN mkdir /app
WORKDIR /app

# COPY package.json and package-lock.json files
COPY package*.json ./

COPY yarn.lock ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# COPY
COPY . .

RUN yarn install

EXPOSE 3000

CMD yarn prod