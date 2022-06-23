FROM node:18
WORKDIR /app
COPY package.json /app
RUN npm install 
COPY . /app
CMD ["npm", "run", "start:dev"]
RUN npx prisma migrate dev