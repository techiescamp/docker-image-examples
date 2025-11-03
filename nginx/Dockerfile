# Base image
FROM ubuntu:latest

# Use LABEL for metadata as recommended
LABEL maintainer="contact@devopscube.com"

# Install nginx
RUN apt-get update -y && apt-get install -y nginx

# Copy configuration files and content
COPY files/default /etc/nginx/sites-available/default
COPY files/index.html /usr/share/nginx/html/index.html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]