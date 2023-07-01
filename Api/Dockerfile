# Base image for backend
FROM node:18.15.0-alpine AS backend

# Set the working directory for backend
WORKDIR /app/backend

# Copy package.json and package-lock.json for backend
COPY package*.json ./

# Install backend dependencies
RUN npm cache clean --force && rm -rf node_modules && npm install

# Copy the backend code
COPY . .

# Expose the backend port (adjust as per your application)
EXPOSE 3001

# Run the backend
CMD [ "npm", "run", "dev" ]