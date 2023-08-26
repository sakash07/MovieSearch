# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Install required dependencies, including GLIBC 2.29
RUN apt-get update && apt-get install -y libc6

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy all app source files to the working directory
COPY . .

# Expose the port for Parcel (e.g., 1234)
EXPOSE 1234

# Start Parcel to run your app
CMD ["npm", "run", "dev"]
