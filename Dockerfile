FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

# CMD ["node", "dist/index.js"]
# Wait for database, run migrations, then start server
CMD sh -c "sleep 5 && npx prisma migrate deploy && node dist/index.js"