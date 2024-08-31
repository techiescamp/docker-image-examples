# Use the official minimal Ubuntu base image
FROM ubuntu:latest

# Set the maintainer label
LABEL maintainer="contact@devopscube.com"

# Install nginx in a single RUN command to reduce the number of layers
RUN apt-get update && \
    apt-get install -y nginx && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN useradd -ms /bin/bash nginxuser && \
    mkdir -p /var/run/nginx /var/cache/nginx && \
    chown -R nginxuser:nginxuser /var/run/nginx /var/cache/nginx /etc/nginx /usr/share/nginx/html && \
    chmod -R 755 /var/run/nginx /var/cache/nginx /etc/nginx /usr/share/nginx/html

# Update the PID path in the nginx configuration
RUN sed -i 's/\/run\/nginx.pid/\/var\/run\/nginx\/nginx.pid/g' /etc/nginx/nginx.conf

# Set the user to nginxuser
USER nginxuser

# Expose port 8080
EXPOSE 8080

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
