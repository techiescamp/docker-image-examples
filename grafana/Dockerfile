# Use Ubuntu as the base image
FROM ubuntu:24.04

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Install required packages
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    apt-transport-https \
    software-properties-common \
    && rm -rf /var/lib/apt/lists/*

# Install Grafana
RUN wget -q -O /usr/share/keyrings/grafana.key https://packages.grafana.com/gpg.key \
    && echo "deb [signed-by=/usr/share/keyrings/grafana.key] https://packages.grafana.com/oss/deb stable main" | tee -a /etc/apt/sources.list.d/grafana.list \
    && apt-get update && apt-get install -y grafana \
    && rm -rf /var/lib/apt/lists/*

# Set up Grafana configuration
COPY grafana.ini /etc/grafana/grafana.ini

# Expose port for Grafana
EXPOSE 3000

# Start Grafana
CMD ["/usr/sbin/grafana-server", "--config=/etc/grafana/grafana.ini", "--homepath=/usr/share/grafana"]