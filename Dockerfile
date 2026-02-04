# Stage 1: Build Angular Frontend
FROM node:lts-alpine AS frontend-build
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .
# Build based on angular.json configuration
RUN npm run build -- --configuration=production --base-href=/

# Stage 2: Build Node.js Backend & Final Image
FROM node:lts-alpine
WORKDIR /app

# Install backend dependencies
COPY package*.json ./
RUN npm install --silent

# Copy backend source code
COPY . .

# Copy built frontend files to a folder the backend can serve
# Path corresponds to outputPath in angular.json
COPY --from=frontend-build /app/dist/tsr/browser ./public

# Expose backend port
EXPOSE 3000

# Start the server using index.js
CMD ["node", "src/index.js"]
