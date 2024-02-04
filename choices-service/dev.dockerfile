FROM python:3.11-alpine AS builder

WORKDIR /app

COPY src/requirements.txt /app
RUN python3 -m pip install --no-cache-dir -r requirements.txt

COPY ./src /app

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]