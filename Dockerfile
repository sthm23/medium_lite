FROM node:18-alpine

# ENV NODE_ENV=production

EXPOSE 4000

# Create app directory
WORKDIR /medium_lite/app/src

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json .

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Generate Prisma client
RUN npx prisma generate

CMD ["npm", "run", "start"]