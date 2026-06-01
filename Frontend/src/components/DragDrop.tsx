 import React, {use, useState} from 'react'
 
 export default function DragDrop(){
 const API = import.meta.env.VITE_API_URL || "http://localhost:5050";

 const handleDrop = async (e) => {
 e.preventDefault();

 const file = e.dataTransfer.files[0];
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
 }

 const handleDragOver = (e) => {
    e.preventDefault();
 }
 return(
    <div onDrop={handleDrop} onDragOver={handleDragOver}
    style={{
        position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    border: "1px dashed gray",
    borderColor: "#65626251",
    padding: "19%",
    height: "11%",
    width: "36%",

      }}
    >
        Drag and Drop
    </div>
 )
}