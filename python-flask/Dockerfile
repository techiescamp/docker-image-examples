# Use Ubuntu as the base image
FROM ubuntu:22.04

# Install Python3 and Pip
RUN apt-get update && apt-get install -y python3 python3-pip

# Set the working directory in the container
WORKDIR /app

# Copy contents into the /app directory of the container
COPY . /app

# Install any needed dependencies specified in requirements.txt
RUN pip install Flask

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Run app.py when the container launches
CMD ["python3", "hello.py"]
