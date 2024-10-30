FROM node:20.12.2-alpine

# Work directory for all steps
WORKDIR /app

# Copy files from local to the work directory
COPY /public ./public
COPY /src ./src
COPY /package*.json ./

# Install all dependencies
RUN npm install

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
