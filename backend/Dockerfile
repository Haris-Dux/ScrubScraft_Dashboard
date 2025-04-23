

FROM node:22.14.0-alpine

WORKDIR /

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 5000
CMD ["npm", "start"]