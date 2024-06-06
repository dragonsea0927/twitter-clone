# Stage 1: Build the Next.js application
FROM node:18.18.0 AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the Next.js application
RUN npm run build
 
# Stage 2: Serve the application
FROM node:18.18.0

WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app ./

# Expose the application port
EXPOSE 8000

# Start the Next.js application
CMD ["npm", "run", "dev"]
