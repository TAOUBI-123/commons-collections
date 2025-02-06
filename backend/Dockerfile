# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package.json ./
RUN npm install --production

# Copy application code
COPY server.js ./

# Expose API port
EXPOSE 5000

# Start the API server
CMD ["npm", "start"]

