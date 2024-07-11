# Use Ubuntu as the base image
FROM ubuntu:22.04

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Install required packages
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    jq \
    apt-transport-https \
    software-properties-common \
    && rm -rf /var/lib/apt/lists/*

# Install Prometheus
RUN wget https://github.com/prometheus/prometheus/releases/download/v2.53.1/prometheus-2.53.1.linux-amd64.tar.gz \
    && tar xvfz prometheus-2.53.1.linux-amd64.tar.gz \
    && mv prometheus-2.53.1.linux-amd64 /usr/local/prometheus \
    && rm prometheus-2.53.1.linux-amd64.tar.gz

# Install Grafana
RUN wget -q -O /usr/share/keyrings/grafana.key https://packages.grafana.com/gpg.key \
    && echo "deb [signed-by=/usr/share/keyrings/grafana.key] https://packages.grafana.com/oss/deb stable main" | tee -a /etc/apt/sources.list.d/grafana.list \
    && apt-get update && apt-get install -y grafana \
    && rm -rf /var/lib/apt/lists/*

# Set up Prometheus configuration
COPY prometheus.yml /usr/local/prometheus/prometheus.yml

# Set up Grafana configuration
COPY grafana.ini /etc/grafana/grafana.ini

# Copy and set permissions for the startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Expose ports for Prometheus and Grafana
EXPOSE 9090 3000

# Set the entry point to our startup script
ENTRYPOINT ["/start.sh"]