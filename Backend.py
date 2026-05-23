from flask import Flask, request, send_file
import os
from pathlib import Path
import boto3

app = Flask(__name__)

@app.route("/")
def run():
    return "hello i am done"

# API for uploads
@app.route("/uploads", methods = ["POST"])
def datarun():
   # reads S3 bucket name from system   
   bucket = os.environ.get("AWS_BUCKET_NAME")  
   s3 = boto3.client('s3')

   data = request.files.get("file")

   if data is None or data.filename is None:
      return {
         "error" : "Not exists"
         }
   
   destination_folder = os.path.join("MyFiles", data.filename)
   # uploads file 
   s3.upload_file(destination_folder,bucket,data.filename)
   
   return {
    "message": "success"
   }

# prints list 
def printEachFile():
    namee = []
    s3 = boto3.resource('s3')
    bucket_name = os.environ.get("AWS_BUCKET_NAME")  
    bucket = s3.Bucket(bucket_name)

    for item in bucket.objects.all():
       namee.append(item.key)
    return namee

# API for list
@app.route("/list", methods =["GET"])
def listRoute():
    return printEachFile()

# API for downloads
@app.route("/downloads/<name>", methods =["GET"])
def downloadRoute(name):
 
 bucket = os.environ.get("AWS_BUCKET_NAME")  
 s3 = boto3.client('s3')
 os.makedirs("MyFiles", exist_ok=True)

 file_path = os.path.join("MyFiles", name)
 
 try:
  s3.download_file(bucket,name,file_path)
 except Exception as e:
  return {"error" : str(e)}
 
# sends file to user
 return send_file(file_path, as_attachment=True)

# API for delete
@app.route("/delete/<name>", methods = ["DELETE"])
def deleteRoute(name):
  bucket = os.environ.get("AWS_BUCKET_NAME")  
  s3 = boto3.client('s3')
  s3.delete_object(Bucket=bucket, Key=name) 
  return {"message" : "Success"}
  
if __name__ == "__main__":
    app.run(debug=True)