FROM python:3.11-alpine AS builder

WORKDIR /app

COPY src/requirements.txt /app
RUN python3 -m pip install --upgrade pip
RUN python3 -m pip install -r requirements.txt

COPY ./src /app

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Run app.py when the container launches
CMD ["python", "app.py"]