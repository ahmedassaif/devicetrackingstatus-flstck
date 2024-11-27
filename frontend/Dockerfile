# Step 1: Build the React app
FROM node:18 AS build

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app’s source code
COPY . .

# Build the app for production
RUN npm run build

# Step 2: Serve the built React app using a simple web server
FROM nginx:alpine

# Copy the build files from the previous step to Nginx's web directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port that the React app will run on
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
