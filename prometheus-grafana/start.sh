#!/bin/bash

# Start Prometheus in the background
/usr/local/prometheus/prometheus --config.file=/usr/local/prometheus/prometheus.yml &

# Start Grafana in the background
/usr/sbin/grafana-server --config=/etc/grafana/grafana.ini --homepath=/usr/share/grafana &

# Wait for Grafana to start up
echo "Waiting for Grafana to start..."
while ! curl -s http://localhost:3000 > /dev/null; do
    sleep 1
done

# Add Prometheus as a data source
echo "Adding Prometheus as a Grafana data source..."
curl -X POST -H "Content-Type: application/json" -d '{
    "name":"Prometheus",
    "type":"prometheus",
    "url":"http://localhost:9090",
    "access":"proxy",
    "basicAuth":false
}' http://admin:admin@localhost:3000/api/datasources

echo "Prometheus data source added to Grafana."

# Keep the container running
tail -f /dev/null