 import React, {use, useState} from 'react'

 const API = "http://localhost:5050";

function FileList(){
     const [files, setFiles] = useState([])

 const showUpload = async() => {
    
    try{
      const response = await fetch(`${API}/list`);

      if(!response.ok) { 
        console.error("Error")
        return;
      }
      const data = await response.json();
      console.log('successfull upload: ', data)
      setFiles(data);
      console.log(data);
      if(data == null){
        console.log("null");
      }
      }catch(error){
          console.log('error upload: ', error)
      }
    };

    const deleteFile = async(fileName) => {
    try{
          const response = await fetch(`${API}/delete/${fileName}`,
          {
          method: "DELETE"
          })

      if(!response.ok) { 
        console.error("Error")
        return;
      }
      setFiles(files=> files.filter(file => file !==fileName));

      console.log('${fileName} deleted');
      }catch(error){
          console.log('error delete: ', error)
      }
    };

  const downloadFile = async(fileName) => {
    try {
        const response = await fetch(`${API}/downloads/${fileName}`,
          {
          method: "GET"
          })
      if(!response.ok) { 
        console.error("Error")
        return;
      }
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;

      document.body.appendChild(a);
      a.click();

      a.remove();

      window.URL.revokeObjectURL(url);

    } catch(error) {
        console.log('error downloading: ', error)
    }
  }
     return (
    <div style={{
    position: "fixed",
    top: "60%",
    left: "50%",
    transform: "translateX(-50%)",
  }}>

      <button onClick={showUpload}>Load files</button>
      {files.map((f, index) => (
        <div key={index}>
          <span onClick={() => downloadFile(f)}>
            {f}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteFile(f);
            }}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}
    export default FileList; 