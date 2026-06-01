import React, {useState} from 'react'
export default function FileUploader(){
    const [file, setFile] = useState()
    const API = import.meta.env.VITE_API_URL || "http://localhost:5050";

    const handleFileChange = (e) => {
        if (e.target.files){
          setFile(e.target.files[0]);
        }
    };

    const handleUpload = async() =>{
        if (!file) return
        const formData = new FormData()
        formData.append('file', file)
        try{
          const response = await fetch(`${API}/uploads`,{
          method: 'POST',
          body: formData
          });
          const data = await response.json();
          console.log('successfull upload: ', data)
        }catch (error){
               console.log('error upload: ', error)
        }
    };

    return(
       <div 
       style={{
        padding: '1px', 
        borderColor: 'black', 
        backgroundColor: '#a5a0a051',
        border: '1px solid grey'
        }}
        >
        <div style={{padding: '10px'}}>
           <input type = "file" onChange={handleFileChange}/>
           <button onClick={handleUpload}>
            Upload
           </button>
        </div>
         </div>

        )
}

