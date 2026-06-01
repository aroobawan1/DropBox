FROM python:3.11

WORKDIR /app

COPY . .

RUN pip install flask flask-cors boto3

EXPOSE 5050

CMD ["python", "api.py"]