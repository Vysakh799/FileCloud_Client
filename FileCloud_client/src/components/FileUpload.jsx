import React,{useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const FileUpload=()=>{
    const [file,setFile]=useState(null)

    const handleFileChange=(e)=>{setFile(e.target.files[0])};

    const handleFileUpload=async(e)=>{
        e.preventDefault()
        const formData=new FormData();
        formData.append('uploaded_file',file)

        try{
            await axios.post('http://127.0.0.1:8000/api/files/',formData,{
                headers:{
                    'Content-Type':'multipart/form-data',
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('File Uploaded SuccessFully');
        }catch(error){
            console.error("there was an error while uploading the file :",error)
            alert('File Upload Failed')
        }
    }
    return (
        <div className='main'>
            <nav className='navbar'>
        <ul>
        <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
             <form onSubmit={handleFileUpload}>
            <h2>UploadFile</h2>
            <input type="file" onChange={handleFileChange} required />
            <button type='submit'>Upload</button>
        </form>
        </div>
       
    )
}

export default FileUpload;