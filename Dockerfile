FROM node:18
WORKDIR /app
COPY .env /app
COPY package.json /app
COPY prisma /app
RUN npm install && npx prisma migrate dev
COPY . /app
CMD ["npm", "run", "start:dev"]