FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies including devDependencies
RUN npm install --include=dev

# Copy source code
COPY . .

# Build TypeScript using npx
RUN npx tsc

# Expose port
EXPOSE 4000

# Start the application
CMD ["npm", "run", "start:prod"]
