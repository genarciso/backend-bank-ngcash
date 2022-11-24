FROM node:alpine

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

RUN yarn prisma generate

EXPOSE 3000

CMD yarn dev