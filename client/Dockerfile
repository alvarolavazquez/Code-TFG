FROM node:14 AS Production


COPY package.json .
COPY package-lock.json .

RUN npm install
COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]