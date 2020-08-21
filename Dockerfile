FROM node:12-alpine
WORKDIR /candy_crush
COPY . .
RUN npm install
CMD ["npm run", "app.js"]