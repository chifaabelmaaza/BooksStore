# Base image for backend
FROM node:18.15.0-alpine AS backend

# Set the working directory for backend
WORKDIR /app/backend

# Copy package.json and package-lock.json for backend
COPY Api/package*.json ./

# Install backend dependencies
RUN npm install
RUN npm uninstall bcrypt bcryptjs
RUN npm install bcrypt bcryptjs

# Copy the backend code
COPY Api .

# Run the backend
CMD [ "npm", "run", "dev" ]


# Base image for frontend
FROM node:18.15.0-alpine AS frontend

# Set the working directory for frontend
WORKDIR /app/frontend

# Copy package.json and package-lock.json for frontend
COPY User/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the frontend code
COPY User .

# Build the frontend
RUN npm run build

# Stage for the final image
FROM node:18.15.0-alpine

# Set the working directory for the final image
WORKDIR /app

# Copy the built frontend files from the frontend stage
COPY --from=frontend /app/frontend/build ./frontend/build

# Copy the backend code from the backend stage
COPY --from=backend /app/backend .

# Expose the backend port (adjust as per your application)
EXPOSE 3000

# Run the backend
CMD [ "npm", "run", "dev" ]