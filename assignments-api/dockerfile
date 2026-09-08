FROM node:lts

# Set the working directory
WORKDIR /app

# Copy npm package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy other source files
COPY index.js .
COPY database ./database

EXPOSE 3000

CMD ["node", "index.js"]