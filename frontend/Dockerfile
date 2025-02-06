FROM node:18 AS build
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Fix Webpack OpenSSL issue
ENV NODE_OPTIONS="--openssl-legacy-provider"

# Copy the app files and build
COPY . .
RUN npm run build

# Use a lightweight web server for production
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

