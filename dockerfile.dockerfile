# Use Node.js 10 as the base image
FROM node:10 AS build

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY . .

# Build the app
RUN npm run build -- --prod

# Use a lightweight web server to serve the app
FROM nginx:alpine

# Copy the built app to the web server's public directory
COPY --from=build /app/dist/lojaGiFront /usr/share/nginx/html

# Expose port 8080 for the web server
EXPOSE 8080

# Start the web server
CMD ["nginx", "-g", "daemon off;"]
