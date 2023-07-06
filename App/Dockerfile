FROM node:14 AS Production


COPY package.json .
COPY package-lock.json .

RUN npm install
COPY . .

RUN npm run build

EXPOSE 3001
CMD ["npm", "start"]
