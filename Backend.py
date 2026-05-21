from flask import Flask, request, send_file
import os
from pathlib import Path

app = Flask(__name__)

@app.route("/")

def run():
    return "hello i am done"

@app.route("/uploads", methods = ["POST"])
def datarun():
   data = request.files.get("file")

   destination_folder = os.path.join("MyFiles", data.filename)
   data.save(destination_folder)
   printEachFile()
   return data.filename

def printEachFile():
    path = Path('MyFiles')
    namee = []
    for item in path.iterdir():
       namee.append(item.name)
    return namee

@app.route("/list", methods =["GET"])
def listRoute():
    return printEachFile()


@app.route("/downloads/<name>", methods =["GET"])
def downloadRoute(name):
 path = Path('MyFiles')
 file_path = os.path.join(path, name)
 return send_file(file_path, as_attachment=True)
       
   
if __name__ == "__main__":
    app.run(debug=True)